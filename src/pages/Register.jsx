// flowbite
import { Button, Label, TextInput } from "flowbite-react";

// lib
import { getFormData } from "../lib/my-utils";
import { registerUser } from "../lib/requests";

// toast
import toast, { LoaderIcon } from "react-hot-toast";

// redux
import { useDispatch } from "react-redux";

// features
import { setUser } from "../features/userSlice";

// react
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  function handleLanguageChange(lang) {
    i18n.changeLanguage(lang);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const result = getFormData(e.target);
    registerUser(result)
      .then((res) => dispatch(setUser(res)))
      .catch((err) => toast.error(err))
      .finally(() => {
        setLoading(false);
        toast.success("Welcome to ArticleHub");
      });
  }

  return (
    <div className="mx-auto grid h-screen w-full max-w-[600px] place-items-center">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
        <h1 className="text-3xl font-semibold">{t("register")}</h1>
        <div className="w-full">
          <div className="mb-2 block w-full">
            <Label htmlFor="username" value={t("yourUsername")} />
          </div>
          <TextInput
            id="username"
            type="text"
            placeholder={t("enterUsername")}
            name="username"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value={t("yourPassword")} />
          </div>
          <TextInput
            name="password"
            id="password"
            type="password"
            placeholder={t("enterPassword")}
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? <LoaderIcon /> : t("submit")}
        </Button>
      </form>
    </div>
  );
}
