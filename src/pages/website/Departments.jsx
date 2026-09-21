import { useEffect, useState } from "react";
import api from "../../services/api";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [activeDepartment, setActiveDepartment] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= GET ACTIVE DEPARTMENTS =================
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get("/website/departments");

        console.log("Departments API response:", response.data);

        // Backend response:
        // {
        //   departments: [...]
        // }

        const departmentData = response.data?.departments || [];

        setDepartments(
          Array.isArray(departmentData) ? departmentData : []
        );
      } catch (error) {
        console.error("Error fetching departments:", error);
        setError("Unable to load departments.");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // ================= DEPARTMENT IMAGE =================
  const getDepartmentImage = (department, index) => {
    // If backend has an image, use it
    if (department?.image) {
      if (department.image.startsWith("http")) {
        return department.image;
      }

      return department.image.startsWith("/")
        ? department.image
        : `/assets/img/${department.image}`;
    }

    // Otherwise use existing MediLab department images
    const imageNumber = (index % 5) + 1;

    return `/assets/img/departments-${imageNumber}.jpg`;
  };

  return (
    <main className="w-full">
      {/* =====================================================
          DEPARTMENTS SECTION
      ====================================================== */}
      <section
        id="departments"
        className="scroll-mt-[107px] bg-white py-[65px] md:py-[65px] lg:py-[70px]"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-8 lg:px-10">

          {/* =================================================
              SECTION TITLE
          ================================================== */}
          <div className="mx-auto max-w-[850px] text-center">

            <h2 className="text-[30px] font-semibold leading-[1.2] text-[#294b68] md:text-[32px]">
              Departments
            </h2>

            {/* Title Divider */}
            <div className="mx-auto mt-[16px] flex h-[3px] w-[160px] items-center justify-center">
              <span className="h-[1px] w-[50px] bg-[#bdbdbd]"></span>

              <span className="h-[3px] w-[60px] bg-[#1976c8]"></span>

              <span className="h-[1px] w-[50px] bg-[#bdbdbd]"></span>
            </div>

            <p className="mt-[20px] text-[14px] leading-[1.7] text-[#444] md:text-[15px]">
              Explore our specialized healthcare departments and find the
              right medical care for your needs.
            </p>
          </div>

          {/* =================================================
              LOADING
          ================================================== */}
          {loading && (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex flex-col items-center">

                <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#dbeaf6] border-t-[#1976c8]"></div>

                <p className="mt-4 text-[14px] text-[#666]">
                  Loading departments...
                </p>

              </div>
            </div>
          )}

          {/* =================================================
              ERROR
          ================================================== */}
          {!loading && error && (
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-[15px] text-red-500">
                {error}
              </p>
            </div>
          )}

          {/* =================================================
              NO DEPARTMENTS
          ================================================== */}
          {!loading &&
            !error &&
            departments.length === 0 && (
              <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-[15px] text-[#666]">
                  No departments available.
                </p>
              </div>
            )}

          {/* =================================================
              DEPARTMENT CONTENT
          ================================================== */}
          {!loading &&
            !error &&
            departments.length > 0 && (
              <div className="mt-[58px] grid grid-cols-1 gap-8 lg:grid-cols-[285px_1fr]">

              {/* =================================================
                    LEFT SIDE - DEPARTMENT LIST
                ================================================== */}
              <div className="w-full">

                <div className="flex flex-col">

                  {departments.map((department, index) => (
                    <button
                      key={department._id}
                      type="button"
                        onClick={() =>
                          setActiveDepartment(index)
                        }
                      className={`relative flex min-h-[46px] w-full items-center border-0 bg-transparent px-0 py-[10px] pr-[20px] text-left text-[14px] font-semibold transition-all duration-300 ${activeDepartment === index
                        ? "text-[#1976c8]"
                        : "text-[#222] hover:text-[#1976c8]"
                        }`}
                      >
                        {department.name}

                      {/* Active blue vertical line */}
                      {activeDepartment === index && (
                        <span className="absolute right-0 top-0 h-full w-[2px] bg-[#1976c8]"></span>
                      )}
                    </button>
                  ))}

                </div>
              </div>

              {/* =================================================
                    RIGHT SIDE
                ================================================== */}
              <div className="min-w-0">

                {departments.map((department, index) => {
                  const isActive =
                    activeDepartment === index;

                  return (
                    <div
                      key={department._id}
                      className={isActive ? "block" : "hidden"}
                    >

                      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_310px]">

                        {/* =================================================
                              DEPARTMENT DETAILS
                          ================================================== */}
                        <div className="border-l-[2px] border-[#e5e5e5] pl-[22px]">

                          <h3 className="text-[26px] font-semibold leading-[1.25] text-[#294b68] md:text-[28px]">
                            {department.name}
                          </h3>

                          <p className="mt-[20px] text-[14px] italic leading-[1.7] text-[#666] md:text-[15px]">
                            Specialized medical care provided by
                            experienced healthcare professionals.
                          </p>

                          <p className="mt-[18px] max-w-[650px] text-[14px] leading-[1.7] text-[#555] md:text-[15px]">
                            {department.description ||
                              `Our ${department.name} department provides healthcare services and consultations for patients requiring specialized medical care.`}
                          </p>

                        </div>

                        {/* =================================================
                              DEPARTMENT IMAGE
                          ================================================== */}
                        <div className="flex justify-center lg:justify-end">

                          <img
                            src={getDepartmentImage(
                              department,
                              index
                            )}
                            alt={department.name}
                            className="h-[268px] w-full max-w-[310px] object-cover"
                          />

                        </div>

                      </div>
                    </div>
                  );
                })}

              </div>
            </div>
            )}
        </div>
      </section>
    </main>
  );
};

export default Departments;