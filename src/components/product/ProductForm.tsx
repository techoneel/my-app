import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  addProduct,
  getProductDetails,
  updateProduct,
} from "../../actions/productActions";
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
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import axios from "axios";

export type ProductFormValuesType = {
  id?: number;
  title?: string;
  brand?: string;
  description?: string;
};

function ProductForm() {
  const { addSuccess, updateSuccess, currentProductID, currentFormData } =
    useProductsContext();
  const dispatch = useProductsDispatchContext();
  const { productID } = useParams();
  const [formUpdate, setFormUpdate] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValuesType>({
    defaultValues: currentFormData,
    errors: {
      title: {
        type: "required",
        message: "Title is required.",
      },
    },
  });

  const getDeltaChanges = (
    originalValues: ProductFormValuesType,
    currentValues: ProductFormValuesType
  ): ProductFormValuesType => {
    /**
     * @todo  some issues with delta changes
     */
    // let deltaChanges: ProductFormValuesType = {};
    // Object.keys(currentValues).forEach((key: string) => {
    //   if (currentValues[key] !== originalValues[key]) {
    //     deltaChanges[key] = currentValues[key];
    //   }
    // });
    // return deltaChanges;
    return currentValues;
  };

  const onSubmit = handleSubmit((productFormData: any) => {
    if (formUpdate) {
      updateProduct(
        dispatch,
        currentProductID,
        productFormData
        // getDeltaChanges(currentFormData, productFormData)
      );
    } else {
      addProduct(dispatch, productFormData);
    }
  });

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

  React.useEffect(() => {
    console.log("Context value changes");
    console.log("addSuccess=" + addSuccess);
    console.log("updateSuccess=" + updateSuccess);
    console.log("currentProductID=" + currentProductID);
    console.log("currentFormData=" + currentFormData);
  }, [addSuccess, updateSuccess, currentProductID, currentFormData, dispatch]);

  React.useEffect(() => {
    console.log("formUpdate value changes");
  }, [formUpdate]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Grid container spacing={1}>
        <Grid item md={6}>
          <Card>
            <CardContent>
              <h1>{`I'm in ${formUpdate ? "Update" : "Add"} page`}</h1>
              {formUpdate ? (
                <>
                  {updateSuccess && <p>Product updated successfully</p>}
                  <h3>Updating productID: {currentProductID}</h3>
                  <pre>{JSON.stringify(currentFormData, null, 2)}</pre>
                </>
              ) : (
                <>
                  {addSuccess && <p>Product created successfully</p>}
                  <pre>{JSON.stringify(currentFormData || {}, null, 2)}</pre>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card>
            <CardContent>
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

                <Button variant="contained" onClick={onSubmit}>
                  {`${formUpdate ? "Update" : "Add"} Product`}
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
