import Home from "./pages/Home";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import LayoutDefault from "./Layout/LayoutDefault/index.js";

function App() {
  return (
    <>
      <Routes>
        <Route path = "/" element = {<LayoutDefault/>}>
          <Route path="/" element={<Home />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="contact" element={<Contact />}></Route>
          <Route path="cart" element = {<Cart/>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
