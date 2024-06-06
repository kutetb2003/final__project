import "swiper/css";
import "swiper/css/pagination";

import "./style.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper/modules";
import React, { useEffect, useState } from "react";
// register Swiper custom elements

const SwiperComp = () => {
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/advertise");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAdvertisements(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
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
              <img src={item.thumbnail}></img>
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
