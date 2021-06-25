import React from "react";

const Brand = ({ children }) => {
  return (
    <div className="flex items-center justify-between brand-area">
      <div className="flex items-center brand">
        <img src="/assets/images/i1.png" alt="company-logo"  style={{ width:180,height:80}}/>
      </div>
      {children}
    </div>
  );
};

export default Brand;
