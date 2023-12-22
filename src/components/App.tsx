import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./product/Product";
import ProductList from "./product/ProductList";
import ProductDetails from "./product/ProductDetails";
import Error500 from "./errors/Error500";
import Error404 from "./errors/Error404";
import ProductProvider from "./ProductProvider";
import {
  RESET_PRODUCT_REDUCER_STATE,
  initialProducts,
  productReducer,
} from "../reducers/productReducer";
import { ThemeProvider } from "@emotion/react";
import defaultTheme from "../config/theme";
import AddProduct from "./product/AddProduct";
import { getProductsList } from "../actions/productActions";
import ProductForm from "./product/ProductForm";

function App() {
  /**
   * Using useReducer hook
   * to get state and dispatch function
   * - to access state values of the reducer
   * - to call reducer type with payload using dispatch
   */
  const [state, dispatch] = React.useReducer(productReducer, initialProducts);
  /* destructuring reducer's state */
  const {
    addSuccess,
    updateSuccess,
    products,
    currentFormData,
    currentProductID,
  } = state;

  useEffect(
    () => {
      /* mounting */
      /**
       * call getProductsList action
       * - call get api
       * - set data in context through reducer
       */
      getProductsList(dispatch);

      return () => {
        /* unmountig */
        /**
         * Reseting product state on unmounting phase
         */
        dispatch({ type: RESET_PRODUCT_REDUCER_STATE });
      };
    },
    [
      /* empty dependency for writing one time mounting logic */
    ]
  );

  /**
   * if you want to declare theme in App.tsx itself
    <ThemeProvider
      theme={createTheme({
        palette: {
          primary: {
            main: "#e84343",
          },
          secondary: {
            main: "#f50057",
          },
        },
      })}
    >
      {children}
    </ThemeProvider>
   */

  return (
    <ThemeProvider theme={defaultTheme}>
      {/* providing theme */}
      <ProductProvider state={state} dispatch={dispatch}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/products" element={<ProductList />} />
            <Route
              path="/products/form/:productID?"
              element={<ProductForm />}
            />
            {/* <Route path="/products/add" element={<ProductForm />} />
            <Route
              path="/products/update/:productID"
              element={<ProductForm />}
            /> */}
            <Route path="/product/:productID" element={<ProductDetails />} />
            {/* Routes Error Handling */}
            <Route path="/error" element={<Error500 />} />
            <Route path="/*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </ThemeProvider>
  );
}

export default App;
