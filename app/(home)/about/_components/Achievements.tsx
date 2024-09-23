import React from "react";
import Image from "next/image";

const Achievements = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className="achievements py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="border-solid border-2 border-gray-300 rounded-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-6 md:mb-0" ref={ref}>
              <Image
                src={`https://res.cloudinary.com/duxay6ujg/image/upload/v1726774023/photo-1531077386034-d12285794b5c_ubpueb.avif`}
                alt="Room"
                width={500}
                height={300}
                className="rounded-lg w-full h-auto"
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-8">
              <h3 className="text-2xl font-bold text-blue-950 mb-4">
                Our Achievements
              </h3>
              <p className="text-gray-600 mb-6">
                Since 2013, we’ve helped thousands of guests find their perfect
                stay. With a wide range of comfortable rooms and apartments, we
                make it easy to explore different neighborhoods and choose the
                right spot for your journey. Whether it’s for work, leisure, or
                a getaway, your stay matters, and finding the right place sets
                the stage for an unforgettable experience.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-blue-950">
                    4235+
                  </p>
                  <p className="text-sm md:text-base text-gray-600">Rooms</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-blue-950">
                    420+
                  </p>
                  <p className="text-sm md:text-base text-gray-600">Bookings</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-blue-950">
                    1905+
                  </p>
                  <p className="text-sm md:text-base text-gray-600">Students</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Achievements;
Achievements.displayName = "Achievements";
