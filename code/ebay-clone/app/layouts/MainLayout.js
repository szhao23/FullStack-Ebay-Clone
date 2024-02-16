"use client";

import TopMenu from "./includes/TopMenu";
import MainHeader from "./includes/MainHeader";
import SubMenu from "./includes/SubMenu";

// Main Layout Content
export default function MainLayout({ children }) {
  return (
    <>
      <div id="Mainlayout" className="min-w[1050px] max-w-[1300px] mx-auto">
        <div>
          <TopMenu />
          <MainHeader />
          <SubMenu />
        </div>
      </div>
    </>
  );
}
