import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { backend_url } from "../../../server";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useTranslation } from "react-i18next";
import {
  GetProductDescription,
  GetProductName,
} from "../../../utils/ProductInfo";
import { CiCloudDrizzle } from "react-icons/ci";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { t, i18n } = useTranslation();
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const ProductName = GetProductName(data, i18n);
  const ProductDescription = GetProductDescription(data, i18n);

  const handleMessageSubmit = () => {};

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error(t("Itemalreadyincart"));
    } else {
      if (data.stock < count) {
        toast.error(t("Productstocklimited"));
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success(t("Itemaddedtocartsuccessfully"));
      }
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data._id]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  return (
    <>
      {data ? (
        <>
          <div className="fixed w-full h-screen rounded-2xl flex justify-center items-center z-[790] top-0 left-0  ">
            <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-[#f0f6ff] rounded-md shadow-sm relative p-4">
              <RxCross1
                size={30}
                className="absolute right-3 top-3 z-50 cursor-pointer "
                onClick={() => setOpen(false)}
              />

              <div className="block justify-center items-center h-[650PX]  w-full 800px:flex">
                <div className="w-full 800px:w-[50%] mt-7 m-2 flex justify-center items-center bg-white rounded-2xl  p-[9px] ">
                  <img
                    src={`${backend_url}${data.images && data.images[0]}`}
                    alt=""
                    className="h-[52vh] rounded-2xl"
                  />
                </div>

                <div className="w-full 800px:w-[50%] mt-7 h-[52vh] bg-white rounded-2xl  p-[9px]">
                  <div className="flex justify-end">
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(data)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                  <div className="flex pt-3">
                    <h4
                      className={`${styles.productDiscountPrice} text-[36px] text-[#F1634C]`}
                    >
                      {data.originalPrice}MAD
                    </h4>
                    {data.discountPrice ? (
                      <h3
                        className={`${styles.price} text-[26px] text-[#9c9a9cee]`}
                      >
                        {data.discountPrice + "MAD"}
                      </h3>
                    ) : (
                      ""
                    )}
                  </div>
                  <h1 className={`${styles.productTitle} text-[20px] mt-4`}>
                    {ProductName}
                  </h1>
                  <p>{ProductDescription}</p>
                  <div className="flex justify-between">
                    <div className="flex mt-12 ">
                      <Link
                        to={`/shop/preview/${data.shop._id}`}
                        className="flex"
                      >
                        <img
                          src={`${backend_url}${data?.shop?.avatar}`}
                          alt=""
                          className="w-[50px] h-[50px] rounded-full mr-2"
                        />
                        <div>
                          <Link to={`/shop/preview/${data?.shop._id}`}>
                            <h3>{data.shop.name}</h3>
                          </Link>
                          <h5 className="text-[15px]">(4.5) Ratings</h5>
                        </div>
                      </Link>
                    </div>
                    <div className="flex items-center mt-12 justify-end pr-3">
                      <div>
                        <button
                          className="bg-[#F1634C] text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                          onClick={decrementCount}
                        >
                          -
                        </button>
                        <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                          {count}
                        </span>
                        <button
                          className="bg-[#F1634C] text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                          onClick={incrementCount}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex mt-6 ">
                    <div
                      className={`${styles.button} w-[50%] m-2 rounded-[4px] h-11 flex items-center`}
                      onClick={() => addToCartHandler(data._id)}
                    >
                      <span className="text-[#fff] flex items-center">
                        {t("Addtocart")}{" "}
                        <AiOutlineShoppingCart className="ml-1" />
                      </span>
                    </div>

                    <div
                      className={`${styles.button} bg-[#000] w-[50%] m-2   rounded-[4px] h-11`}
                      onClick={handleMessageSubmit}
                    >
                      <span className="text-[#fff]  flex items-center">
                        {t("SendMessage")} <AiOutlineMessage className="ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={() => setOpen(false)}
            className="fixed w-full h-screen rounded-2xl top-0 left-0 bg-[#00000030] z-[780] flex items-center justify-center"
          ></div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default ProductDetailsCard;
