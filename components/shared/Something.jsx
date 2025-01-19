import something from "@/assets/images/something.webp";

const Something = () => {
  return (
    <div className="fixed bg-white z-[999] inset-0 flex items-center justify-center">
      <img src={something.src} alt="something" />
    </div>
  );
};

export default Something;
