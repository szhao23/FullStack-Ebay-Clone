"use client";

import Image from "next/image";
import Link from "next/link";

export default function Product({ product }) {
  return (
    <>
      <Link
        className="max-w-[200px] p-1.5 border border-gray-50 hover:border-gray-200 hover:shadow-xl bg-gray-100 rounded mx-auto"
        href={`/product/${product.id}`}
      >
        {product?.url ? (
          // If product image exists, show the image else no
          <img className="rounded cursor-pointer" src={product.url + "/190"} />
        ) : null}
        <div className="pt-2 px-1">
          <div className="font-semibold text-[15px] hover:underline cursor-pointer">
            {product?.title}
            <div className="font-extrabold">
              {/* EG: Rounds 19.333333 to 19.33 */}$
              {(product?.price / 100).toFixed(2)}
            </div>

            <div className="relative flex items-center text-[12px] text-gray-500">
              {/* Make the Price Higher */}
              <div className="line-through">
                ${((product?.price * 1.2) / 100).toFixed(2)}
              </div>
              <div className="px-2">-</div>
              <div className="line-through">20%</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
