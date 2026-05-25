import React from "react";

const StatCard = ({
  title,
  value,
}) => {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <p className="text-sm text-zinc-500">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-black">
        {value}
      </h2>

    </div>
  );
};

export default StatCard;