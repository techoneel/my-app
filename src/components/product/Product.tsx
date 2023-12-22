import React from "react";
import { useProductsContext } from "../../config/context";
import { Button, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Product() {
  let { products } = useProductsContext();
  const navigate = useNavigate();

  return (
    <Container>
      <Grid container>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            minHeight: "50vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">
            Product Count: {products?.length || "No Products"}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "50vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              navigate("/products");
            }}
          >
            Go to Product List
          </Button>
          <br />
          <Button
            variant="contained"
            onClick={() => {
              navigate("/products/form");
            }}
          >
            Add Product
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Product;
