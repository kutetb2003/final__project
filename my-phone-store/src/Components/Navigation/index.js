import "./Navigation.scss";
import React from "react";
import { NavLink, Link } from "react-router-dom";
const NavBar = () => {
  const navItem = ["Home", "Our Products", "About Us", "Contact Us", "Cart"];
  const linkItem = ["/", "/products", "/about", "/contact", "/cart"];
  const navLinkActive = (e) =>{
    return(
      e.isActive ? "nav__list__item nav__list__item--active" : "nav__list__item"
    );
  }
  return (
    <>
      <div className="nav__container">
        <div className="nav__row">
          <div className="nav__logo">
            <Link to = "/">CELLPHONE</Link>
            <Link to = "/"> SELLING</Link>
          </div>
          <div className = "nav__list">
            {navItem.map((item, index) => (
              <NavLink to = {linkItem[index]} className= {navLinkActive} key={index}>
                {item}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
