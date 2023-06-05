import React, { useEffect, useState } from "react";

const Checkbox = () => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (window.matchMedia("prefer-color-scheme: dark").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex w-[10rem] ml-[5rem]">
    <p className="mr-4 text-black dark:text-white">
    {theme === "dark" ? (
      "Dark Mode"
    ) : (
      "Light Mode"
    )}
  </p>
    <label htmlFor="mode" className="bg-black relative w-12 h-6 rounded-full dark:bg-white select-none">

      <input
        type="checkbox"
        onClick={handleDarkMode}
        name="mode"
        id="mode"
        className="sr-only peer"
      />
      <span className="w-2/5 h-[70%] bg-white absolute rounded-full left-[3px] top-[3.2px]  dark:bg-black transition-all duration-300 peer-checked:left-6"></span>
    </label>
    </div>
  );
};

export default Checkbox;
