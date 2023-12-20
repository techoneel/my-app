import axios from "axios";
import { GET_PRODUCTS_SUCCESS } from "../reducers/productReducer";

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
