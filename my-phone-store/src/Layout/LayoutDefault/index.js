import NavBar from "../../Components/Navigation";
import Footer from "../../Components/Footer";
import { Outlet } from "react-router-dom";

const LayoutDefault = () => {
  return (
    <>
      <NavBar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default LayoutDefault;
