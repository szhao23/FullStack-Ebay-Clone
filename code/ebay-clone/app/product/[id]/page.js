"use client";

import MainLayout from "@/app/layouts/MainLayout";


export default function Product({ params }) {
  const product = {
    id: 1,
    title: "Brown Leather Bag",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi quia illo dolore unde dolorem expedita assumenda enim fugit magnam? Earum quibusdam quas quaerat placeat dolor! Quisquam ut harum omnis.",
    url: "https://picsum.photos/id/7",
    price: 2500, // EG: $25.00
  };

  return (
    <MainLayout>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex px-4 py-10">
          {product?.url ? (
            <img
              
              className="w-[40%] rounded-lg"
              src={product?.url + "/280"}
            />
          ) : (
            <div className="w-[40%]"></div>
          )}
          <div className="px-4 w-full">
            <div className="font-bold text-xl">{product?.title}</div>
            <div className="text-sm text-gray-700 pt-2">
              Brand New - Full Waranty
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
