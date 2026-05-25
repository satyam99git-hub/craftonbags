import React from "react";

import StatCard from "../components/StatCard";

const Dashboard = () => {
  const stats = [
    {
      title: "Products",
      value: "120",
    },
    {
      title: "Users",
      value: "1,200",
    },
    {
      title: "Orders",
      value: "340",
    },
    {
      title: "Revenue",
      value: "₹2.4L",
    },
  ];

  return (
    <div>

      {/* Heading */}
      <div className="mb-8">

        <h1 className="text-4xl font-black">
          Dashboard
        </h1>

        <p className="mt-2 text-zinc-500">
          Overview of your platform
        </p>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
          />
        ))}

      </div>

    </div>
  );
};

export default Dashboard;