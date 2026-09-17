import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    // Temporary frontend submission
    setTimeout(() => {
      setLoading(false);

      setMessage(
        "Your message has been sent successfully. Thank you!"
      );

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <main className="main">

      {/* Contact Section */}
      <section id="contact" className="contact section">

        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Contact</h2>

          <p>
            Get in touch with HospitalCare for appointments,
            healthcare information, and general enquiries.
          </p>
        </div>

        {/* Google Maps */}
        <div
          className="mb-5"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <iframe
            style={{
              border: 0,
              width: "100%",
              height: "270px",
            }}
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus"
            title="HospitalCare Location"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div
          className="container"
          data-aos="fade-up"
          data-aos-delay="100"
        >

          <div className="row gy-4">

            {/* Contact Information */}
            <div className="col-lg-4">

              <div
                className="info-item d-flex"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <i className="bi bi-geo-alt flex-shrink-0"></i>

                <div>
                  <h3>Location</h3>
                  <p>
                    HospitalCare, Kerala, India
                  </p>
                </div>
              </div>

              <div
                className="info-item d-flex"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <i className="bi bi-telephone flex-shrink-0"></i>

                <div>
                  <h3>Call Us</h3>
                  <p>+91 98765 43210</p>
                </div>
              </div>

              <div
                className="info-item d-flex"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <i className="bi bi-envelope flex-shrink-0"></i>

                <div>
                  <h3>Email Us</h3>
                  <p>info@hospitalcare.com</p>
                </div>
              </div>

            </div>

            {/* Contact Form */}
            <div className="col-lg-8">

              <form
                onSubmit={handleSubmit}
                className="php-email-form"
                data-aos="fade-up"
                data-aos-delay="200"
              >

                <div className="row gy-4">

                  <div className="col-md-6">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-12">
                    <input
                      type="text"
                      name="subject"
                      className="form-control"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-12">
                    <textarea
                      className="form-control"
                      name="message"
                      rows="6"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="col-md-12 text-center">

                    {loading && (
                      <div className="loading">
                        Sending...
                      </div>
                    )}

                    {error && (
                      <div className="error-message">
                        {error}
                      </div>
                    )}

                    {message && (
                      <div className="sent-message">
                        {message}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </button>

                  </div>

                </div>

              </form>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Contact;