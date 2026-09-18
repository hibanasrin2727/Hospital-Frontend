import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import { saveAuth } from "../../utils/auth";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      // ===============================
      // LOGIN API
      // ===============================

      const response = await api.post(
        "/dashboard/auth/login",
        {
          email,
          password,
        }
      );

      console.log("Login response:", response.data);

      // ===============================
      // SAVE TOKEN + USER
      // ===============================

      saveAuth(
        response.data.token,
        response.data.user
      );

      // ===============================
      // GO TO HOME
      // ===============================

      navigate("/");

    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        setError(
          error.response.data?.message ||
            "Invalid email or password."
        );
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
    <div className="relative min-h-screen bg-[#f5f9fd]">

      {/* ===============================
          HOME BUTTON
          =============================== */}

      <button
        type="button"
        onClick={() => navigate("/")}
        className="absolute left-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border-0 bg-white text-[#1976c8] shadow-sm transition-all duration-200 hover:bg-[#1976c8] hover:text-white"
        title="Go to Home"
      >
        <i className="bi bi-house text-[18px]"></i>
      </button>


      {/* ===============================
          LOGIN CONTAINER
          =============================== */}

      <div className="flex min-h-screen items-center justify-center px-5 py-12">

        <div className="w-full max-w-[450px]">

          <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-[0_10px_35px_rgba(0,0,0,0.08)] md:p-9">

            {/* ===============================
                ICON
                =============================== */}

            <div className="mb-3 flex justify-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f0f7fd]">

                <i className="bi bi-person-lock text-[30px] text-[#1976c8]"></i>

              </div>

            </div>


            {/* ===============================
                TITLE
                =============================== */}

            <div className="text-center">

              <h1 className="text-[30px] font-bold text-[#294b68]">
                Welcome Back
              </h1>

              <p className="mt-2 text-[14px] leading-6 text-gray-500">
                Sign in to your HospitalCare account
              </p>

            </div>


            {/* ===============================
                ERROR MESSAGE
                =============================== */}

            {error && (
              <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">
                {error}
              </div>
            )}


            {/* ===============================
                LOGIN FORM
                =============================== */}

            <form
              onSubmit={handleLogin}
              className="mt-8"
            >

              {/* EMAIL */}

              <div>

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


              {/* PASSWORD */}

              <div className="mt-3">

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
                    placeholder="Enter your password"
                    required
                    className="h-[48px] w-full rounded-lg border border-gray-200 bg-white pl-11 pr-4 text-[14px] text-gray-700 outline-none transition focus:border-[#1976c8] focus:ring-2 focus:ring-[#1976c8]/10"
                  />

                </div>

              </div>


              {/* FORGOT PASSWORD */}

              <div className="mt-3 mb-2 text-right">

                <button
                  type="button"
                  className="border-0 bg-transparent p-0 text-[13px] text-[#1976c8] hover:text-[#294b68]"
                >
                  Forgot Password?
                </button>

              </div>


              {/* LOGIN BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className={`mt-6 flex h-[48px] w-full items-center justify-center rounded-lg border-0 text-[14px] font-semibold text-white transition-all duration-300 ${
                  loading
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-[#1976c8] hover:bg-[#294b68]"
                }`}
              >
                {loading
                  ? "Signing In..."
                  : "Sign In"}
              </button>

            </form>


            {/* ===============================
                SIGNUP
                =============================== */}

            <div className="mt-7 border-t border-gray-100 pt-6 text-center">

              <p className="text-[14px] text-gray-500">
                Don't have an account?
              </p>

              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="mt-0 border-0 bg-transparent text-[14px] font-semibold text-[#1976c8] hover:text-[#294b68]"
              >
                Create an Account
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;