import surprise from "@/assets/images/surprise.jpeg";

const EasterEgg = () => {
  return (
    <div className="fixed bg-white z-[999] inset-0 flex items-center justify-center">
      <img src={surprise.src} alt="surprise" />
    </div>
  );
};

export default EasterEgg;
