"use client";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import banner1 from "../../public/images/banner/1.png";
import banner2 from "../../public/images/banner/2.png";
import banner3 from "../../public/images/banner/3.png";

export default function CarouselComp() {
  return (
    <>
      <div className="max-w-[1200px] mx-auto">
        <Carousel
          showArrows={true}
          autoPlay={true}
          interval={3000}
          infiniteLoop={true}
          showThumbs={false}
        >
          <Image width={594} src={banner1} unoptimized />
          <Image width={594} src={banner2} unoptimized />
          <Image width={594} src={banner3} unoptimized />
        </Carousel>
      </div>
    </>
  );
}
