import React from "react";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="">{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default layout;
