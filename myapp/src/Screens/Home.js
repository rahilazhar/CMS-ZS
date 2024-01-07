import React, { useEffect } from "react";
import { gsap } from "gsap";
import DashboardCards from "../Components/DashboardCards/DashboardCards";
import DashboardCards2 from "../Components/DashboardCards/DashboardCards2";
import DashboardCards3 from "../Components/DashboardCards/DashboardCards3";
import DashboardCards4 from "../Components/DashboardCards/DashboardCards4";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    gsap.from(".admin-dashboard-title", { duration: 1, autoAlpha: 0, y: -30 });

    const tl = gsap.timeline();
    tl.to(".dashboard-card", {
      duration: 0.5,
      autoAlpha: 1,
      scale: 1.05,
      stagger: 0.2,
      ease: "power2.inOut"
    });
  }, []);

  return (
    <>
      <main className="w-full">
        <section className="p-4 text-center">
          <div className="bg-gray-200 shadow-xl p-4 font-semibold text-2xl admin-dashboard-title">
            Admin Dashboard
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 p-4">
            <div className="dashboard-card opacity-0 scale-95 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              <DashboardCards />
            </div>
            <div className="dashboard-card opacity-0 scale-95 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              <DashboardCards2 />
            </div>

            <div className="dashboard-card cursor-pointer opacity-0 scale-95 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              <Link to='/editreq'>
                <DashboardCards3 />
              </Link>
            </div>

            <div className="dashboard-card opacity-0 scale-95 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              <DashboardCards4 />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
