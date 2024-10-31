import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t, i18n } = useTranslation();

  function handleLanguageChange(lang) {
    i18n.changeLanguage(lang);
  }
  return (
    <div className="bg-[url('https://img.freepik.com/free-vector/online-article-concept-illustration_114360-5193.jpg')] bg-right bg-no-repeat px-5 py-14">
      <div className="base-container bg-primary">
        <h1 className="mb-8 max-w-[640px] text-7xl">{t("heroTitle")}</h1>
        <h5 className="text-xl text-slate-500">{t("heroDesc")}</h5>
      </div>
    </div>
  );
}
