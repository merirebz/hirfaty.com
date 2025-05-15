import axios from "axios";
import { server } from "../../server";
// create product
export const createPromoProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "promoProductCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/product/create-promo-product`,
      newForm,
      config
    );
    dispatch({
      type: "promoProductCreateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "promoProductreateFail",
      payload: error.response.data.message,
    });
  }
};

// get all sellers --- admin
export const getPromoProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getPromoProducts",
    });

    const { data } = await axios.get(
      `${server}/product/get-all-promo-products`
    );
    if (data) {
      dispatch({
        type: "getPromoProductsSuccess",
        payload: data.products,
      });
      dispatch({
        type: "getPromoProducts",
        payload: data.products,
      });
    }
  } catch (error) {
    dispatch({
      type: "getPromoProductsFailed",
      //   payload: error.response.data.message,
    });
  }
};

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });

    const { data } = await axios.delete(
      `${server}/product/delete-promo-product/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deletePromoProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletePromoProductFailed",
      payload: error.response.data.message,
    });
  }
};
