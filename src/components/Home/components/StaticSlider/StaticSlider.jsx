import React from 'react';
import Slider from 'react-slick';
import slider1 from "../../../../assets/finalProject assets/images/slider-image-1.jpeg";
import slider2 from "../../../../assets/finalProject assets/images/slider-image-2.jpeg";
import slider3 from "../../../../assets/finalProject assets/images/slider-image-3.jpeg";
import static1 from "../../../../assets/finalProject assets/images/grocery-banner.png";
import static2 from "../../../../assets/finalProject assets/images/grocery-banner-2.jpeg";

export default function StaticSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="container mx-auto px-5 py-10">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Main Slider */}
        <div className="lg:w-9/12 w-full">
          <Slider {...settings}>
            <div>
              <img src={slider1} className="w-full h-[350px] lg:h-[500px] object-cover rounded-lg shadow-lg" alt="Slide 1" />
            </div>
            <div>
              <img src={slider2} className="w-full h-[350px] lg:h-[500px] object-cover rounded-lg shadow-lg" alt="Slide 2" />
            </div>
            <div>
              <img src={slider3} className="w-full h-[350px] lg:h-[500px] object-cover rounded-lg shadow-lg" alt="Slide 3" />
            </div>
          </Slider>
        </div>

        {/* Static Banners */}
        <div className="lg:w-3/12 w-full flex flex-col gap-2">
          <img src={static1} className="w-full h-[170px] lg:h-[250px] object-cover rounded-lg shadow-md hover:scale-104 transition-all duration-300" alt="Static 1" />
          <img src={static2} className="w-full h-[170px] lg:h-[250px] object-cover rounded-lg shadow-md hover:scale-104 transition-all duration-300" alt="Static 2" />
        </div>

      </div>
    </div>
  );
}
