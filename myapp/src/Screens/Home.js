import React from "react";
import { useAuth } from "../Context/AuthContext";
import DashboardCards from "../Components/DashboardCards/DashboardCards";
import DashboardCards2 from "../Components/DashboardCards/DashboardCards2";
import DashboardCards3 from "../Components/DashboardCards/DashboardCards3";
import DashboardCards4 from "../Components/DashboardCards/DashboardCards4";
import DashboardChart1 from "../Components/DashboardCharts/DashboardChart1";

const Home = () => {


  // const { logout } = useAuth();
  // const logouthandler = () => {
  //   logout();
  // };

  return (
    <>
      <main className=" w-full">
        <section className="p-4 text-center">
          <div className=" bg-gray-200 shadow-xl p-4 font-semibold text-2xl">Admin Dashboard</div>
        </section>

        <section>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 p-4">
            <DashboardCards />
            <DashboardCards2 />
            <DashboardCards3 />
            <DashboardCards4 />
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
