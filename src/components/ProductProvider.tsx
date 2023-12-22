import React from "react";
import {
  ProductContext,
  ProductContextValueType,
  ProductDispatchContext,
} from "../config/context";

function ProductProvider(props: {
  state: ProductContextValueType;
  dispatch?: any;
  children: any;
}) {
  const { state, dispatch, children } = props;
  return (
    <ProductContext.Provider value={state}>
      <ProductDispatchContext.Provider value={dispatch}>
        {children}
      </ProductDispatchContext.Provider>
    </ProductContext.Provider>
  );
}

export default ProductProvider;
