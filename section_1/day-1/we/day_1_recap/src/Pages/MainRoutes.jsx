import React from "react";
import ReqAuth from "../component/ReqAuth";
import Home from "./Home";
import Product from "./Product";
import SinglePage from "./SingleProduct";
import Login from "./Login";
import { Route, Routes } from "react-router-dom";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route
        path="/product"
        element={
          <ReqAuth>
            <Product />
          </ReqAuth>
        }
      ></Route>
      <Route path="/product/:id" element={<SinglePage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="*" element={<div>Page Not Found</div>}></Route>
    </Routes>
  );
};

export default MainRoutes;
