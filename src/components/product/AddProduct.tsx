import React from "react";
import { Resolver, useForm } from "react-hook-form";

type ProductFormValues = {
  title: string;
  brand: string;
  // description: string;
  // price: number;
};

const resolver: Resolver<ProductFormValues> = async (
  values: ProductFormValues
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
  const [productFormValues, setProductFormValues] =  React.useState<ProductFormValues | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({ resolver });

  const onSubmit = handleSubmit((data: ProductFormValues) => {
    setProductFormValues(data);
  });

  return (
    <>
      <pre>{JSON.stringify(productFormValues || {}, null, 2)}</pre>
      <form onSubmit={onSubmit}>
        <input {...register("title")} placeholder="Enter product title" />
        {errors?.title && <p>{errors.title.message}</p>}
        <input {...register("brand")} placeholder="Enter product brand" />

        <input type="submit" />
      </form>
    </>
  );
}

export default AddProduct;
