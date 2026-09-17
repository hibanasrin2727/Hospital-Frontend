// =====================================================
// CHECK WHETHER USER IS LOGGED IN
// =====================================================
export const isLoggedIn = () => {
  const token = localStorage.getItem("token");

  return !!token;
};


// =====================================================
// GET LOGGED-IN USER
// =====================================================
export const getUser = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    console.error("Invalid user data:", error);
    return null;
  }
};


// =====================================================
// GET JWT TOKEN
// =====================================================
export const getToken = () => {
  return localStorage.getItem("token");
};


// =====================================================
// SAVE LOGIN INFORMATION
// =====================================================
export const saveAuth = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  // Tell Navbar and other components that login changed
  window.dispatchEvent(new Event("authChanged"));
};


// =====================================================
// LOGOUT
// =====================================================
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Tell Navbar and other components that login changed
  window.dispatchEvent(new Event("authChanged"));
};