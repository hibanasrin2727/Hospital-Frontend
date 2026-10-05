// ==========================================
// CHECK LOGIN
// ==========================================

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};


// ==========================================
// GET LOGGED-IN USER
// ==========================================

export const getUser = () => {
  try {
      const user = localStorage.getItem("user");

      if (!user) {
        return null;
      }

      return JSON.parse(user);

    } catch (error) {
      console.error("Failed to read user data:", error);
      return null;
    }
};


// ==========================================
// GET TOKEN
// ==========================================

export const getToken = () => {
  return localStorage.getItem("token");
};


// ==========================================
// GET USER ROLE
// ==========================================

export const getUserRole = () => {
  const user = getUser();

  return user?.role || null;
};


// ==========================================
// CHECK ADMIN
// ==========================================

export const isAdmin = () => {
  return getUserRole() === "admin";
};


// ==========================================
// CHECK PATIENT
// ==========================================

export const isPatient = () => {
  return getUserRole() === "patient";
};


// ==========================================
// SAVE AUTHENTICATION
// ==========================================

export const saveAuth = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  window.dispatchEvent(new Event("authChanged"));
};


// ==========================================
// LOGOUT
// ==========================================

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.dispatchEvent(new Event("authChanged"));
};