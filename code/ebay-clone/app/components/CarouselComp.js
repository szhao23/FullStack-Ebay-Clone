"use client";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import banner from "../../public/images/banner/1.png";

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
          <Image width={594} src={banner} unoptimized />
        </Carousel>
      </div>
    </>
  );
}
