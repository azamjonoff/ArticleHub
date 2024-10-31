// react
import { useEffect, useRef, useState } from "react";

// components
import { AddArticle, OnlyMyArticles } from "../components";

// features
import { setArticles } from "../features/articleSlice";

// lib
import { collectItem } from "../lib/my-utils";
import { getArticles } from "../lib/requests";

// redux
import { useDispatch, useSelector } from "react-redux";

// toast
import toast from "react-hot-toast";

// loading
import LoadingBar from "react-top-loading-bar";
import { useTranslation } from "react-i18next";

export default function Articles() {
  const { article } = useSelector((state) => state.article);
  const { user } = useSelector((state) => state.user);
  const loadingRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();

  function handleLanguageChange(lang) {
    i18n.changeLanguage(lang);
  }

  useEffect(() => {
    loadingRef?.current.continuousStart();
    setLoading(true);
    getArticles()
      .then((res) => {
        dispatch(setArticles(res));
      })
      .catch(({ message }) => {
        toast.error(message);
      })
      .finally(() => {
        loadingRef?.current.complete();
        setLoading(false);
      });
  }, [user]);

  return (
    <>
      <LoadingBar color="#000000" ref={loadingRef} />
      <div className="mx-auto w-full max-w-[800px]">
        <div className="flex justify-between pt-5">
          <h1 className="mb-10 text-2xl font-bold tracking-wide">
            {t("myArticles")}
          </h1>
          <AddArticle
            categories={article && collectItem(article, "category")}
          />
        </div>
        <div className="h-[1px] w-full bg-slate-200"></div>
        <OnlyMyArticles
          loading={loading}
          categories={article && collectItem(article, "category")}
        />
      </div>
    </>
  );
}
