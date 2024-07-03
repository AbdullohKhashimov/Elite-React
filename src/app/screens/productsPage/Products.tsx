import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { CssVarsProvider } from "@mui/joy";
import CardCover from "@mui/joy/CardCover";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import Typography from "@mui/joy/Typography";
import Divider from "../../components/divider";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

// locations
const locations = [
  {
    locationName: "Novruz mall",
    description: "Convenient for business conversations",
    imgPath: "/img/navruz.webp",
  },
  {
    locationName: "Uzbegim Trade Center",
    description: "Offers cozy environment for students",
    imgPath: "/img/ozbegim.webp",
  },
  {
    locationName: "5th Micro-district",
    description: "Lovely for couples with beautiful view",
    imgPath: "/img/micro.webp",
  },
  {
    locationName: "Navoiy Park",
    description: "For those who enjoy outdoor spots",
    imgPath: "/img/navoiy.webp",
  },
];

/**  REDUX SLICE & SELECTOR  **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.COFFEE,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  /**  Search ni qiymatini yangilib boshqattan ishlatish mantigi  **/
  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /**  HANDLERS **/
  // parameter enum qiymatlaridan olinib unga collection: ni tenglab qoydik
  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    // ovqat typelar buttoni ezilganda doim birinchi page ga olib kelish mantigi
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const choseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"avatar-big-box"}>
            <Stack className={"single-search-big-box"}>
              <input
                type={"search"}
                className={"single-search-input"}
                name={"singleResearch"}
                placeholder={"Type here"}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchProductHandler();
                }}
              />
              <Button
                className={"single-search-button"}
                variant="contained"
                endIcon={<SearchIcon />}
              >
                Search
              </Button>
            </Stack>
            <Stack className={"top-text"}>
              <p>Elite Espresso</p>
            </Stack>
          </Stack>

          <Stack className={"dishes-filter-section"}>
            <Typography className="filter">Sorted by</Typography>
            <Stack className={"dishes-filter-box"}>
              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.order === "createdAt" ? "primary" : "secondary"
                }
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>

              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.order === "productPrice"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>

              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.order === "productViews"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productViews")}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <div className={"category-main filter-btn"}>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection ===
                    ProductCollection.SMOOTHIE
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.SMOOTHIE)
                  }
                >
                  SMOOTHIE
                </Button>

                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.CAKE
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.CAKE)
                  }
                >
                  CAKE
                </Button>

                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.COFFEE
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.COFFEE)
                  }
                >
                  COFFEE
                </Button>

                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.SALAD
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.SALAD)
                  }
                >
                  SALAD
                </Button>
              </div>
            </Stack>

            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.COFFEE ||
                    product.productCollection === ProductCollection.SMOOTHIE
                      ? product.productVolume + " litre"
                      : product.productCollection === ProductCollection.SALAD ||
                        product.productCollection === ProductCollection.CAKE
                      ? product.productSize + ""
                      : product.productSize + " ";

                  return (
                    <Stack
                      key={product._id}
                      className={"product-card"}
                      onClick={() => choseDishHandler(product._id)}
                    >
                      <Stack
                        className={"product-img"}
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <div className={"product-sale"}>{sizeVolume}</div>
                        <Button
                          className={"shop-btn"}
                          onClick={(e) => {
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                            e.stopPropagation();
                          }}
                        >
                          <img
                            src={"/icons/shopping-cart.svg"}
                            style={{ display: "flex" }}
                            alt=""
                          />
                        </Button>

                        <Button className={"view-btn"} sx={{ right: "36px" }}>
                          <Badge
                            badgeContent={product.productViews}
                            color="secondary"
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>

                      <Box className={"product-desc"}>
                        <span className={"product-title"}>
                          {product.productName}
                        </span>
                        <div className={"product-desc"}>
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available!</Box>
              )}
            </Stack>
          </Stack>

          <Stack className={"pagination-section"}>
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      <div className={"location-frame"}>
        <Container className="location-list">
          <Box className={"category-title"}>Location Images</Box>

          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {locations.length !== 0 ? (
                locations.map((ele, index) => {
                  return (
                    <Card
                      sx={{ minHeight: "280px", width: 320 }}
                      key={index}
                      className={"cards"}
                    >
                      <CardCover>
                        <img src={ele.imgPath} alt="" />
                      </CardCover>
                      <CardCover
                        sx={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                        }}
                      />
                      <CardContent
                        sx={{ justifyContent: "flex-end" }}
                        className={"location-det"}
                      >
                        <Typography
                          startDecorator={
                            <LocationOnRoundedIcon className="location-icon" />
                          }
                          textColor="neutral.300"
                        >
                          <p className="location-details">{ele.locationName}</p>
                        </Typography>

                        <Divider width="2" height="-5" bg="#d9d9d9" />
                        <Typography
                          startDecorator={
                            <DescriptionOutlinedIcon></DescriptionOutlinedIcon>
                          }
                          textColor="neutral.300"
                        >
                          {ele.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <Box>No Locations Available</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Container>
      </div>

      <div className={"address"}>
        <Container>
          <Stack className={"address-area"}>
            <Box className={"title"}>Head Office</Box>
            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3045.059797529578!2d72.3637995!3d40.7524758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bced91ccce77f9%3A0xf07c16e5c23a5945!2sNavruz%20Mall!5e0!3m2!1sen!2s!4v1594309492722!5m2!1sen!2s"
              width="1320"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
