import React from "react";

const FAQHeader: React.FC = () => {
  return (
    <div className="bg-blue-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg md:text-xl">
          Find answers to common questions about StayEase and finding the
          perfect room for your stay
        </p>
      </div>
    </div>
  );
};

export default FAQHeader;
