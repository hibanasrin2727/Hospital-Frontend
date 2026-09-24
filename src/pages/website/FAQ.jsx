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
    <main className="w-full">
      {/* ================= FAQ SECTION ================= */}
      <section
        id="faq"
        className="scroll-mt-[107px] bg-[#eef7fd] py-[35px] md:py-[45px] lg:py-[55px]"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-8 lg:px-10">

          {/* ================= SECTION TITLE ================= */}
          <div className="mx-auto max-w-[850px] text-center">

            <h2 className="text-[30px] font-medium leading-[1.2] text-[#294b68] md:text-[32px]">
              Frequently Asked Questions
            </h2>

            {/* Title Line */}
            <div className="mx-auto mt-[15px] flex w-[160px] items-center justify-center">
              <span className="h-[1px] w-[50px] bg-[#bdbdbd]"></span>

              <span className="h-[3px] w-[60px] bg-[#1976c8]"></span>

              <span className="h-[1px] w-[50px] bg-[#bdbdbd]"></span>
            </div>

            <p className="mt-[18px] text-[14px] leading-[1.7] text-[#294b68] md:text-[15px]">
              Find answers to some of the most common questions
              about HospitalCare and our healthcare services.
            </p>
          </div>

          {/* ================= FAQ LIST ================= */}
          <div className="mx-auto mt-[60px] max-w-[1075px]">

            <div className="flex flex-col gap-[16px]">

              {faqs.map((faq, index) => {
                const isActive = activeIndex === index;

                return (
                  <div
                    key={index}
                    className={`relative overflow-hidden rounded-[4px] border transition-all duration-300 ${isActive
                        ? "border-[#1976c8] bg-[#247bc7] text-white"
                        : "border-[#c9ddeb] bg-white text-[#294b68] hover:border-[#1976c8]"
                      }`}
                  >
                    {/* ================= QUESTION ================= */}
                    <button
                      type="button"
                      onClick={() => toggleFAQ(index)}
                      className={`flex min-h-[64px] w-full items-center justify-between gap-5 border-0 px-[20px] py-[16px] text-left transition-all duration-300 md:px-[20px] ${isActive
                          ? "bg-[#247bc7] text-white"
                          : "bg-white text-[#294b68]"
                        }`}
                    >
                      <span
                        className={`text-[17px] font-medium leading-[1.4] md:text-[18px] ${isActive
                            ? "text-white"
                            : "text-[#294b68]"
                          }`}
                      >
                        {faq.question}
                      </span>

                      <i
                        className={`bi flex-shrink-0 text-[16px] transition-transform duration-300 ${isActive
                            ? "bi-chevron-down text-white"
                            : "bi-chevron-right text-[#294b68]"
                          }`}
                      ></i>
                    </button>

                    {/* ================= ANSWER ================= */}
                    <div
                      className={`grid transition-all duration-300 ${isActive
                          ? "grid-rows-[1fr]"
                          : "grid-rows-[0fr]"
                        }`}
                    >
                      <div className="overflow-hidden">
                        <div
                          className={`px-[20px] pb-[20px] text-[14px] leading-[1.65] md:text-[15px] ${isActive
                              ? "text-white"
                              : "text-[#444]"
                            }`}
                        >
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQ;