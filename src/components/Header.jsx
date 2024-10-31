// flowbite
import { Button, Navbar, Select } from "flowbite-react";

// redux
import { useDispatch, useSelector } from "react-redux";

// rrd
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

// features
import { logOut } from "../features/userSlice";

// toast
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function Header() {
  const { user } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  function handleLanguageChange(lang) {
    i18n.changeLanguage(lang);
  }

  function handleLogOut() {
    dispatch(logOut());
    toast.success(t("logoutMessage"));
  }

  return (
    <div className="border shadow-md">
      <div className="base-container">
        <Navbar fluid rounded>
          <NavLink to="/">
            <span className="self-center whitespace-nowrap bg-gradient-to-r from-blue-500 to-purple-600  bg-clip-text text-xl font-semibold text-transparent dark:text-white">
              ArticleHub
            </span>
          </NavLink>
          <div className="order-2 hidden items-center md:flex">
            <Select
              className="mr-3"
              id="countries"
              onChange={(e) => handleLanguageChange(e.target.value)}
              required
              defaultValue={localStorage.getItem("lang") || "en"}
            >
              <option value="en">En</option>
              <option value="uz">Uz</option>
              <option value="ru">Ru</option>
            </Select>
            {user ? (
              <div>
                <Button onClick={handleLogOut}>{t("logOut")}</Button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="mr-1 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 md:mr-2 md:px-5 md:py-2.5"
                >
                  {t("logIn")}
                </Link>
                <Button onClick={() => navigate("/register")}>
                  {t("signUp")}
                </Button>
              </>
            )}
          </div>
          <Navbar.Collapse>
            <NavLink
              className={`${pathname === "/" ? "block bg-cyan-700 py-2 pl-3 pr-4 text-lg text-white dark:text-white md:bg-transparent md:p-0 md:text-cyan-700" : "block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white"}`}
              to="/"
            >
              {t("home")}
            </NavLink>
            {user && (
              <NavLink
                className={`${pathname === "/articles" ? "block bg-cyan-700 py-2 pl-3 pr-4 text-lg text-white dark:text-white md:bg-transparent md:p-0 md:text-cyan-700" : "block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white"}`}
                to="/articles"
              >
                {t("myArticles")}
              </NavLink>
            )}
            {user && (
              <NavLink
                className={`${pathname === "/profile" ? "block bg-cyan-700 py-2 pl-3 pr-4 text-lg text-white dark:text-white md:bg-transparent md:p-0 md:text-cyan-700" : "block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white"}`}
                to="/profile"
              >
                {t("profile")}
              </NavLink>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}
