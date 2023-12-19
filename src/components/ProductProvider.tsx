import React from "react";
import { ProductContext, ProductDispatchContext } from "../config/context";

function ProductProvider(props: {
  products: any[];
  currentProductID: number;
  dispatch?: any;
  children: any;
}) {
  const { products, currentProductID, dispatch, children } = props;
  return (
    <ProductContext.Provider value={{ products, currentProductID }}>
      <ProductDispatchContext.Provider value={dispatch}>
        {children}
      </ProductDispatchContext.Provider>
    </ProductContext.Provider>
  );
}

export default ProductProvider;
