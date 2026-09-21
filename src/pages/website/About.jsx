const About = () => {
  // =====================================================
  // SCROLL TO SECTION
  // =====================================================
  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      const headerOffset = 107;

      const sectionPosition =
        section.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

      window.scrollTo({
        top: sectionPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="w-full">

      {/* =====================================================
          ABOUT SECTION
          ===================================================== */}
      <section
        id="about"
        className="scroll-mt-[107px] bg-white py-[70px] md:py-[80px] lg:py-[90px]"
      >

        <div className="mx-auto max-w-[1400px] px-6 md:px-8 lg:px-10">

          {/* =================================================
              ABOUT GRID
              ================================================= */}
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-[40px]">

            {/* =================================================
                LEFT - IMAGE
                ================================================= */}
            <div className="relative">

              <div className="relative overflow-hidden">

                <img
                  src="/assets/img/about.jpg"
                  alt="HospitalCare"
                  className="h-auto w-full object-cover"
                />

                {/* ================= PLAY BUTTON ================= */}
                <a
                  href="https://youtu.be/u2ZrmewTmus?si=Liuak4PS-h8ZoBK_"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Watch HospitalCare video"
                  className="absolute left-1/2 top-1/2 flex h-[64px] w-[64px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1976c8] text-white shadow-[0_5px_20px_rgba(25,118,200,0.35)] transition-all duration-300 hover:scale-110 hover:bg-[#105592]"
                >
                  <i className="bi bi-play-fill ml-[3px] text-[30px]"></i>
                </a>

              </div>

            </div>


            {/* =================================================
                RIGHT - CONTENT
                ================================================= */}
            <div className="lg:pl-[5px]">

              {/* ================= TITLE ================= */}
              <h2 className="!text-[30px] font-bold leading-[1.2] text-[#294b68] md:text-[34px]">
                About Us
              </h2>


              {/* ================= DESCRIPTION ================= */}
              <p className="mt-2 max-w-[620px] text-[15px] leading-[1.7] text-[#444] md:text-[16px]">
                HospitalCare is a modern healthcare management platform
                designed to make healthcare services simple and accessible.
                Patients can explore departments, find doctors, view
                medical services, and book appointments conveniently.
              </p>


              {/* =================================================
                  FEATURE LIST
                  ================================================= */}
              <div className="mt-[28px] ">


                {/* ================= FEATURE 1 ================= */}
                <div className="flex items-start gap-5">

                  {/* ICON */}
                  <div className="flex min-w-[48px] items-start justify-center pt-1">

                    <i className="bi bi-person-badge-fill text-[38px] text-[#1976c8]"></i>

                  </div>


                  {/* CONTENT */}
                  <div>

                    <h3 className="!text-[17px] font-bold leading-[1.3] text-[#294b68]">
                      Experienced Medical Professionals
                    </h3>

                    <p className="mt-2 text-[14px] leading-[1.55] text-[#555]">
                      Connect with qualified doctors across different
                      departments and specialties for reliable medical care.
                    </p>

                  </div>

                </div>


                {/* ================= FEATURE 2 ================= */}
                <div className="flex items-start gap-5">

                  {/* ICON */}
                  <div className="flex min-w-[48px] items-start justify-center pt-1">

                    <i className="bi bi-hospital-fill text-[38px] text-[#1976c8]"></i>

                  </div>


                  {/* CONTENT */}
                  <div>

                    <h3 className="!text-[17px] font-bold leading-[1.3] text-[#294b68]">
                      Specialized Healthcare Departments
                    </h3>

                    <p className="mt-2 text-[14px] leading-[1.55] text-[#555]">
                      Explore specialized departments and healthcare
                      services designed to meet different patient needs.
                    </p>

                  </div>

                </div>


                {/* ================= FEATURE 3 ================= */}
                <div className="flex items-start gap-5">

                  {/* ICON */}
                  <div className="flex min-w-[48px] items-start justify-center pt-1">

                    <i className="bi bi-calendar2-check-fill text-[38px] text-[#1976c8]"></i>

                  </div>


                  {/* CONTENT */}
                  <div>

                    <h3 className="!text-[17px] font-bold leading-[1.3] text-[#294b68]">
                      Simple Appointment Booking
                    </h3>

                    <p className="mt-2 text-[14px] leading-[1.55] text-[#555]">
                      Find your preferred doctor and department and
                      request an appointment through our simple system.
                    </p>

                  </div>

                </div>

              </div>


              {/* =================================================
                  MEET OUR DOCTORS BUTTON
                  ================================================= */}
              <div className="mt-[18px]">

                <button
                  type="button"
                  onClick={() => scrollToSection("doctors")}
                  className="inline-flex items-center gap-2 !rounded-full border-0 bg-[#1976c8] px-[26px] py-[11px] text-[14px] font-semibold text-white transition-all duration-300 hover:bg-[#105592]"
                >
                  <span>Meet Our Doctors</span>

                  <i className="bi bi-arrow-right text-[13px]"></i>
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default About;