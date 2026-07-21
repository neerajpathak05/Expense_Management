import React from "react";

const DashboardCard = ({
  title,
  value,
  icon,
  bgColor,
  textColor = "text-white",
}) => {
  return (
    <div
      className={`
        ${bgColor}
        rounded-xl
        p-4
        sm:p-6
        shadow-lg
        w-full
      `}
    >
      <div className="flex justify-between items-center gap-3">

        {/* Text */}

        <div className="min-w-0">

          <p
            className={`
              ${textColor}
              opacity-90
              text-xs
              sm:text-sm
              truncate
            `}
          >
            {title}
          </p>

          <h2
            className={`
              ${textColor}
              text-2xl
              sm:text-3xl
              font-bold
              mt-2
              truncate
            `}
          >
            {value}
          </h2>

        </div>


        {/* Icon */}

        <div className="bg-white/20 p-3 sm:p-4 rounded-full shrink-0">
          {icon}
        </div>

      </div>
    </div>
  );
};

export default DashboardCard;