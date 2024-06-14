import "swiper/css";
import "swiper/css/pagination";

import "./style.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper/modules";
import React from "react";
// register Swiper custom elements

const SwiperComp = () => {
  const advertisements = [
    {
      id: 1,
      title: "Best offer",
      description: "new arrivals on sale",
      thumbnail:
        "https://9to5google.com/wp-content/uploads/sites/4/2024/01/galaxy-s24-ultra-head-1.jpg?quality=82&strip=all&w=1600",
    },
    {
      id: 2,
      title: "flash deals",
      description: "get your best products",
      thumbnail:
        "https://9to5mac.com/wp-content/uploads/sites/6/2023/09/Titanium-iPhone-15-Pro.jpg?quality=82&strip=all&w=1600",
    },
    {
      id: 3,
      title: "last minute",
      description: "grab last minute deals",
      thumbnail:
        "https://9to5mac.com/wp-content/uploads/sites/6/2024/04/ipad-pro-m4.jpg?quality=82&strip=all&w=1600",
    },
  ];

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {advertisements.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="image__holder">
              <img src={item.thumbnail} alt={item.title} />
            </div>
            <div className="image__desc">
              <div className="image__title">{item.title}</div>
              <div className="image__description">{item.description}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperComp;

