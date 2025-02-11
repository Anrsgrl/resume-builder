import { useState } from "react";
import useStore from "@/store/store";
import dynamic from "next/dynamic";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { handleMoveItem, useFormattedTime } from "@/utils/helpers";
import { MdDateRange, MdPlayArrow } from "react-icons/md";
import toast from "react-hot-toast";
import { useLocale, useTranslations } from "next-intl";
import { LOCALES } from "@/utils/constants";
import Example from "@/components/shared/Example";
import EditorLoading from "@/components/shared/EditorLoading";
const Editor = dynamic(() => import("@/components/shared/Editor"), {
  ssr: false,
  loading: () => <EditorLoading />,
});

const Certificates = () => {
  const t = useTranslations("Certificates");
  const {
    store: { certificates },
    addItem,
    editItem,
    removeItem,
    updateOrder,
  } = useStore();

  const [show, setShow] = useState(false);

  const [newCertificate, setNewCertificate] = useState({
    title: "",
    date: "",
    description: "",
  });

  const [editedIndex, setEditedIndex] = useState(null);

  const handleAddCertificate = () => {
    if (newCertificate.title && newCertificate.date) {
      addItem("certificates", newCertificate);
      setNewCertificate({
        title: "",
        date: "",
        description: "",
      });
    } else {
      toast.error(t("error"));
    }
  };

  const handleRemoveCertificate = (index) => {
    removeItem("certificates", index);
  };

  //* Edit
  const handleEditCertificate = () => {
    try {
      editItem("certificates", editedIndex, newCertificate);
      toast.success(t("success"));
      setEditedIndex(null);
      setNewCertificate({
        title: "",
        date: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  const handleChooseCertificate = (index) => {
    setEditedIndex(index);
    const certificateItem = certificates[index];
    setNewCertificate({
      title: certificateItem.title,
      date: certificateItem.date,
      description: certificateItem.description,
    });
    // Temporary solution
    setTimeout(() => {
      setNewCertificate({
        title: certificateItem.title,
        date: certificateItem.date,
        description: certificateItem.description,
      });
    }, [200]);
  };

  const handleCloseEdit = () => {
    setEditedIndex(null);
    setNewCertificate({
      title: "",
      date: "",
      description: "",
    });
  };

  //* Sort functions
  const handleMoveCertificatesUp = (index) => {
    handleMoveItem(certificates, updateOrder, index, "up", "certificates");
  };

  const handleMoveCertificatesDown = (index) => {
    handleMoveItem(certificates, updateOrder, index, "down", "certificates");
  };

  //* ISO
  const locale = useLocale();
  const localeIso = LOCALES.find((lang) => lang.value === locale).iso;

  return (
    <div className="flex flex-col gap-2 border-b border-dashed border-gray-400">
      <h2
        className="font-bold text-xl text-main hover:text-main/80 animation-all mb-4 cursor-pointer flex items-center gap-1"
        onClick={() => setShow(!show)}
      >
        {t("title")}
        <MdPlayArrow
          size={18}
          className={`mt-1 animation-all ${show ? "rotate-90" : ""}`}
        />
      </h2>

      {show && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              state={newCertificate.title}
              setState={(value) =>
                setNewCertificate({ ...newCertificate, title: value })
              }
              name="title"
              label={t("certificate") + "*"}
            />
            <Input
              state={newCertificate.date}
              setState={(value) =>
                setNewCertificate({ ...newCertificate, date: value })
              }
              type="month"
              lang={localeIso}
              name="date"
              label={t("date") + "*"}
            />
          </div>
          <div className="mt-2">
            <Editor
              editedIndex={editedIndex}
              state={newCertificate.description}
              setState={(value) =>
                setNewCertificate({ ...newCertificate, description: value })
              }
              label={t("description")}
            />
          </div>
          <Button
            onClick={() =>
              editedIndex === null
                ? handleAddCertificate()
                : handleEditCertificate()
            }
          >
            {t(editedIndex !== null ? "edit" : "add")}
          </Button>
          {editedIndex !== null && (
            <Button onClick={() => handleCloseEdit()}>{t("close")}</Button>
          )}
          {/* List */}
          <div className="my-6">
            {certificates.length > 0 && (
              <div className="space-y-4 text-white/80">
                {certificates.map((cert, index) => (
                  <Example
                    key={index}
                    index={index}
                    remove={handleRemoveCertificate}
                    edit={handleChooseCertificate}
                    down={handleMoveCertificatesDown}
                    up={handleMoveCertificatesUp}
                    title={cert.title}
                    state={certificates}
                  >
                    <p className="flex items-center gap-1">
                      <strong className="text-main">
                        <MdDateRange />
                      </strong>{" "}
                      {useFormattedTime(cert.date, localeIso)}
                    </p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          cert?.description !== "<p><br></p>"
                            ? cert.description
                            : "",
                      }}
                    ></div>
                  </Example>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Certificates;
