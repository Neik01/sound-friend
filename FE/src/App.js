import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { publicRoutes } from "./routes";
import DefaultLayout from "./layout/DefaultLayout";
import "./styles/global.scss";
import "./styles/grid.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <>
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) => {
          let Layout = DefaultLayout;
          if (route.layout) {
            Layout = route.layout;
          } else {
            if (route.layout === null) {
              Layout = Fragment;
            }
          }
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </>
);

export default App;
