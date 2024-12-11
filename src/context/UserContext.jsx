import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState({});
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const response = await axios.get("/user");
        if (response.data && response.data.loggedIn) {
          SignUser(response);
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

  const SignUser = (data) => {
    setUser({
      id: `${data.user?.id || ""}`,
      email: `${data.user?.email || ""}`,
      fullname: `${data.user?.fullname || ""}`,
    });
    setLogin(true);
    Cookies.set("token", data.token);
  };

  const logout = () => {
    axios.post("/logout").then((res) => {
      if (res.data.message === "Logout successful.") {
        Cookies.remove("token");
        window.location.pathname = "/";
      }
    });
  };

  useEffect(() => {
    console.log(user);
    return () => {};
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, login, setLogin, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};
