import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-[85rem] mx-auto">{children}</div>;
};

export default MainLayout;
