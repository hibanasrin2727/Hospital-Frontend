import { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      question: "How can I book an appointment?",
      answer:
        "You can book an appointment by visiting our Appointment page, selecting a department and doctor, choosing your preferred date and time, and submitting the appointment form.",
    },
    {
      question: "How can I find a doctor?",
      answer:
        "You can visit the Doctors page to view the available doctors, their specialties, and other information.",
    },
    {
      question: "What departments are available?",
      answer:
        "You can visit the Departments page to explore the healthcare departments available at HospitalCare.",
    },
    {
      question: "Can I choose a specific doctor?",
      answer:
        "Yes. During appointment booking, you can select a department and choose an available doctor from the list.",
    },
    {
      question: "How do I contact HospitalCare?",
      answer:
        "You can contact HospitalCare using the phone number, email address, or contact form provided on the Contact page.",
    },
    {
      question: "Can I cancel my appointment?",
      answer:
        "For appointment cancellation or changes, please contact the hospital using the contact information provided on our Contact page.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <main className="main">
      <section id="faq" className="faq section light-background">

        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Frequently Asked Questions</h2>
          <p>
            Find answers to some of the most common questions
            about HospitalCare and our healthcare services.
          </p>
        </div>

        <div className="container">
          <div className="row justify-content-center">

            <div
              className="col-lg-10"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="faq-container">

                {faqs.map((faq, index) => (
                  <div
                    className={`faq-item ${
                      activeIndex === index ? "faq-active" : ""
                    }`}
                    key={index}
                  >
                    <h3 onClick={() => toggleFAQ(index)}>
                      {faq.question}
                    </h3>

                    <div className="faq-content">
                      <p>{faq.answer}</p>
                    </div>

                    <i
                      className={`faq-toggle bi ${
                        activeIndex === index
                          ? "bi-chevron-down"
                          : "bi-chevron-right"
                      }`}
                      onClick={() => toggleFAQ(index)}
                    ></i>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQ;