import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Toaster } from "react-hot-toast";
import Landing from "./pages/Landing";
import { Membership } from "./pages/membership";
import { PublishPage } from "./pages/publish";
import { Blogs } from "./pages/Blogs";
import { FullBlogPage } from "./pages/fullBlog";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/publish" element={<PublishPage />} />
          <Route path="blog/:id" element={<FullBlogPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
