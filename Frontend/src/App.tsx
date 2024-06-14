/*import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./features/landing/LandingPage";
import HomePage from "./features/HomePage";
import Cycles from "./features/cycles/Cycles";
import Books from "./features/books/Books";
import AddBook from "./features/books/AddBook";
import Profile from "./features/user/Profile";
import PrivateRoutes from "./shared/utils/PrivateRoutes";
import Login from "./features/auth/Login";
import RegisterPage from "./features/user/RegisterPage";
import Page404 from "./features/404";
import MainLayout from "./components/MainLayout";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import {
  checkToken,
  fetchUser,
  logout,
  selectAuthenticationState,
  selectUsername,
} from "./redux/reducers/user";
import SwapView from "./features/swap/SwapView";
import CreateCycle from "./features/cycles/CreateCycle";

function App() {
  const dispatch = useAppDispatch();
  const username = useAppSelector(selectUsername);

  useEffect(() => {
    dispatch(checkToken()) // Dispatch the checkToken action
      .unwrap()
      .then(() => {
        //sleep for 10 seconds
        dispatch(fetchUser());
      })
      .catch(() => {
        dispatch(logout());
      });
  }, [dispatch, username]);

  return (
    <div className={"bg-primary flex overflow-hidden w-full flex-1"}>
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<PrivateRoutes />}>
            <Route element={<MainLayout />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/cycles" element={<Cycles />} />
              <Route path="/books" element={<Books />} />
              <Route path="/swap/:cycleid" element={<SwapView />} />
              <Route path="/addBook" element={<AddBook />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cycles/create" element={<CreateCycle />} />
            </Route>
          </Route>

          <Route path="*" element={<Page404 />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
*/
import { useState } from "react";
import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Form from "./components/forms/AppointmentBookingForm";

import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import DocSearch from "./DocSearchScreen";
import Booking from "./Booking";
import DocFind from "./DocFindScreen";
import AuthSide from "./AuthScreen";
import "vite/modulepreload-polyfill";
import HomepageScreen from "./features/DashboardScreen";
import Dashboard from "./features/DashboardScreen";
import PhoneDashboard from "./features/phoneDashboardScreen";
import ProfileScreen from "./features/user/Profile";

const App = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <AuthSide
            onSubmit={function (email: string, password: string): void {
              throw new Error("Function not implemented.");
            }}
          />
        }
      />
      <Route path="/find" element={<DocFind />} />
      <Route path="/booking" element={<DocSearch />} />
      <Route path="/docsearch" element={<DocSearch />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/phonedashboard" element={<PhoneDashboard />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/find-doctors" element={<DocFind />} />
    </Routes>
  </Router>
);

export default App;

/*
function App() {
  let items = ["San Francisco", "New York", "Sweden", "London", "Paris"];
  const handleSelectItem = (item: string) => {
    console.log(item);
  };
  const [alertVisible, setAlertVisbility] = useState(false);
  return (
    <div>
      <Header />
      <div>
        {" "}
        <ListGroup
          items={items}
          heading="Cities"
          onSelectItem={handleSelectItem}
        ></ListGroup>{" "}
      </div>
      <div>
        <Form></Form>
      </div>
      <div>
        {alertVisible && (
          <Alert onClose={() => setAlertVisbility(false)}>
            <b>Hello WORLD</b>
          </Alert>
        )}
        <Button color="secondary" onClick={() => setAlertVisbility(true)}>
          Next
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export default App;
*/
