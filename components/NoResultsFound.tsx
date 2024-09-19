import React from "react";
import { SearchX } from "lucide-react";

const NoResultsFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <SearchX size={48} className="text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        No Results Found
      </h2>
      <p className="text-gray-500 mb-4">
        We couldn't find any properties matching your search criteria.
      </p>
      <p className="text-gray-500">
        Try adjusting your filters or search terms to find more options.
      </p>
    </div>
  );
};

export default NoResultsFound;
