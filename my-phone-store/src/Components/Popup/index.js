import React from "react";
import "./style.scss";

const Popup = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup__content">
        <div className="popup__content__message">
          <div className="popup__content__message__close" onClick={onClose}>
            x
          </div>
          <img
            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222.png"
            alt="Popup Image"
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;
