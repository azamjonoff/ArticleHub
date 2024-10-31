// redux
import { useDispatch, useSelector } from "react-redux";

// lib
import { collectItem } from "../lib/my-utils";

// flowbite
import { Button, Label, Select } from "flowbite-react";

// react
import { useState } from "react";

// features
import { setCategories, clearCategory } from "../features/articleSlice";
import { useTranslation } from "react-i18next";

export default function Filter() {
  const { article } = useSelector((state) => state.article);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  function handleLanguageChange(lang) {
    i18n.changeLanguage(lang);
  }

  const categories = article && collectItem(article, "category");

  return (
    <div className="base-container mt-4 gap-5 p-5">
      <div className="w-full">
        <h1 className="mb-3 text-center text-2xl tracking-wide">
          {t("filters")}
        </h1>
        <div className="mb-2 block">
          <Label htmlFor="countries" value={t("filterLabel")} />
        </div>
        <Select id="countries" onChange={(e) => setValue(e.target.value)}>
          {categories.map((category) => {
            return (
              <option key={category} value={category} className="capitalize">
                {category}
              </option>
            );
          })}
        </Select>
      </div>
      <div className="mt-5 flex justify-end gap-7">
        <Button
          color="light"
          onClick={() => dispatch(clearCategory())}
          className="min-w-32"
        >
          {t("clearFilter")}
        </Button>
        <Button
          onClick={() => dispatch(setCategories(value))}
          className="min-w-32"
        >
          {t("filter")}
        </Button>
      </div>
    </div>
  );
}
