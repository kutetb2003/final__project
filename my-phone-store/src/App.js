import Home from "./pages/Home";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from './pages/Login'
import ProductDetail from "./pages/Products/ProductDetail.js";
import LayoutDefault from "./Layout/LayoutDefault/index.js";

function App() {
  return (
    <>
      <Routes>
        <Route path = "/" element = {<LayoutDefault/>}>
          <Route path="/" element={<Home />}></Route>
          <Route path="products" element={<Products />}>
            <Route path = "detail/:id" element = {<ProductDetail/>}/>
          </Route>
          <Route path="about" element={<About />}></Route>
          <Route path="contacts" element={<Contact />}></Route>
          <Route path="login" element = {<Login/>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
