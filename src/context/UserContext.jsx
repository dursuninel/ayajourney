import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState({});
  const [login, setLogin] = useState(null);

  const [authMenu, setAuthMenu] = useState(false);
  const [authType, setAuthType] = useState(0);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const response = await axios.get("/webUserCheck");
        if (response.data && response.data.loggedIn) {
          saveUserWeb(response.data);
        } else {
          setLogin(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLogin(false);
      }
    };

    if (login) {
      checkLoggedInUser();
    }
  }, [login]);

  const saveUserWeb = (data) => {
    setUser({
      id: `${data.user?.id || ""}`,
      email: `${data.user?.email || ""}`,
      fullname: `${data.user?.fullname || ""}`,
    });
    setLogin(true);
    // Cookies.set("token", data.token);
  };

  const logout = () => {
    axios.post("/logout").then((res) => {
      if (res.data.status === 200) {
        // Cookies.remove("token");
        window.location.pathname = "/visa";
      }
    });
  };

  useEffect(() => {
    console.log(user);
    return () => {};
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        setLogin,
        logout,
        saveUserWeb,

        authMenu,
        setAuthMenu,
        authType,
        setAuthType,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
