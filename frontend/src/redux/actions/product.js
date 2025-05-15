import axios from "axios";
import { server } from "../../server";

// create product
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "productCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`${server}/product/create-product`,
      newForm,
      config
    );
    dispatch({
      type: "productCreateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "productCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response.data.message,
    });
  }
};
export const getProductById = (id) => async (dispatch) => {
  console.log( "zzzzzzz");

  try {
    dispatch({
      type: "getProductByIdRequest",
    });
    const { data } = await axios.get(`${server}/product/get-products/${id}`);
    console.log(data.product);
    dispatch({
      type: "getProductByIdSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "getProductByIdFailed",
      payload: error.response.data.message,
    });
  }
};
export const updateProductById = (id, newForm) => async (dispatch) => {
  const config = { headers: { "Content-Type": "multipart/form-data" } };

  try {
    dispatch({
      type: "getProductByIdRequest",
    });

    
    const { data } = await axios.put(`${server}/product/update-product/${id}`,
    newForm,
    config
    );
    // const { data } = await axios.put(`${server}/product/update-product/${id}`, 
    // newForm,
    // config
    // );
    console.log(data.product);
    dispatch({
      type: "getProductByIdSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "getProductByIdFailed",
      payload: error.response.data.message,
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
      `${server}/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data.message,
    });
  }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};
