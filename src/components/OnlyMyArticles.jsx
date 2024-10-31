// redux
import { useDispatch, useSelector } from "react-redux";

// flowbite
import {
  Button,
  Card,
  Select,
  Tooltip,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";

// icnos
import { HiOutlinePencil } from "react-icons/hi";
import { IoTrashOutline } from "react-icons/io5";

// react
import { useEffect, useState } from "react";

// components
import { UploadImage } from "../components";

// toast
import toast, { LoaderIcon } from "react-hot-toast";

// lib
import { findData, getFormData } from "../lib/my-utils";
import { deleteArticle, editArticle, refreshToken } from "../lib/requests";

// features
import { setUser } from "../features/userSlice";
import { useTranslation } from "react-i18next";

export default function OnlyMyArticles({ loading, categories }) {
  const { article } = useSelector((state) => state.article);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [foundArt, setFoundArt] = useState(null);
  const [editedArticle, setEditedArticle] = useState(null);
  const [deletedArticle, setDeletedArticle] = useState(null);
  const { t, i18n } = useTranslation();

  function handleLanguageChange(lang) {
    i18n.changeLanguage(lang);
  }

  function handleEdit(id) {
    setOpenModal(true);
    const thatArt = findData(article, id);
    setFoundArt(thatArt);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { avatar, name, ...otherFields } = getFormData(e.target);
    setEditedArticle({
      ...otherFields,
      id: foundArt.id,
      author: {
        avatar,
        name,
      },
    });
  }

  function handleDelete(id) {
    setDeleteLoading(true);
    if (confirm("Are you sure?")) {
      setDeletedArticle(id);
    }
  }

  // edit article
  useEffect(() => {
    if (editedArticle) {
      editArticle(editedArticle, user?.access_token)
        .then((message) => {
          toast.success(message);
          setEditedArticle(null);
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
          setOpenModal(false);
        });
    }
  }, [editedArticle]);

  // delete article
  useEffect(() => {
    if (deletedArticle) {
      deleteArticle(deletedArticle, user?.access_token)
        .then((message) => {
          toast.success(message);
          setDeletedArticle(null);
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
          setOpenModal(false);
          setDeleteLoading(false);
        });
    }
  }, [deletedArticle]);

  return (
    <>
      <div className="py-8">
        <ul className="grid grid-cols-2 gap-5">
          {article?.map(
            ({
              id,
              title,
              description,
              user_id,
              createdDate,
              author,
              category,
            }) => {
              if (user_id == user.id) {
                return (
                  <li key={id}>
                    <Card className="h-[250px] w-full">
                      <div className="flex justify-between">
                        <h5 className="line-clamp-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                          <span className="font-normal">{t("title")}: </span>
                          {title}
                        </h5>
                        <span className="text-lg">
                          {t("createdDate")}{" "}
                          <span className="font-semibold">{createdDate}</span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <h5 className="text-lg">
                          {t("authorName")}{" "}
                          <span className="font-semibold">{author.name}</span>
                        </h5>
                        <h5 className="text-lg">
                          {t("category")}{" "}
                          <span className="font-semibold">{category}</span>
                        </h5>
                      </div>
                      <p className="line-clamp-2 font-normal text-gray-700 dark:text-gray-400">
                        {description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Tooltip content="Edit article">
                          <Button
                            disabled={loading}
                            onClick={() => handleEdit(id)}
                          >
                            <HiOutlinePencil />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Delete article">
                          <Button
                            disabled={loading}
                            onClick={() => handleDelete(id)}
                          >
                            {deleteLoading ? (
                              <LoaderIcon />
                            ) : (
                              <IoTrashOutline />
                            )}
                          </Button>
                        </Tooltip>
                      </div>
                    </Card>
                  </li>
                );
              }
            },
          )}
        </ul>
      </div>
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
              Edit article
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Title" />
              </div>
              <TextInput
                id="title"
                name="title"
                placeholder="Azizbekning yangi loyihasi"
                defaultValue={foundArt && foundArt.title}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description" />
              </div>
              <TextInput
                id="description"
                name="description"
                placeholder="Azizbekning yangi IT loyihasi ustida ishlamoqda. Bu loyiha texnologiyalar olamida inqilob qilishga va'da bermoqda."
                required
                defaultValue={foundArt && foundArt.description}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="createdDate" value="Created Date" />
              </div>
              <TextInput
                id="createdDate"
                name="createdDate"
                placeholder="15.09.2023"
                required
                defaultValue={foundArt && foundArt.createdDate}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="readTime" value="Read time" />
              </div>
              <TextInput
                id="readTime"
                name="readTime"
                placeholder="3 daqiqa"
                required
                defaultValue={foundArt && foundArt.readTime}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="categories" value="Select category" />
              </div>
              <Select
                id="categories"
                name="category"
                defaultValue={foundArt && foundArt.category}
              >
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
              <h4 className="text-center text-xl">Author</h4>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Your name" />
                </div>
                <TextInput
                  id="name"
                  name="name"
                  placeholder="Kasimova Barchinoy"
                  required
                  defaultValue={foundArt && foundArt.author.name}
                />
              </div>
              <UploadImage
                foundArt={foundArt}
                setImageLoading={setImageLoading}
              />
            </div>
            <div className="flex w-full justify-end">
              <Button type="submit" disabled={loading || imageLoading}>
                {loading ? <LoaderIcon /> : "Submit"}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
