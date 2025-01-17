import { useState } from "react";
import useStore from "@/store/store";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { MdPlayArrow } from "react-icons/md";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

const References = () => {
  const t = useTranslations("References");
  const { references, addReference, removeReference } = useStore();

  const [show, setShow] = useState(false);

  const [newReference, setNewReference] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
  });

  const handleAddReference = () => {
    if (newReference.name && newReference.company) {
      addReference(newReference);
      setNewReference({
        name: "",
        company: "",
        phone: "",
        email: "",
      });
    } else {
      toast.error(t("error"));
    }
  };

  const handleRemoveReference = (index) => {
    removeReference(index);
  };

  return (
    <div className="flex flex-col gap-2 border-b border-dashed border-gray-400">
      <h2
        className="font-bold text-2xl text-main hover:text-main/80 animation-all mb-4 cursor-pointer flex items-center gap-1"
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
              state={newReference.name}
              setState={(value) =>
                setNewReference({ ...newReference, name: value })
              }
              name={"name"}
              label={t("name") + "*"}
            />
            <Input
              state={newReference.company}
              setState={(value) =>
                setNewReference({ ...newReference, company: value })
              }
              name={"company"}
              label={t("company") + "*"}
            />
            <Input
              state={newReference.phone}
              setState={(value) =>
                setNewReference({ ...newReference, phone: value })
              }
              name={"phone"}
              label={t("phone")}
            />
            <Input
              state={newReference.email}
              setState={(value) =>
                setNewReference({ ...newReference, email: value })
              }
              type="email"
              name={"email"}
              label={t("email")}
            />
          </div>
          <Button onClick={handleAddReference}>{t("add")}</Button>

          {/* List */}
          <div className="my-6">
            {references.length > 0 && (
              <div className="space-y-4 text-white/80">
                {references.map((ref, index) => (
                  <details
                    key={index}
                    className="border border-white/50 p-4 rounded-md animation-all"
                  >
                    <summary className="font-bold text-white/80">
                      {ref.name} - {ref.company}
                    </summary>
                    <p>
                      {t("phone")}:{" "}
                      <span className="text-main">{ref.phone}</span>
                    </p>
                    <p>
                      {t("email")}:{" "}
                      <span className="text-main">{ref.email}</span>
                    </p>
                    <button
                      onClick={() => handleRemoveReference(index)}
                      className="text-red-500 mt-2"
                    >
                      {t("remove")}
                    </button>
                  </details>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default References;
