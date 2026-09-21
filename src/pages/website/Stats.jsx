import { useEffect, useState } from "react";
import api from "../../services/api";

const Stats = () => {

  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalDepartments: 0,
    totalServices: 0,
    totalPatients: 0,
  });


  // =====================================================
  // FETCH STATS
  // =====================================================

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const response = await api.get("/website/stats");

        setStats(response.data);

      } catch (error) {

        console.error("Failed to load website stats:", error);

      }

    };

    fetchStats();

  }, []);


  return (
    <section
      id="stats"
      className="scroll-mt-[107px] bg-[#eef7fd] py-[70px] md:py-[80px]"
    >

      {/* =================================================
          CONTAINER
          ================================================= */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-8 lg:px-10">

        {/* =================================================
            STATS GRID
            ================================================= */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-[65px] sm:grid-cols-2 lg:grid-cols-4">


          {/* =================================================
              DOCTORS
              ================================================= */}
          <div className="relative flex justify-center">

            {/* ================= ICON ================= */}
            <div className="absolute -top-[27px] z-10 flex h-[54px] w-[54px] items-center justify-center rounded-full border-[3px] border-white bg-[#1976c8] text-white shadow-[0_6px_18px_rgba(25,118,200,0.20)]">

              <i className="bi bi-person-badge-fill text-[23px]"></i>

            </div>


            {/* ================= CARD ================= */}
            <div className="flex h-[147px] w-full flex-col items-center justify-center rounded-[4px] bg-white pt-[20px] shadow-[0_10px_30px_rgba(41,75,104,0.10)]">

              <span className="text-[34px] font-bold leading-none text-[#294b68]">
                {stats.totalDoctors}
              </span>

              <p className="mb-0 mt-4 text-[15px] font-normal text-[#333]">
                Doctors
              </p>

            </div>

          </div>


          {/* =================================================
              DEPARTMENTS
              ================================================= */}
          <div className="relative flex justify-center">

            {/* ================= ICON ================= */}
            <div className="absolute -top-[27px] z-10 flex h-[54px] w-[54px] items-center justify-center rounded-full border-[3px] border-white bg-[#1976c8] text-white shadow-[0_6px_18px_rgba(25,118,200,0.20)]">

              <i className="bi bi-hospital-fill text-[23px]"></i>

            </div>


            {/* ================= CARD ================= */}
            <div className="flex h-[147px] w-full flex-col items-center justify-center rounded-[4px] bg-white pt-[20px] shadow-[0_10px_30px_rgba(41,75,104,0.10)]">

              <span className="text-[34px] font-bold leading-none text-[#294b68]">
                {stats.totalDepartments}
              </span>

              <p className="mb-0 mt-4 text-[15px] font-normal text-[#333]">
                Departments
              </p>

            </div>

          </div>


          {/* =================================================
              MEDICAL SERVICES
              ================================================= */}
          <div className="relative flex justify-center">

            {/* ================= ICON ================= */}
            <div className="absolute -top-[27px] z-10 flex h-[54px] w-[54px] items-center justify-center rounded-full border-[3px] border-white bg-[#1976c8] text-white shadow-[0_6px_18px_rgba(25,118,200,0.20)]">

              <i className="bi bi-heart-pulse-fill text-[23px]"></i>

            </div>


            {/* ================= CARD ================= */}
            <div className="flex h-[147px] w-full flex-col items-center justify-center rounded-[4px] bg-white pt-[20px] shadow-[0_10px_30px_rgba(41,75,104,0.10)]">

              <span className="text-[34px] font-bold leading-none text-[#294b68]">
                {stats.totalServices}
              </span>

              <p className="mb-0 mt-4 text-[15px] font-normal text-[#333]">
                Medical Services
              </p>

            </div>

          </div>


          {/* =================================================
              PATIENTS
              ================================================= */}
          <div className="relative flex justify-center">

            {/* ================= ICON ================= */}
            <div className="absolute -top-[27px] z-10 flex h-[54px] w-[54px] items-center justify-center rounded-full border-[3px] border-white bg-[#1976c8] text-white shadow-[0_6px_18px_rgba(25,118,200,0.20)]">

              <i className="bi bi-people-fill text-[23px]"></i>

            </div>


            {/* ================= CARD ================= */}
            <div className="flex h-[147px] w-full flex-col items-center justify-center rounded-[4px] bg-white pt-[20px] shadow-[0_10px_30px_rgba(41,75,104,0.10)]">

              <span className="text-[34px] font-bold leading-none text-[#294b68]">
                {stats.totalPatients}
              </span>

              <p className="mb-0 mt-4 text-[15px] font-normal text-[#333]">
                Patients
              </p>

            </div>

          </div>


        </div>

      </div>

    </section>
  );
};

export default Stats;