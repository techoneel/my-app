import React from "react";
import { Resolver, useForm } from "react-hook-form";
import { addProduct } from "../../actions/productActions";
import {
  useProductsContext,
  useProductsDispatchContext,
} from "../../config/context";
import { RESET_FORM_DATA } from "../../reducers/productReducer";

export type ProductFormValuesType = {
  id?: number;
  title?: string;
  brand?: string;
  description?: string;
  // price: number;
};

const resolver: Resolver<ProductFormValuesType> = async (
  values: ProductFormValuesType
) => {
  return {
    values: values?.title ? values : {},
    errors: !values.title
      ? {
          title: {
            type: "required",
            message: "Title is required.",
          },
        }
      : {},
  };
};

function AddProduct() {
  const { currentFormData } = useProductsContext();
  const dispatch = useProductsDispatchContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValuesType>({ resolver });

  const onSubmit = handleSubmit((productFormData: ProductFormValuesType) => {
    addProduct(dispatch, productFormData);
  });

  React.useEffect(() => {
    dispatch({ type: RESET_FORM_DATA });

    return () => {};
  }, []);

  return (
    <>
      {currentFormData?.id && <p>Product created successfully</p>}
      <pre>{JSON.stringify(currentFormData || {}, null, 2)}</pre>
      <form onSubmit={onSubmit}>
        <input {...register("title")} placeholder="Enter product title" />
        {errors?.title && <p>{errors.title.message}</p>}
        <input {...register("brand")} placeholder="Enter product brand" />

        <button type="submit">Add Product</button>
      </form>
    </>
  );
}

export default AddProduct;
