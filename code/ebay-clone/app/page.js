"use client";

import MainLayout from "./layouts/MainLayout";
import CarouselComp from "./components/CarouselComp";
import Product from "./components/Product";

export default function Home() {
  const products = [
    {
      id: 1,
      title: "Brown Leather Bag",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi quia illo dolore unde dolorem expedita assumenda enim fugit magnam? Earum quibusdam quas quaerat placeat dolor! Quisquam ut harum omnis.",
      url: "https://picsum.photos/id/7",
      price: 2500, // EG: $25.00
    },
    {
      id: 2,
      title: "School Books",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi quia illo dolore unde dolorem expedita assumenda enim fugit magnam? Earum quibusdam quas quaerat placeat dolor! Quisquam ut harum omnis.",
      url: "https://picsum.photos/id/20",
      price: 1999, // EG: $25.00
    },
  ];

  return (
    <MainLayout>
      <CarouselComp />

      <div className="max-w-[1200px] mx-auto">
        <div className="text-2xl font-bold mt-4 mb-6 px-4">Products</div>

        <div className="grid grid-cols-5 gap-4">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
