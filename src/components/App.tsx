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
import { ThemeProvider } from "@emotion/react";
import defaultTheme from "../config/theme";
import AddProduct from "./product/AddProduct";
import { getProductsList } from "../actions/productActions";

function App() {
  /**
   * @todo
   * 1. we need to call an api to get all the products
   * 2. store the products in some state variable
   * 3. pass it to the provider
   */
  // const [products, setProducts] = React.useState<[]>([]);
  // const [currentProductID, setCurrentProductID] = React.useState<number>(NaN);

  // const [{ products, currentProductID }, dispatch] = React.useReducer(
  //   productReducer,
  //   initialProducts
  // );

  const [state, dispatch] = React.useReducer(productReducer, initialProducts);
  const { products, currentFormData, currentProductID } = state;

  useEffect(
    () => {
      /* mounting */
      getProductsList(dispatch);

      return () => {
        /* unmountig */
      };
    },
    [
      /* dependency */
    ]
  );

  /**
 * if you want to declare theme in App.tsx itself
 * <ThemeProvider
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
      <ProductProvider
        products={products}
        currentProductID={currentProductID}
        currentFormData={currentFormData}
        dispatch={dispatch}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/add" element={<AddProduct />} />
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
