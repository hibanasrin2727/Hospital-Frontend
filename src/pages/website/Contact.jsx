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
    <main className="w-full">
      {/* ================= CONTACT SECTION ================= */}
      <section
        id="contact"
        className="scroll-mt-[107px] bg-white py-[35px] md:py-[45px] lg:py-[55px]"
      >
        {/* ================= SECTION TITLE ================= */}
        <div className="mx-auto max-w-[1400px] px-6 md:px-8 lg:px-10">

          <div className="mx-auto max-w-[850px] text-center">

            <h2 className="text-[30px] font-medium leading-[1.2] text-[#294b68] md:text-[32px]">
              Contact
            </h2>

            {/* Title Line */}
            <div className="mx-auto mt-[15px] flex w-[155px] items-center justify-center">
              <span className="h-[1px] w-[48px] bg-[#bdbdbd]"></span>

              <span className="h-[3px] w-[58px] bg-[#1976c8]"></span>

              <span className="h-[1px] w-[48px] bg-[#bdbdbd]"></span>
            </div>

            <p className="mt-[18px] text-[14px] leading-[1.7] text-[#294b68] md:text-[15px]">
              Get in touch with HospitalCare for appointments,
              healthcare information, and general enquiries.
            </p>

          </div>
        </div>

        {/* ================= GOOGLE MAP ================= */}
        <div className="mt-[55px] w-full">
          <iframe
            className="block h-[270px] w-full border-0"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus"
            title="HospitalCare Location"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>


      </section>
    </main>
  );
};

export default Contact;