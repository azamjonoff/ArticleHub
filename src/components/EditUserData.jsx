// flowbite
import { Button, Label, Modal, TextInput, Tooltip } from "flowbite-react";

// react
import { useEffect, useRef, useState } from "react";

// icon
import { FaPencil } from "react-icons/fa6";

// redux
import { useDispatch, useSelector } from "react-redux";

// lib
import { getFormData } from "../lib/my-utils";
import { editUser, refreshToken } from "../lib/requests";

// toast
import toast, { LoaderIcon } from "react-hot-toast";

// features
import { setUser } from "../features/userSlice";
import { useTranslation } from "react-i18next";

export default function EditUserData() {
  const { user } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(null);
  const emailInputRef = useRef(null);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  function handleLanguageChange(lang) {
    i18n.changeLanguage(lang);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const result = getFormData(e.target);
    setEditData(result);
  }

  useEffect(() => {
    if (editData) {
      setLoading(true);
      editUser({ ...user, ...editData })
        .then((data) => {
          dispatch(setUser(data));
          toast.success("User information has been updated successfully");
        })
        .catch(({ message }) => {
          if (message == "403") {
            refreshToken(user?.refresh_token)
              .then(({ access_token }) => {
                dispatch(setUser({ ...user, access_token }));
              })
              .catch(({ message }) => {
                if (message == "403") {
                  dispatch(setUser(null));
                  toast.error("Please logIn again");
                }
              });
          }
        })
        .finally(() => {
          setLoading(false);
          setOpenModal(false);
          setEditData(null);
        });
    }
  }, [editData, user]);

  return (
    <>
      <Tooltip content="Edit username">
        <Button onClick={() => setOpenModal(true)}>
          <FaPencil width={15} height={15} />
        </Button>
      </Tooltip>

      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
        initialFocus={emailInputRef}
      >
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {t("editUsername")}
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value={t("newUsername")} />
              </div>
              <TextInput
                id="username"
                name="username"
                ref={emailInputRef}
                placeholder={user.username}
                required
              />
            </div>
            <div className="flex w-full justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? <LoaderIcon /> : t("submit")}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
