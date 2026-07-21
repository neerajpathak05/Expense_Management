import React from "react";

const DashboardCard = ({
  title,
  value,
  icon,
  bgColor,
  textColor = "text-white",
}) => {
  return (
    <div className={`${bgColor} rounded-xl p-6 shadow-lg`}>
      <div className="flex justify-between items-center">
        <div>
          <p className={`${textColor} opacity-90 text-sm`}>
            {title}
          </p>

          <h2 className={`${textColor} text-3xl font-bold mt-2`}>
            {value}
          </h2>
        </div>

        <div className="bg-white/20 p-4 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;