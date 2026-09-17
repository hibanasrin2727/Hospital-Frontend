const Testimonials = () => {
  const testimonials = [
    {
      image: "/assets/img/testimonials/testimonials-1.jpg",
      name: "Anjali Menon",
      role: "Patient",
      message:
        "The doctors were very professional and the appointment process was simple and convenient.",
    },
    {
      image: "/assets/img/testimonials/testimonials-2.jpg",
      name: "Rahul Kumar",
      role: "Patient",
      message:
        "HospitalCare made it easy to find the right department and book an appointment with a doctor.",
    },
    {
      image: "/assets/img/testimonials/testimonials-3.jpg",
      name: "Meera Nair",
      role: "Patient",
      message:
        "The healthcare staff were friendly and helpful throughout my visit.",
    },
    {
      image: "/assets/img/testimonials/testimonials-4.jpg",
      name: "Arjun Thomas",
      role: "Patient",
      message:
        "I had a smooth experience from appointment booking to consultation.",
    },
    {
      image: "/assets/img/testimonials/testimonials-5.jpg",
      name: "Priya S",
      role: "Patient",
      message:
        "The website is easy to use and helped me quickly find the information I needed.",
    },
  ];

  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <div className="row align-items-center">

          <div
            className="col-lg-5 info"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h3>Testimonials</h3>

            <p>
              Read what our patients say about their experience
              with HospitalCare and our healthcare services.
            </p>
          </div>

          <div
            className="col-lg-7"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="swiper init-swiper">

              <div className="swiper-wrapper">

                {testimonials.map((testimonial, index) => (
                  <div className="swiper-slide" key={index}>
                    <div className="testimonial-item">

                      <div className="d-flex">

                        <img
                          src={testimonial.image}
                          className="testimonial-img flex-shrink-0"
                          alt={testimonial.name}
                        />

                        <div>
                          <h3>{testimonial.name}</h3>

                          <h4>{testimonial.role}</h4>

                          <div className="stars">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                          </div>
                        </div>

                      </div>

                      <p>
                        <i className="bi bi-quote quote-icon-left"></i>

                        <span>{testimonial.message}</span>

                        <i className="bi bi-quote quote-icon-right"></i>
                      </p>

                    </div>
                  </div>
                ))}

              </div>

              <div className="swiper-pagination"></div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;