import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // Verify the token with the backend
        const response = await axios.get(
          "https://automated-journal-finder.onrender.com/api/users/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data);
        setUser(response.data); // Assume the backend sends back user details
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
