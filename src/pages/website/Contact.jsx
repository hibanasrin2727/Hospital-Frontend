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

        {/* ================= CONTACT CONTENT ================= */}
        <div className="mx-auto max-w-[1400px] px-6 py-[50px] md:px-8 lg:px-10 lg:py-[55px]">

          <div className="grid grid-cols-1 gap-[45px] lg:grid-cols-[380px_1fr] lg:gap-[40px]">

            {/* ================= CONTACT INFORMATION ================= */}
            <div className="flex flex-col gap-[30px]">

              {/* Location */}
              <div className="flex items-start gap-[15px]">

                <div className="flex h-[43px] w-[43px] flex-shrink-0 items-center justify-center rounded-full bg-[#1976c8] text-white">
                  <i className="bi bi-geo-alt text-[20px]"></i>
                </div>

                <div className="pt-[1px]">
                  <h3 className="m-0 !text-[24px] font-bold leading-[1.3] !text-[#294b68]">
                    Location
                  </h3>

                  <p className="m-0 mt-[4px] text-[14px] leading-[1.5] text-[#333]">
                    HospitalCare, Kerala, India
                  </p>
                </div>

              </div>

              {/* Phone */}
              <div className="flex items-start gap-[15px]">

                <div className="flex h-[43px] w-[43px] flex-shrink-0 items-center justify-center rounded-full bg-[#1976c8] text-white">
                  <i className="bi bi-telephone text-[20px]"></i>
                </div>

                <div className="pt-[1px]">
                  <h3 className="m-0 !text-[24px] font-bold leading-[1.3] !text-[#294b68]">
                    Call Us
                  </h3>

                  <p className="m-0 mt-[4px] text-[14px] leading-[1.5] text-[#333]">
                    +91 98765 43210
                  </p>
                </div>

              </div>

              {/* Email */}
              <div className="flex items-start gap-[15px]">

                <div className="flex h-[43px] w-[43px] flex-shrink-0 items-center justify-center rounded-full bg-[#1976c8] text-white">
                  <i className="bi bi-envelope text-[20px]"></i>
                </div>

                <div className="pt-[1px]">
                  <h3 className="m-0 !text-[24px] font-bold leading-[1.3] !text-[#294b68]">
                    Email Us
                  </h3>

                  <p className="m-0 mt-[4px] text-[14px] leading-[1.5] text-[#333]">
                    info@hospitalcare.com
                  </p>
                </div>

              </div>

            </div>

            {/* ================= CONTACT FORM ================= */}
            <div>

              <form
                onSubmit={handleSubmit}
                className="w-full"
              >

                <div className="grid grid-cols-1 gap-[23px] md:grid-cols-2">

                  {/* Name */}
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-[42px] w-full rounded-none border border-[#d9d9d9] bg-white px-[14px] text-[14px] text-[#333] outline-none transition-all duration-200 placeholder:text-[#b9b9b9] focus:border-[#1976c8]"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-[42px] w-full rounded-none border border-[#d9d9d9] bg-white px-[14px] text-[14px] text-[#333] outline-none transition-all duration-200 placeholder:text-[#b9b9b9] focus:border-[#1976c8]"
                    />
                  </div>

                  {/* Subject */}
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="h-[42px] w-full rounded-none border border-[#d9d9d9] bg-white px-[14px] text-[14px] text-[#333] outline-none transition-all duration-200 placeholder:text-[#b9b9b9] focus:border-[#1976c8]"
                    />
                  </div>

                  {/* Message */}
                  <div className="md:col-span-2">
                    <textarea
                      name="message"
                      rows="6"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="min-h-[140px] w-full resize-y rounded-none border border-[#d9d9d9] bg-white px-[14px] py-[12px] text-[14px] leading-[1.5] text-[#333] outline-none transition-all duration-200 placeholder:text-[#b9b9b9] focus:border-[#1976c8]"
                    ></textarea>
                  </div>

                  {/* Status */}
                  <div className="md:col-span-2">

                    {loading && (
                      <div className="mb-[15px] text-center text-[14px] text-[#1976c8]">
                        Sending...
                      </div>
                    )}

                    {error && (
                      <div className="mb-[15px] text-center text-[14px] text-red-500">
                        {error}
                      </div>
                    )}

                    {message && (
                      <div className="mb-[15px] text-center text-[14px] text-green-600">
                        {message}
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-center">

                      <button
                        type="submit"
                        disabled={loading}
                        className="min-w-[170px] !rounded-full border-0 bg-[#1976c8] px-[30px] py-[11px] text-[14px] font-semibold text-white transition-all duration-300 hover:bg-[#105592] disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {loading
                          ? "Sending..."
                          : "Send Message"}
                      </button>

                    </div>

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