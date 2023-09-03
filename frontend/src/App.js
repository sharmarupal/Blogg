import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import React, { useEffect } from "react";
import Blogs from "./components/Blogs";
import BlogDetail from "./components/BlogDetail";
import UserBlogs from "./components/UserBlogs";
import AddBlog from "./components/AddBlog";
import { useDispatch, useSelector } from "react-redux";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { authActions } from "./store";

function App() {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);


  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blogs" element={<Blogs />} /></> :
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetail />} />
            </>}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
