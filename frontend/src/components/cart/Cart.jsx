import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { backend_url } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { GetProductName, GetProductPrice } from "../../utils/ProductInfo";

const Cart = ({ setOpenCart }) => {
  const { t } = useTranslation();

  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * GetProductPrice(item),
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  return (
    <>
      <div className="animate-fade-left animate-once animate-duration-500 fixed top-0 right-0 h-full w-[80%] z-[880] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5>{t("CartItemsisempty")}</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cart && cart.length} {t("items")}
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>

            <div className="">
              <div className="px-5 flex border-2 py-2 mb-3">
                <div className=" justify-between w-[90%] text-black font-bold text-[20px]">
                  SubTotal :{" "}
                </div>
                <div className="mt-2 font-bold text-[#F1634C]">
                  {" "}
                  MAD{totalPrice}
                </div>
              </div>
              {/* checkout buttons */}
              <div className="px-5 mb-3">
                <Link to="/checkout">
                  <div
                    className={`h-[45px] flex items-center justify-center  w-[100%] bg-[#e44343] rounded-[5px]`}
                  >
                    <h1 className="text-[#fff] text-[18px] font-[600]">
                      {t("CheckoutNow")}
                    </h1>
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      <div
        onClick={() => setOpenCart(false)}
        className=" animate-fade-left animate-once animate-duration-400 bg-[#0000004b] h-screen fixed top-0 left-0 w-full   z-[870]"
      ></div>
    </>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = GetProductPrice(data) * value;
  const { t, i18n } = useTranslation();

  const ProductName = data && GetProductName(data, i18n);

  const increment = (data) => {
    if (data.stock < value) {
      toast.error(t("Productstocklimited"));
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="border-b p-4">
      <div className="flex">
        <div className="w-[40%] flex justify-center h-[40%] ">
          <img
            src={`${backend_url}${data?.images[0]}`}
            alt=""
            className="w-[130px] h-[130px]  ml-2 mr-2 rounded-[5px]"
          />
        </div>
        <div className="w-[40%]  font-bold text-[20px] mt-6 text-black">
          {ProductName} <br />{" "}
          <h4 className=" text-[15px] text-[#00000082]">
            ${GetProductPrice(data)} * {value}
          </h4>{" "}
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#F1634C] font-Roboto">
            MAD{totalPrice}
          </h4>{" "}
        </div>
        <div className="w-[15%] flex justify-center items-center ">
          <div>
            <div
              className={`bg-[#F1634C] border border-[#F1634C] text-white rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
              onClick={() => increment(data)}
            >
              <HiPlus size={18} color="#fff" />
            </div>
            <span className="pl-[10px]">{data.qty}</span>
            <div
              className="bg-[#8a8a8a] text-[#fff] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
              onClick={() => decrement(data)}
            >
              <HiOutlineMinus size={16} color="#fff" />
            </div>
          </div>
        </div>
        <div className="w-[5%]"></div>

        <RxCross1
          className="cursor-pointer"
          onClick={() => removeFromCartHandler(data)}
        />
      </div>
    </div>
  );
};

export default Cart;
