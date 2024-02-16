"use client";

import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import logo from "../../../public/images/logo.svg";
import Image from "next/image";

export default function MainHeader() {
  return (
    <div id="MainHeader" className="border-b">
      <div className="flex items-center justify-between w-full mx-auto max-w-[1200px]">
        <div className="flex items-center w-full bg-white">
          <div className="flex lg:justify-start justify-between gap-10 max-w-[1150px] w-full px-3 py-5 mx-auto">
            <Link href="/">
              <Image width="120" src={logo} />
            </Link>

            <div className="w-full">
              <div className="relative">
                <div className="flex items-center">
                  <div className="relative flex items-center border-2 border-gray-900 w-full p-2">
                    <button className="flex items-center">
                      <AiOutlineSearch size={22} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
