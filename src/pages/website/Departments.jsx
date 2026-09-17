import { useEffect, useState } from "react";
import api from "../../services/api";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [activeDepartment, setActiveDepartment] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= GET DEPARTMENTS =================
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get(
          "/website/departments"
        );

        setDepartments(response.data.data || response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
        setError("Unable to load departments.");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <main className="main">

      {/* ================= DEPARTMENTS SECTION ================= */}
      <section id="departments" className="departments section">

        {/* Section Title */}
        <div
          className="container section-title"
          data-aos="fade-up"
        >
          <h2>Departments</h2>

          <p>
            Explore our specialized healthcare departments and
            find the right medical care for your needs.
          </p>
        </div>

        <div
          className="container"
          data-aos="fade-up"
          data-aos-delay="100"
        >

          {loading && (
            <div className="text-center py-5">
              <p>Loading departments...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-5">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && departments.length === 0 && (
            <div className="text-center py-5">
              <p>No departments available.</p>
            </div>
          )}

          {!loading && !error && departments.length > 0 && (

            <div className="row">

              {/* ================= DEPARTMENT TABS ================= */}
              <div className="col-lg-3">

                <ul className="nav nav-tabs flex-column">

                  {departments.map((department, index) => (
                    <li
                      className="nav-item"
                      key={department._id}
                    >

                      <button
                        type="button"
                        className={`nav-link ${
                          activeDepartment === index
                            ? "active show"
                            : ""
                        }`}
                        onClick={() =>
                          setActiveDepartment(index)
                        }
                      >
                        {department.name}
                      </button>

                    </li>
                  ))}

                </ul>

              </div>

              {/* ================= DEPARTMENT CONTENT ================= */}
              <div className="col-lg-9 mt-4 mt-lg-0">

                <div className="tab-content">

                  {departments.map((department, index) => (

                    <div
                      key={department._id}
                      className={`tab-pane ${
                        activeDepartment === index
                          ? "active show"
                          : ""
                      }`}
                    >

                      <div className="row">

                        {/* Details */}
                        <div className="col-lg-8 details order-2 order-lg-1">

                          <h3>
                            {department.name}
                          </h3>

                          <p className="fst-italic">
                            Specialized medical care provided by
                            experienced healthcare professionals.
                          </p>

                          <p>
                            {department.description ||
                              `Our ${department.name} department provides
                              healthcare services and consultations for
                              patients requiring specialized medical care.`}
                          </p>

                        </div>

                        {/* Image */}
                        <div className="col-lg-4 text-center order-1 order-lg-2">

                          <img
                            src={`/assets/img/departments-${
                              (index % 5) + 1
                            }.jpg`}
                            alt={department.name}
                            className="img-fluid"
                          />

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          )}

        </div>

      </section>

    </main>
  );
};

export default Departments;