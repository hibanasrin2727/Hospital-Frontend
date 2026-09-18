import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Check password
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/dashboard/auth/register",
        {
          name,
          email,
          phone,
          password,
        }
      );

      console.log("Signup response:", response.data);

      setSuccess("Account created successfully. Redirecting to login...");

      // Go to login after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (error) {
      console.error("Signup error:", error);

      if (error.response) {
        const data = error.response.data;

        // Backend validation error
        if (data.errors) {
          const firstError =
            Object.values(data.errors)[0];

          setError(
            typeof firstError === "string"
              ? firstError
              : "Please check your entered information."
          );
        } else {
          setError(
            data.message ||
              "Registration failed. Please try again."
          );
        }
      } else {
        setError(
          "Unable to connect to the server. Please make sure the backend is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f9fd]">

      <button
        type="button"
        onClick={() => navigate("/")}
        className="absolute left-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border-0 bg-white text-[#1976c8] shadow-sm transition-all duration-200 hover:bg-[#1976c8] hover:text-white"
        title="Go to Home"
      >
        <i className="bi bi-house text-[18px]"></i>
      </button>

     


      {/* ================= SIGNUP ================= */}

      <div className="flex min-h-[calc(100vh-70px)] items-center justify-center px-5 py-12">

        <div className="w-full max-w-[500px]">

          <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-[0_10px_35px_rgba(0,0,0,0.08)] md:p-9">

            {/* ICON */}

            <div className="mb-3 flex justify-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f0f7fd]">

                <i className="bi bi-person-plus text-[30px] text-[#1976c8]"></i>

              </div>

            </div>


            {/* TITLE */}

            <div className="text-center">

              <h1 className="text-[30px] font-bold text-[#294b68]">
                Create Account
              </h1>

              <p className="mt-2 text-[14px] leading-6 text-gray-500">
                Create your HospitalCare account
              </p>

            </div>


            {/* ERROR */}

            {error && (
              <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">
                {error}
              </div>
            )}


            {/* SUCCESS */}

            {success && (
              <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-[13px] text-green-600">
                {success}
              </div>
            )}


            {/* FORM */}

            <form
              onSubmit={handleSignup}
              className="mt-8"
            >

              {/* NAME */}

              <div>

                <label
                  htmlFor="name"
                  className="mb-2 block text-[13px] font-semibold text-[#294b68]"
                >
                  Full Name
                </label>

                <div className="relative">

                  <i className="bi bi-person absolute left-4 top-1/2 -translate-y-1/2 text-[16px] text-gray-400"></i>

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Enter your full name"
                    required
                    className="h-[48px] w-full rounded-lg border border-gray-200 bg-white pl-11 pr-4 text-[14px] text-gray-700 outline-none transition focus:border-[#1976c8] focus:ring-2 focus:ring-[#1976c8]/10"
                  />

                </div>

              </div>


              {/* EMAIL */}

              <div className="mt-2">

                <label
                  htmlFor="email"
                  className="mb-2 block text-[13px] font-semibold text-[#294b68]"
                >
                  Email Address
                </label>

                <div className="relative">

                  <i className="bi bi-envelope absolute left-4 top-1/2 -translate-y-1/2 text-[16px] text-gray-400"></i>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    required
                    className="h-[48px] w-full rounded-lg border border-gray-200 bg-white pl-11 pr-4 text-[14px] text-gray-700 outline-none transition focus:border-[#1976c8] focus:ring-2 focus:ring-[#1976c8]/10"
                  />

                </div>

              </div>


              {/* PHONE */}

              <div className="mt-2">

                <label
                  htmlFor="phone"
                  className="mb-2 block text-[13px] font-semibold text-[#294b68]"
                >
                  Phone Number
                </label>

                <div className="relative">

                  <i className="bi bi-phone absolute left-4 top-1/2 -translate-y-1/2 text-[16px] text-gray-400"></i>

                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    placeholder="Enter your phone number"
                    required
                    className="h-[48px] w-full rounded-lg border border-gray-200 bg-white pl-11 pr-4 text-[14px] text-gray-700 outline-none transition focus:border-[#1976c8] focus:ring-2 focus:ring-[#1976c8]/10"
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div className="mt-2">

                <label
                  htmlFor="password"
                  className="mb-2 block text-[13px] font-semibold text-[#294b68]"
                >
                  Password
                </label>

                <div className="relative">

                  <i className="bi bi-lock absolute left-4 top-1/2 -translate-y-1/2 text-[16px] text-gray-400"></i>

                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Create a password"
                    required
                    className="h-[48px] w-full rounded-lg border border-gray-200 bg-white pl-11 pr-4 text-[14px] text-gray-700 outline-none transition focus:border-[#1976c8] focus:ring-2 focus:ring-[#1976c8]/10"
                  />

                </div>

              </div>


              {/* CONFIRM PASSWORD */}

              <div className="mt-2">

                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-[13px] font-semibold text-[#294b68]"
                >
                  Confirm Password
                </label>

                <div className="relative">

                  <i className="bi bi-shield-lock absolute left-4 top-1/2 -translate-y-1/2 text-[16px] text-gray-400"></i>

                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Confirm your password"
                    required
                    className="h-[48px] w-full rounded-lg border border-gray-200 bg-white pl-11 pr-4 text-[14px] text-gray-700 outline-none transition focus:border-[#1976c8] focus:ring-2 focus:ring-[#1976c8]/10"
                  />

                </div>

              </div>


              {/* SUBMIT */}

              <button
                type="submit"
                disabled={loading}
                className={`mt-3 mb-3 flex h-[48px] w-full items-center justify-center !rounded-lg border-0 text-[14px] font-semibold text-white transition-all duration-300 ${
                  loading
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-[#1976c8] hover:bg-[#294b68]"
                }`}
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </button>

            </form>


            {/* LOGIN */}

            <div className="mt-7 border-t border-gray-100 pt-6 text-center">

              <p className="text-[14px] text-gray-500">
                Already have an account?
              </p>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="mt-0 border-0 bg-transparent text-[14px] font-semibold text-[#1976c8] hover:text-[#294b68]"
              >
                Sign In
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Signup;