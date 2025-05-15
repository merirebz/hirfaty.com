import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CiHeart } from "react-icons/ci";
import { PiShoppingCartSimpleLight, PiEyeLight, PiShareLight } from "react-icons/pi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { GetProductName } from "../../../utils/ProductInfo";
import { backend_url } from "../../../server";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";
import { addTocart } from "../../../redux/actions/cart";

const ProductCard = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const ProductName = GetProductName(data, i18n);

  const toggleWishlist = () => {
    if (click) {
      dispatch(removeFromWishlist(data));
      toast.info("Removed from wishlist");
    } else {
      dispatch(addToWishlist(data));
      toast.success("Added to wishlist");
    }
    setClick(!click);
  };

  const addToCartHandler = () => {
    if (cart.find((i) => i._id === data._id)) {
      toast.error("Item already in cart!");
    } else if (data.stock < 1) {
      toast.error("Product stock limited!");
    } else {
      dispatch(addTocart({ ...data, qty: 1 }));
      toast.success("Item added to cart successfully!");
    }
  };

  const shareProduct = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: data.name,
          text: "Check out this product!",
          url: `${window.location.origin}/product/${data._id}`,
        });
      } else {
        toast.error("Sharing not supported on this device.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <>
      <div className="relative w-60 h-80 rounded-t-[48%] bg-gray  overflow-hidden shadow-lg group transition-transform duration-300 hover:scale-105">
        <Link to={`/product/${data._id}`}>
          <img
            src={`${backend_url}${data.images && data.images[0]}`}
            alt={data.name}
            className="w-full h-full object-cover brightness-90"
            loading="lazy"
          />
        </Link>

        <div className="absolute bottom-0 w-full h-28 bg-white/30 backdrop-blur-xs text-black px-3 pb-3 pt-2 rounded-t-xl">
          <div className="text-center">
            <h3 className="text-base font-semibold truncate">{ProductName}</h3>
            <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full inline-block mt-1">
              {data.discountPrice
                ? `${data.discountPrice} MAD`
                : `${data.originalPrice} MAD`}
            </span>
          </div>
  
          
          <div className="flex justify-around items-center mt-2">
            <button onClick={toggleWishlist}>
              <CiHeart
                size={20}
                className={click ? "text-red-500" : "text-black"}
              />
            </button>
            <button onClick={addToCartHandler}>
              <PiShoppingCartSimpleLight size={20} className="text-black" />
            </button>
            <button onClick={() => setOpen(true)}>
              <PiEyeLight size={20} className="text-black" />
            </button>
            <button onClick={shareProduct}>
              <PiShareLight size={20} className="text-black" />
            </button>
          </div>
        </div>
      </div>

     
      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-4 text-2xl font-bold text-gray-600 hover:text-red-500"
            >
              &times;
            </button>
            <ProductDetailsCard setOpen={setOpen} data={data} />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
