import React from "react";
import { Routes, Route } from "react-router-dom";

import ItemLayout from "./container/ItemLayout";
import Bookmark from "./container/Bookmark";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import TestPage from "./container/TestPage.js";

const BaseRouter = () => (
  <Routes>
    <Route path="/" element={<ItemLayout />} />
    <Route path="/login/" element={<LogIn />} />
    <Route path="/signup/" element={<SignUp />} />
    <Route path="/bookmark/" element={<Bookmark />} />
    <Route path="/testpage/" element={<TestPage />} />
  </Routes>
);

export default BaseRouter;
