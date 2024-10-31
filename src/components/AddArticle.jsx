// flowbite
import { Button, Label, Modal, Select, Tooltip } from "flowbite-react";

// react
import { useEffect, useRef, useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";

// lib
import { collectItem, getFormData } from "../lib/my-utils";
import { addArticle, editUser, refreshToken } from "../lib/requests";

// toast
import toast, { LoaderIcon } from "react-hot-toast";

// features
import { setUser } from "../features/userSlice";

// icon
import { FaPlus } from "react-icons/fa6";

// components
import { FormTextInput, UploadImage } from "../components";
import { setArticles } from "../features/articleSlice";
import { useTranslation } from "react-i18next";

export default function AddArticle({ categories }) {
  const { user } = useSelector((state) => state.user);
  const { article } = useSelector((state) => state.article);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [addedData, setAddedData] = useState(null);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  function handleLanguageChange(lang) {
    i18n.changeLanguage(lang);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { avatar, name, ...otherFields } = getFormData(e.target);
    setAddedData({
      ...otherFields,
      author: {
        avatar,
        name,
      },
    });
  }

  useEffect(() => {
    if (addedData) {
      setLoading(true);
      addArticle(addedData, user?.access_token)
        .then((data) => {
          dispatch(setArticles([...article, data]));
          toast.success("Article added successfully");
          setAddedData(null);
        })
        .catch(({ message }) => {
          if (message == "403") {
            refreshToken(user?.refresh_token)
              .then(({ access_token }) => {
                dispatch(setUser({ ...user, access_token }));
              })
              .catch(() => {
                dispatch(setUser(null));
                toast.error("Please logIn again");
              });
          }
        })
        .finally(() => {
          setLoading(false);
          setOpenModal(false);
        });
    }
  }, [addedData, user]);

  return (
    <>
      <Tooltip content="Add article">
        <Button
          className="flex items-center"
          onClick={() => setOpenModal(true)}
        >
          {t("add")} <FaPlus className="ml-2 h-4 w-4" />
        </Button>
      </Tooltip>

      <Modal
        show={openModal}
        size="xl"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <form
            onSubmit={handleSubmit}
            className="max-h-96 space-y-6 overflow-y-auto px-4"
          >
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {t("editArticle")}
            </h3>
            <FormTextInput
              name="title"
              label={t("title")}
              placeholder={t("titlePlaceholder")}
            />
            <FormTextInput
              name="description"
              label={t("description")}
              placeholder={t("descriptionPlaceholder")}
            />
            <FormTextInput
              name="createdDate"
              label={t("createdDate")}
              placeholder={t("createdDatePlaceholder")}
            />
            <FormTextInput
              name="readTime"
              label={t("readTime")}
              placeholder={t("readTimePlaceholder")}
            />
            <div>
              <div className="mb-2 block">
                <Label htmlFor="categories" value={t("filterLabel")} />
              </div>
              <Select id="categories" name="category">
                {categories?.map((category) => {
                  return (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  );
                })}
              </Select>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-center text-xl">{t("author")}</h4>
              <FormTextInput
                name="name"
                label={t("yourName")}
                placeholder={t("yourNamePlaceholder")}
              />
            </div>
            <div>
              <UploadImage setImageLoading={setImageLoading} />
            </div>
            <div className="flex w-full justify-end">
              <Button type="submit" disabled={loading || imageLoading}>
                {loading ? <LoaderIcon /> : t("submit")}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
