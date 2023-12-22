import axios from "axios";
import {
  ADD_PRODUCTS_SUCCESS,
  GET_PRODUCTS_SUCCESS,
  SET_CURRENT_PRODUCT_FORM,
  UPDATE_PRODUCTS_SUCCESS,
} from "../reducers/productReducer";
import { ProductFormValuesType } from "../components/product/AddProduct";

export const getProductDetails = (dispatch: any, productID: string) => {
  axios
    .get(`https://dummyjson.com/products/${productID}`)
    .then((response) => {
      console.log(response);
      // when use with component state
      // setProducts(response?.data?.products);
      dispatch({
        type: SET_CURRENT_PRODUCT_FORM,
        payload: response?.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getProductsList = (dispatch: any) => {
  axios
    .get("https://dummyjson.com/products")
    .then((response) => {
      console.log(response);
      // when use with component state
      // setProducts(response?.data?.products);
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: response?.data?.products,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addProduct = (
  dispatch: any,
  productFormData: ProductFormValuesType
) => {
  console.log(productFormData);
  dispatch({ type: ADD_PRODUCTS_SUCCESS, payload: productFormData });
  axios
    .post(
      "https://dummyjson.com/products/add",
      JSON.stringify(productFormData),
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((response) => {
      dispatch({ type: ADD_PRODUCTS_SUCCESS, payload: response.data });
    })
    .catch((error) => console.error);
};

export const updateProduct = (
  dispatch: any,
  currentProductID: number,
  productFormData: ProductFormValuesType
) => {
  console.log(productFormData);
  dispatch({ type: ADD_PRODUCTS_SUCCESS, payload: productFormData });
  delete productFormData.id; // for dummyjson api purpose
  axios
    .put(
      `https://dummyjson.com/products/${currentProductID}`,
      JSON.stringify(productFormData),
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((response) => {
      dispatch({ type: UPDATE_PRODUCTS_SUCCESS, payload: response.data });
    })
    .catch((error) => console.error);
};
