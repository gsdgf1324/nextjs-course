import React from "react";
import MainHeader from "../MainHeader/MainHeader";

type AppLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: AppLayoutProps) => {
  return (
    <React.Fragment>
      <MainHeader />
      {children}
    </React.Fragment>
  );
};

export default MainLayout;
