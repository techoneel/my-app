import React from "react";

export type ProductType = {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
};

// Typescript: with OOPs Concept
export interface ProductContextValueType {
  products: ProductType[];
  currentProductID: number;
}

// Typescript: Type Checking
// type ProductContextValueType = {
//   products: string[];
//   currentProductID: number;
// }

const initialProductContextValue = {
  products: [],
  currentProductID: 0,
};

export const ProductContext = React.createContext<ProductContextValueType>(
  initialProductContextValue
);

export const ProductDispatchContext = React.createContext<any>(null);

/**
 * The below custom hook functions are 
 * used for getting context value
 * 
 */
export function useProductsContext() {
  return React.useContext(ProductContext);
}
export function useProductsDispatchContext() {
  return React.useContext(ProductDispatchContext);
}

// export const _ProductContext = React.createContext<{
//   products: string[];
//   currentProductID: number;
// }>({
//   products: [],
//   currentProductID: 0,
// });
