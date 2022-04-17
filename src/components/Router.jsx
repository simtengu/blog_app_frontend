import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import NewPost from '../pages/NewPost';
import PostDetails from '../pages/PostDetails';
import UpdatePost from '../pages/UpdatePost';
import UpdateProfile from '../pages/UpdateProfile';
import UserProfileIndex from '../pages/UserProfileIndex';
import Layout from './Layout';
import Protected from './user/Protected';
const Navigation = () => {
    return ( 
        <>
<Routes>
    <Route path="/" element={<Homepage />} />
    <Route element={<Layout />}>
     <Route  path="/post_details" element={<PostDetails />} />
     <Route element={<Protected />}>
         <Route  path="/user_account/index" element={<UserProfileIndex />} />
         <Route  path="/post/new" element={<NewPost />} />
         <Route  path="/post/update/:postId" element={<UpdatePost />} />
         <Route  path="/user_account/update_profile" element={<UpdateProfile />} />
     </Route>
    </Route>
</Routes>
        </>
     );
}
 
export default Navigation;