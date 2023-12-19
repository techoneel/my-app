import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./product/Product";
import ProductList from "./product/ProductList";
import ProductDetails from "./product/ProductDetails";
import Error500 from "./errors/Error500";
import Error404 from "./errors/Error404";
import ProductProvider from "./ProductProvider";
import axios from "axios";
import {
  GET_PRODUCTS_SUCCESS,
  initialProducts,
  productReducer,
} from "../reducers/productReducer";

function App() {
  /**
   * @todo
   * 1. we need to call an api to get all the products
   * 2. store the products in some state variable
   * 3. pass it to the provider
   */
  // const [products, setProducts] = React.useState<[]>([]);
  // const [currentProductID, setCurrentProductID] = React.useState<number>(NaN);

  const [{ products, currentProductID }, dispatch] = React.useReducer(
    productReducer,
    initialProducts
  );
  // const [state, dispatch] = React.useReducer(productReducer, initialProducts);
  // const { products, currentProductID } = state;

  useEffect(
    () => {
      /* mounting */
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

      return () => {
        /* unmountig */
      };
    },
    [
      /* dependency */
    ]
  );

  return (
    <ProductProvider
      products={products}
      currentProductID={currentProductID}
      dispatch={dispatch}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productID" element={<ProductDetails />} />

          {/* Routes Error Handling */}
          <Route path="/error" element={<Error500 />} />
          <Route path="/*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
