// flowbite
import { Button, Card, Pagination } from "flowbite-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

// rrd
import { useNavigate } from "react-router-dom";

export default function Cards({ loading }) {
  const { article } = useSelector((state) => state.article);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  function handleLanguageChange(lang) {
    i18n.changeLanguage(lang);
  }

  const itemsPerPage = Math.max(1, Math.ceil(article.length / 10));
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedArticles = article.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const onPageChange = (page) => setCurrentPage(page);

  function handleClick(id) {
    navigate(`/singleProduct/${id}`);
  }

  return (
    <div className="base-container px-5">
      <h1 className="mb-8 mt-4 text-center text-2xl tracking-wide text-gray-900 dark:text-white">
        {t("articles")}
      </h1>
      <ul className="grid gap-4 max-[640px]:grid-cols-2 max-[375px]:grid-cols-1 sm:grid-cols-3">
        {paginatedArticles.map(({ title, id, description }) => (
          <li key={id}>
            <Card className="h-[200px] w-full">
              <h5 className="line-clamp-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                {title}
              </h5>
              <p className="line-clamp-2 font-normal text-gray-700 dark:text-gray-400">
                {description}
              </p>
              <Button disabled={loading} onClick={() => handleClick(id)}>
                Read more
                <svg
                  className="-mr-1 ml-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </Card>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(article.length / itemsPerPage)}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
