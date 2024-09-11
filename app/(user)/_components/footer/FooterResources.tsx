import React from "react";

const FooterResources: React.FC = () => {
  return (
    <div>
      <div className="md:flex flex-col align-middle hidden">
        <h3 className="font-bold text-sm mb-2">RESOURCES</h3>
        <div className="mb-2 text-sm">
          <p className="mb-2">
            123 Comfort Lane, Suite 456
            <br />
            Restville, Chillonia 78910
          </p>
          <p className="mb-2">Phone: (123) 456-7890</p>
          <p>support@stayease.com</p>
        </div>
      </div>
    </div>
  );
};

export default FooterResources;
