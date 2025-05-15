import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import Carousel from "react-multi-carousel";
import { FaShare } from "react-icons/fa";

import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { GetProductDescription, GetProductName } from "../../utils/ProductInfo";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};
const ProductDetails = ({ data }) => {
  const { t, i18n } = useTranslation();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const ProductName = data && GetProductName(data, i18n);
  const ProductDescription = data && GetProductDescription(data, i18n);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist, dispatch]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error(t("Itemalreadyincart"));
    } else {
      if (data.stock < 1) {
        toast.error(t("Productstocklimited"));
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Itemadded");
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: GetProductName(data, i18n),
          text: GetProductDescription(data, i18n),
          url: window.location.href,
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      console.log("Web Share API not supported");
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error(t("Pleaselogin"));
    }
  };

  return (
    <div className=" flex flex-wrap ">
      {data ? (
        <>
          <div className=" w-full flex flex-wrap">
            <div className="1000px:w-[60%] w-[100%] p-4   rounded-xl ">
              <div className="bg-white flex justify-center p-5 rounded-2xl">
                <img
                  src={`${backend_url}${data && data.images[select]}`}
                  alt=""
                  className="w-[60%] rounded-xl"
                />
              </div>
              <div className="w-full my-4">
                <Carousel
                  responsive={responsive}
                  itemClass="!w-[10rem]"
                  className=" "
                >
                  {data &&
                    data.images.map((i, index) => (
                      <div
                        key={index}
                        className={` bg-white w-[150px] rounded-2xl flex p-1 items-center mx-6 h-[150px]  m-3  ${
                          select === 0 ? "border" : "null"
                        } cursor-pointer`}
                      >
                        <img
                          src={`${backend_url}${i}`}
                          alt=""
                          className=" w-full
                          overflow-hidden "
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                </Carousel>
              </div>
            </div>
            <div className="1000px:w-[40%] w-[100%] p-4 ">
              <div className="  bg-white p-4 rounded-2xl   ">
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
                      color={click ? "red" : "#333"}
                      title="Add to wishlist"
                    />
                  )}
                </div>
                <div className="flex pt-3">
                  <h4
                    className={`${styles.productDiscountPrice} text-[40px] text-[#F1634C]`}
                  >
                    {data.originalPrice}MAD
                  </h4>
                  {data.discountPrice ? (
                    <h3 className={`${styles.price} text-[#4c4c4caa]`}>
                      {data.discountPrice + "MAD"}
                    </h3>
                  ) : (
                    ""
                  )}
                </div>
                <h1 className={`${styles.productTitle} mt-6`}>{ProductName}</h1>
                <p className="text-[#8a8a8a] mt-3">{ProductDescription}</p>
                <div className="flex  items-center pt-8">
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <img
                      src={`${backend_url}${data?.shop?.avatar}`}
                      alt=""
                      className="w-[70px] h-[70px] rounded-full mr-2"
                    />
                  </Link>
                  <div className="pr-8">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <h3>{data.shop.name}</h3>
                    </Link>

                    <h5 className=" text-[15px]">
                      ({averageRating}/5) {t("Ratings")}
                    </h5>
                    <Link
                      to={`/shop/preview/${data?.shop._id}`}
                      className=" cursor-pointerrounded-md underline text-[#F1634C] flex items-center"
                    >
                      {" "}
                      visite store
                    </Link>
                  </div>
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
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
                <div className="flex justify-end ">
                  <div
                    className={`w-[50px] mr-2 bg-[#F1634C] my-2  justify-center cursor-pointer !mt-6 !rounded !h-11 flex items-center`}
                    onClick={handleShare}
                  >
                    <span className="flex items-center text-white">
                      <FaShare />
                    </span>
                  </div>
                  <div
                    className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                    onClick={() => addToCartHandler(data._id)}
                  >
                    <span className="text-white flex items-center">
                      {t("Addtocart")}{" "}
                      <AiOutlineShoppingCart className="ml-1" />
                    </span>
                  </div>
                  <div
                    className={`${styles.button} bg-[#6443d1] mt-6 mx-2 !rounded !h-11`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      {t("SendMessage")} <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <ProductDetailsInfo
              data={data}
              products={products}
              totalReviewsLength={totalReviewsLength}
              averageRating={averageRating}
            />
            <br />
            <br />
          </div>
        </>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);
  const { t, i18n } = useTranslation();

  const ProductName = data && GetProductName(data, i18n);
  console.log(ProductName);

  return (
    <div className="bg-[#fff] w-full px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            {t("ProductDetails")}
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            {t("ProductReviews")}
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            {t("SellerInformation")}
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {ProductName}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data &&
            data.reviews.map((item, index) => (
              <div className="w-full flex my-2">
                <img
                  src={`${backend_url}/${item.user.avatar}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2 ">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">{item.user.name}</h1>
                    <Ratings rating={data?.ratings} />
                  </div>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}

          <div className="w-full flex justify-center">
            {data && data.reviews.length === 0 && <h5>{t("NoReviews")}</h5>}
          </div>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/preview/${data.shop._id}`}>
              <div className="flex items-center">
                <img
                  src={`${backend_url}${data?.shop?.avatar}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    ({averageRating}/5) {t("Ratings")}
                  </h5>
                </div>
              </div>
            </Link>
            <p className="pt-2">{data.shop.description}</p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                {t("Joinedon")}:{" "}
                <span className="font-[500]">
                  {data.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                {t("TotalProducts")}:{" "}
                <span className="font-[500]">
                  {products && products.length}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                {t("TotalReviews")}:{" "}
                <span className="font-[500]">{totalReviewsLength}</span>
              </h5>
              <Link to="/">
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">{t("VisitShop")}</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
