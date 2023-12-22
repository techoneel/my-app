import { ProductContextValueType } from "../config/context";

export const SET_CURRENT_PRODUCT_ID = "SET_CURRENT_PRODUCT_ID";
export const SET_CURRENT_PRODUCT_FORM = "SET_CURRENT_PRODUCT_FORM";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const ADD_PRODUCTS_SUCCESS = "ADD_PRODUCTS_SUCCESS";
export const RESET_CURRENT_PRODUCT = "RESET_CURRENT_PRODUCT";
export const RESET_FORM_DATA = "RESET_FORM_DATA";
export const UPDATE_PRODUCTS_SUCCESS = "UPDATE_PRODUCTS_SUCCESS";
export const DELETE_PRODUCTS_SUCCESS = "DELETE_PRODUCTS_SUCCESS";
export const RESET_PRODUCT_REDUCER_STATE = "RESET_PRODUCT_REDUCER_STATE";

export const initialProducts: ProductContextValueType = {
  addSuccess: false,
  updateSuccess: false,
  products: [],
  currentFormData: {
    id: NaN,
    title: "",
    brand: "",
    description: "",
  },
  currentProductID: NaN,
};

export function productReducer(
  state: ProductContextValueType = initialProducts,
  { type, payload }: { type: string; payload?: any }
) {
  switch (type) {
    case SET_CURRENT_PRODUCT_ID:
      return { ...state, currentProductID: payload };
    case SET_CURRENT_PRODUCT_FORM:
      return { ...state, currentFormData: payload };
    case GET_PRODUCTS_SUCCESS:
      return { ...state, products: payload };
    case ADD_PRODUCTS_SUCCESS:
      return { ...state, addSuccess: true, currentFormData: payload };
    case UPDATE_PRODUCTS_SUCCESS:
      return { ...state, updateSuccess: true, currentFormData: payload };
    case DELETE_PRODUCTS_SUCCESS:
      return { ...state };
    case RESET_CURRENT_PRODUCT:
      return { ...state, currentProductID: NaN };
    case RESET_FORM_DATA:
      return {
        ...state,
        addSuccess: false,
        updateSuccess: false,
        currentFormData: null,
      };
    case RESET_PRODUCT_REDUCER_STATE:
      return initialProducts;
    default:
      return state;
  }
}
