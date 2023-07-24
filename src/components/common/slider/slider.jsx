import "./slider.scss";
import { constants } from "../../../constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Navigation, Autoplay } from "swiper";

const { slider } = constants;

const Slider = () => {
  return (
    <Swiper
      effect="fade"
      pagination={{ clickable: true }}
      navigation={true}
      modules={[EffectFade, Pagination, Navigation, Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="slider"
    >
      {slider.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="content">
            <h2>{item.title}</h2>
            <p>{item.subtitle}</p>
          </div>
          <img src={`/img/${item.image}`} alt={item.title} title={item.title} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
