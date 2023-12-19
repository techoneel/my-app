import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { ProductType, useProductsContext } from "../../config/context";

function ProductItem(props: { product: ProductType }) {
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
      <Grid container spacing={1}>
        {products?.slice(0, 6)?.map((product: ProductType, index: number) => {
          return (
            <Grid item key={`product-${index}`}>
              <ProductItem product={product} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default ProductList;
