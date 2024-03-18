"use client";

import TopMenu from "./includes/TopMenu";
import MainHeader from "./includes/MainHeader";
import SubMenu from "./includes/SubMenu";
import Footer from "./includes/Footer";
import { useEffect, useState } from "react";

// Main Layout Content
export default function MainLayout({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.addEventListener("storage", function () {
      // Get state isLoading from LocalStorage
      let res = localStorage.getItem("isLoading");
      // If result is false, set isLoading to false else is true
      res === "false" ? setIsLoading(false) : setIsLoading(true);
    });
  });

  return (
    <>
      <div id="Mainlayout" className="min-w[1050px] max-w-[1300px] mx-auto">
        <div>
          <TopMenu />
          <MainHeader />
          <SubMenu />

          {children}

          <Footer />
        </div>
      </div>
    </>
  );
}
