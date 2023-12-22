import React from "react";
import { Controller, Resolver, useForm } from "react-hook-form";
import { addProduct, getProductDetails } from "../../actions/productActions";
import {
  useProductsContext,
  useProductsDispatchContext,
} from "../../config/context";
import {
  RESET_CURRENT_PRODUCT,
  RESET_FORM_DATA,
  SET_CURRENT_PRODUCT_ID,
} from "../../reducers/productReducer";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Stack,
  Button,
} from "@mui/material";

export type ProductFormValuesType = {
  id?: number;
  title: string;
  brand: string;
  description: string;
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

function ProductForm() {
  const { currentProductID, currentFormData } = useProductsContext();
  const dispatch = useProductsDispatchContext();
  const { productID } = useParams();
  const [formUpdate, setFormUpdate] = React.useState(false);

  // If we do not use custom input fields
  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm<ProductFormValuesType>({ resolver });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValuesType>({
    errors: {
      title: {
        type: "required",
        message: "Title is required.",
      },
    },
  });

  const onSubmit = (productFormData: any) => {
    addProduct(dispatch, productFormData);
  };

  React.useEffect(() => {
    dispatch({ type: RESET_CURRENT_PRODUCT });
    dispatch({ type: RESET_FORM_DATA });
  }, []);

  React.useEffect(() => {
    if (productID) {
      setFormUpdate(true);
      dispatch({ type: SET_CURRENT_PRODUCT_ID, payload: productID });

      getProductDetails(dispatch, productID);
    }
  }, [productID]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Grid container>
        <Grid item md={6}>
          <Card>
            <CardContent>
              <h1>{`I'm in ${formUpdate ? "Update" : "Add"} page`}</h1>
              {formUpdate ? (
                <>
                  <h3>Updating productID: {currentProductID}</h3>
                  <pre>{JSON.stringify(currentFormData, null, 2)}</pre>
                </>
              ) : (
                <>
                  {currentFormData?.id && <p>Product created successfully</p>}
                  <pre>{JSON.stringify(currentFormData || {}, null, 2)}</pre>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card>
            <CardContent>
              {/* If we do not use custom input fields
               <form onSubmit={onSubmit}>
                <input
                  {...register("title")}
                  placeholder="Enter product title"
                />
                {errors?.title && <p>{errors.title.message}</p>}
                <input
                  {...register("brand")}
                  placeholder="Enter product brand"
                />

                <button type="submit">Add Product</button>
              </form> */}
              <Stack direction={"column"} spacing={2}>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  render={({ field, fieldState, formState }) => (
                    <>
                      <TextField
                        variant="outlined"
                        {...field}
                        label="Title"
                        error={errors?.title ? true : false}
                        helperText={errors?.title?.message || ""}
                      />
                    </>
                  )}
                  name={"title"}
                />
                <Controller
                  rules={{}}
                  control={control}
                  render={({ field, fieldState, formState }) => (
                    <TextField variant="outlined" {...field} label="Brand" />
                  )}
                  name={"brand"}
                />
                <Controller
                  rules={{}}
                  control={control}
                  render={({ field, fieldState, formState }) => (
                    <TextField
                      variant="outlined"
                      {...field}
                      label="Description"
                    />
                  )}
                  name={"description"}
                />

                <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                  AddProduct
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductForm;
