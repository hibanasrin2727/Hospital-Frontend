
import About from "./About";
import Services from "./Services";
import Departments from "./Departments";
import Doctors from "./Doctors";
import Appointment from "./Appointment";
import FAQ from "./FAQ";
import Contact from "./Contact";
import Stats from "./Stats";




const Home = () => {
  return (
    <main className="w-full">

      {/* =====================================================
          HERO SECTION
          ===================================================== */}
      <section
        id="home"
        className="scroll-mt-[107px] relative min-h-[870px] overflow-hidden bg-[#eaf5fb]"
      >

        {/* ================= BACKGROUND IMAGE ================= */}
        <img
          src="/assets/img/hero-bg.jpg"
          alt="Hospital doctor"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* ================= LIGHT OVERLAY ================= */}
        <div className="absolute inset-0 bg-white/0"></div>

        {/* ================= HERO CONTENT ================= */}
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-8 lg:px-10">

         {/* =================================================
            WELCOME CONTENT
            ================================================= */}
        <div className="pt-[130px] md:pt-[135px] lg:pt-[100px]">

          {/* Small Label */}
          <div className="mb-4 flex items-center gap-3">
            <span className="h-[2px] w-10 bg-[#1976c8]"></span>

            <span className="text-[13px] font-semibold uppercase tracking-[2px] text-[#1976c8]">
              Trusted Healthcare
            </span>
          </div>

         
          {/* Welcome Heading */}
          <h2
            className=" font-['Montserrat_Black'] font-bold leading-[1.05] tracking-[1px] !text-[#105592] drop-shadow-[0_1px_1px_rgba(41,75,104,0.15)] !text-5xl"
          >
            WELCOME TO <span className="hover:text-[#4b95d6] text-[#105592]">HOSPITALCARE</span>
          </h2>

          {/* Main Heading */}
          <h1
            className="mt-3 max-w-[700px] text-[38px] font-black leading-[1.1] tracking-[-1px] text-[#294b68] md:text-[44px] lg:text-[40px]"
          >
            Your Health,{" "}
            <span className="text-[#1976c8]">
              Our Priority
            </span>
          </h1>

          {/* Description */}
          <p
            className="mt-3 max-w-[650px] text-[17px] font-normal leading-[1.7] text-[#425466] md:text-[18px]"
          >
            Experience trusted healthcare with compassionate doctors,
            modern medical services, and personalized care for you
            and your family.
          </p>

        </div>
          {/* =================================================
              LOWER CONTENT
              ================================================= */}
          <div className="mt-[58px] grid grid-cols-1 gap-6 lg:grid-cols-[376px_1fr] lg:gap-5">

            {/* ===============================================
                WHY CHOOSE CARD
                =============================================== */}
            <div className="flex">

              <div
                className="flex min-h-[348px] w-full flex-col rounded-[3px] bg-[#1976c8] p-7 text-white shadow-sm md:p-8"
              >

                <h2 className="max-w-[280px] text-[31px] font-bold leading-[1.15]">
                  Why Choose
                  <br />
                  HospitalCare?
                </h2>

                <p className="mt-7 text-[17px] leading-[1.55] text-white">
                  We provide reliable healthcare services with
                  experienced doctors, specialized departments,
                  and patient-focused care. Our goal is to make
                  quality healthcare accessible and convenient.
                </p>

                {/* Button */}
                <div className="mt-auto flex justify-center pt-7">

                  <a
                    href="#about"
                    className="inline-flex items-center gap-2 rounded-full bg-[#4fa0e3] px-7 py-2.5 text-[14px] font-medium text-white !no-underline transition-all duration-300 hover:bg-[#294b68]"
                  >
                    <span>Learn More</span>

                    <i className="bi bi-chevron-right text-[11px]"></i>
                  </a>

                </div>

              </div>

            </div>

            {/* ===============================================
                FEATURE CARDS
                =============================================== */}
            <div className="flex items-center">

              <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3">

                {/* ================= FEATURE 1 ================= */}
                <div
                  className="min-h-[274px] rounded-[9px] border border-white/60 bg-white/75 px-6 py-10 text-center shadow-[0_5px_20px_rgba(0,0,0,0.08)] backdrop-blur-[2px] transition-all duration-300 hover:-translate-y-1 hover:bg-white/90"
                >

                  <i className="bi bi-heart-pulse text-[40px] text-[#1976c8]"></i>

                  <h3 className="mt-5 text-[18px] font-bold leading-[1.2] text-[#294b68]">
                    Expert Medical
                    <br />
                    Care
                  </h3>

                  <p className="mt-5 text-[14px] leading-[1.55] text-[#777]">
                    Experienced doctors and healthcare
                    professionals provide trusted medical care.
                  </p>

                </div>

                {/* ================= FEATURE 2 ================= */}
                <div
                  className="min-h-[274px] rounded-[9px] border border-white/60 bg-white/75 px-6 py-10 text-center shadow-[0_5px_20px_rgba(0,0,0,0.08)] backdrop-blur-[2px] transition-all duration-300 hover:-translate-y-1 hover:bg-white/90"
                >

                  <i className="bi bi-person-check text-[40px] text-[#1976c8]"></i>

                  <h3 className="mt-5 text-[18px] font-bold leading-[1.2] text-[#294b68]">
                    Experienced
                    <br />
                    Doctors
                  </h3>

                  <p className="mt-5 text-[14px] leading-[1.55] text-[#777]">
                    Connect with qualified doctors across
                    different medical specialties.
                  </p>

                </div>

                {/* ================= FEATURE 3 ================= */}
                <div
                  className="min-h-[274px] rounded-[9px] border border-white/60 bg-white/75 px-6 py-10 text-center shadow-[0_5px_20px_rgba(0,0,0,0.08)] backdrop-blur-[2px] transition-all duration-300 hover:-translate-y-1 hover:bg-white/90"
                >

                  <i className="bi bi-calendar-check text-[40px] text-[#1976c8]"></i>

                  <h3 className="mt-5 text-[18px] font-bold leading-[1.2] text-[#294b68]">
                    Easy
                    <br />
                    Appointments
                  </h3>

                  <p className="mt-5 text-[14px] leading-[1.55] text-[#777]">
                    Book your appointment easily and choose
                    the doctor and department you need.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>




            {/* =====================================================
          ABOUT SECTION
          ===================================================== */}
      <About />

      <Stats />

      {/* =====================================================
          SERVICES SECTION
          ===================================================== */}
      <Services />

      {/* =====================================================
          DEPARTMENTS SECTION
          ===================================================== */}
      <Departments />

      {/* =====================================================
          DOCTORS SECTION
          ===================================================== */}
      <Doctors />

      {/* =====================================================
          APPOINTMENT SECTION
          ===================================================== */}
      <Appointment />

      {/* =====================================================
          FAQ SECTION
          ===================================================== */}
      <FAQ />

      {/* =====================================================
          CONTACT SECTION
          ===================================================== */}
      <Contact />


    </main>
  );
};

export default Home;