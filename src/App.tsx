import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Toaster } from "react-hot-toast";
import { Blogs } from "./pages/Blogs";
import Landing from "./components/Landing";
import { Membership } from "./pages/membership";

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
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
