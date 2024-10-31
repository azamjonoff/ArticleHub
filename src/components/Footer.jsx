// rrd
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t, i18n } = useTranslation();

  function handleLanguageChange(lang) {
    i18n.changeLanguage(lang);
  }
  return (
    <footer className="w-full border py-3 shadow-md">
      <div className="base-container  flex w-full justify-center">
        <span>
          {t("poweredBy")}{" "}
          <Link
            to="https://www.json-api.uz"
            className="text-blue-500 hover:underline dark:text-blue-300 dark:hover:underline "
          >
            json-api.uz
          </Link>
        </span>
      </div>
    </footer>
  );
}
