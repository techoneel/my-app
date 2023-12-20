import React from "react";
import { ProductContext, ProductDispatchContext } from "../config/context";
import { ProductFormValuesType } from "./product/AddProduct";

function ProductProvider(props: {
  products: any[];
  currentProductID: number;
  currentFormData: ProductFormValuesType;
  dispatch?: any;
  children: any;
}) {
  const { products, currentFormData, currentProductID, dispatch, children } =
    props;
  return (
    <ProductContext.Provider
      value={{ products, currentFormData, currentProductID }}
    >
      <ProductDispatchContext.Provider value={dispatch}>
        {children}
      </ProductDispatchContext.Provider>
    </ProductContext.Provider>
  );
}

export default ProductProvider;
