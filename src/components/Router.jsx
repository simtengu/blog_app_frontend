import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "../pages/Auth";
import FilteredPosts from "../pages/FilteredProducts";
import Homepage from "../pages/Homepage";
import NewPost from "../pages/NewPost";
import PostDetails from "../pages/PostDetails";
import UpdatePost from "../pages/UpdatePost";
import UpdateProfile from "../pages/UpdateProfile";
import UserPosts from "../pages/UserPosts";
import UserProfileIndex from "../pages/UserProfileIndex";
import Layout from "./Layout";
import ScrollToTop from "./ScrollToTop";
import Protected from "./user/Protected";
const Navigation = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route element={<Layout />}>
          <Route path="/post_details/:postId" element={<PostDetails />} />
          <Route path="/posts/filtered" element={<FilteredPosts />} />
          <Route path="/user/posts/:userId" element={<UserPosts />} />
          <Route path="/auth" element={<Auth />} />
          <Route element={<Protected />}>
            <Route path="/user_account/index" element={<UserProfileIndex />} />
            <Route path="/post/new" element={<NewPost />} />
            <Route path="/post/update/:postId" element={<UpdatePost />} />
            <Route
              path="/user_account/update_profile"
              element={<UpdateProfile />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default Navigation;
