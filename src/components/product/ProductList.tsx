import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React from "react";
import { ProductType, useProductsContext } from "../../config/context";
import { productTheme } from "../../config/theme";
import { useNavigate } from "react-router-dom";

function ProductItem(props: { product: ProductType }) {
  const navigate = useNavigate();
  const {
    brand,
    category,
    description,
    discountPercentage,
    id,
    images,
    price,
    rating,
    stock,
    thumbnail,
    title,
  } = props?.product;
  return (
    <Card sx={{ maxHeight: 600, maxWidth: 300 }}>
      <CardMedia sx={{ height: 150 }} image={thumbnail} title="" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" noWrap>
          {brand}: {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            /** @todo navigate to */
          }}
        >
          View Product
        </Button>
        <Button
          size="small"
          onClick={() => {
            /** @todo
             * 1. set product id to currentProductID<ProductContext>
             * 2. navigate to update product page
             */
            // dispatch({type: SET_CURRENT_PRODUCT, payload: product?.id})
            navigate(`/products/form/${id}`);
          }}
        >
          Update Product
        </Button>
        {/* <Button size="small">Share</Button> */}
      </CardActions>
    </Card>
  );
}

function ProductList() {
  const { products } = useProductsContext();

  return (
    <Container>
      <Typography variant="h2">Our Products</Typography>
      <ThemeProvider theme={productTheme}>
        <Grid container spacing={1}>
          {products /* ?.slice(0, 6) */
            ?.map((product: ProductType, index: number) => {
              return (
                <Grid item key={`product-${index}`}>
                  <ProductItem product={product} />
                </Grid>
              );
            })}
        </Grid>
      </ThemeProvider>
    </Container>
  );
}

export default ProductList;
