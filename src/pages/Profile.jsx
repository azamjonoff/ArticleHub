// flowbite
import { Button, Card } from "flowbite-react";
import { useState } from "react";

// redux
import { useSelector } from "react-redux";

// components
import { EditUserData } from "../components";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { user } = useSelector((state) => state.user);
  const { t, i18n } = useTranslation();

  function handleLanguageChange(lang) {
    i18n.changeLanguage(lang);
  }

  return (
    <Card className="mx-auto max-w-[500px]">
      <h1 className="mb-10 text-2xl font-bold tracking-wide">{t("profile")}</h1>
      <div className="flex items-center justify-between">
        <span className="font-bold">
          <span className="font-medium">{t("username")}</span> {user.username}
        </span>
        <EditUserData />
      </div>
    </Card>
  );
}
