import React, { useEffect } from "react";
import Routers from "./Routes";
import { lightTheme, darkTheme, Theme } from "../config/theme";
import { useAppSelector } from "../store/hooks";
import { getUser } from "../store/services/auth";
import { getToken } from "../utils";

const App: React.FC = () => {
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isAuthenticated = getToken();

  useEffect(() => {
    const setTheme = (theme: Theme) => {
      Object.entries(theme).forEach(([key, value]: [string, string]) => {
        document.body.style.setProperty(`--${key}`, value);
      });
    };

    if (themeMode === "lightTheme") {
      setTheme(lightTheme);
    } else {
      setTheme(darkTheme);
    }
  }, [themeMode]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    isAuthenticated && getUser();
  }, [isAuthenticated]);

  return <Routers />;
};

export default App;
