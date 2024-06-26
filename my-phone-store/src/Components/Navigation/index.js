import "./Navigation.scss";
import React from "react";
import { LiaUserCircle } from "react-icons/lia";
import { NavLink, Link } from "react-router-dom";
import { FiAlignRight } from "react-icons/fi";
const NavBar = () => {
  const navItem = [
    "Home",
    "Our Products",
    "About Us",
    "Contact Us",
    <LiaUserCircle />,
  ];
  const linkItem = ["/", "/products", "/about", "/contacts", "/login"];
  const navLinkActive = (e) => {
    return e.isActive
      ? "nav__list__item nav__list__item--active"
      : "nav__list__item";
  };
  return (
    <>
      <div className="nav__container">
        <div className="nav__row">
          <div className="nav__logo">
            <Link to="/">CELLPHONE</Link>
            <Link to="/"> SELLING</Link>
          </div>
          <div className="nav__list">
            {navItem.map((item, index) => (
              <NavLink
                to={linkItem[index]}
                className={navLinkActive}
                key={index}
              >
                {item}
              </NavLink>
            ))}
            
          </div>
          <div className="nav__list__icon--mobi">
              <FiAlignRight />
            </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
