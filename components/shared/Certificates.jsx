import { useState } from "react";
import useStore from "@/store/store";
import Input from "@/components/common/Input";
import Button from "../common/Button";
import { useFormattedTime } from "@/utils/helpers";
import { MdPlayArrow } from "react-icons/md";

const Certificates = () => {
  const { certificates, addCertificate, removeCertificate } = useStore();

  const [show, setShow] = useState(false);

  const [newCertificate, setNewCertificate] = useState({
    title: "",
    date: "",
  });

  const handleAddCertificate = () => {
    if (newCertificate.title && newCertificate.date) {
      addCertificate(newCertificate);
      setNewCertificate({
        title: "",
        date: "",
      });
    }
  };

  const handleRemoveCertificate = (index) => {
    removeCertificate(index);
  };

  return (
    <div className="flex flex-col gap-2 border-b border-dashed border-gray-400">
      <h2
        className="font-bold text-2xl text-main hover:text-main/80 animation-all mb-4 cursor-pointer flex items-center gap-1"
        onClick={() => setShow(!show)}
      >
        Certificates & Awards
        <MdPlayArrow
          size={18}
          className={`mt-1 animation-all ${show ? "rotate-90" : ""}`}
        />
      </h2>

      {show && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <Input
              state={newCertificate.title}
              setState={(value) =>
                setNewCertificate({ ...newCertificate, title: value })
              }
              name="title"
              label="Title*"
            />
            <Input
              state={newCertificate.date}
              setState={(value) =>
                setNewCertificate({ ...newCertificate, date: value })
              }
              type="month"
              name="date"
              label="Date*"
            />
          </div>

          <Button onClick={handleAddCertificate}>Add Certificate</Button>

          {/* List */}
          <div className="my-6">
            {certificates.length > 0 && (
              <div className="space-y-4 text-white/80">
                {certificates.map((cert, index) => (
                  <details
                    key={index}
                    className="border border-white/50 p-4 rounded-md animation-all"
                  >
                    <summary className="font-bold text-white/80">
                      {cert.title}
                    </summary>
                    <p>{useFormattedTime(cert.date)}</p>
                    <button
                      onClick={() => handleRemoveCertificate(index)}
                      className="text-red-500 mt-2"
                    >
                      Remove
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

export default Certificates;
