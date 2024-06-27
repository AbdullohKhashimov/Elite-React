import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footers = styled.div`
  width: 100%;
  height: 590px;
  display: flex;
  background: rgb(19, 18, 18);
  background-size: cover;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container>
        <Stack flexDirection={"row"} sx={{ mt: "94px" }}>
          <Stack flexDirection={"column"} style={{ width: "340px" }}>
            <Box>
              <p
                style={{
                  fontSize: "35px",
                  fontWeight: "900",
                  fontStyle: "normal",
                  fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
                  color: " #dfd7d7",
                  textDecoration: "underline",
                  borderRadius: "24px",
                }}
              >
                ELITE ESPRESSO
              </p>
            </Box>
            <Box className={"foot-desc-txt"}>
              "Whether you're starting your morning or taking a midday break,
              our coffee shop offers the perfect blend of quality and comfort.
              Visit us in-store for a cozy experience or order online for
              convenience delivered to your door!"
            </Box>
            <Box className="sns-context">
              <img src={"/icons/facebook.svg"} alt="" />
              <img src={"/icons/twitter.svg"} alt="" />
              <img src={"/icons/instagram.svg"} alt="" />
              <img src={"/icons/youtube.svg"} alt="" />
            </Box>
          </Stack>
          <Stack sx={{ ml: "288px" }} flexDirection={"row"}>
            <Stack>
              <Box>
                <Box className={"foot-category-title"}>Links</Box>
                <Box className={"foot-category-link"}>
                  <Link to="/">Home</Link>
                  <Link to="/products">Products</Link>
                  {authMember && <Link to="/orders">Orders</Link>}
                  <Link to="/help">Help</Link>
                </Box>
              </Box>
            </Stack>
            <Stack sx={{ ml: "100px" }}>
              <Box>
                <Box className={"foot-category-title"}>Find us</Box>
                <Box
                  flexDirection={"column"}
                  sx={{ mt: "20px" }}
                  className={"foot-category-link"}
                  justifyContent={"space-between"}
                >
                  <Box flexDirection={"row"} className={"find-us"}>
                    <span>L.</span>
                    <div>Boburshoh Kochasi 89, 1st fl</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>P.</span>
                    <div>+998 71 200 01 01</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>E.</span>
                    <div>a.salimov011@gmail.com</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>Business hours.</span>
                    <div>from 9:00 am ~ to 23:00 pm </div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>Delivery.</span>
                    <div>24 hours available </div>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          style={{ border: "1px solid #C5C8C9", width: "100%", opacity: "0.2" }}
          sx={{ mt: "80px" }}
        ></Stack>
        <Stack className={"copyright-txt"}>
          © Copyright ELITE ESPRESSO Cafe, All rights reserved.
        </Stack>
      </Container>
    </Footers>
  );
}
