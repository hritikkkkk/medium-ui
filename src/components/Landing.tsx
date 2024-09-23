import { useNavigate } from "react-router-dom";

export default function MediumLanding() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/signin");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-zinc-700 to-zinc-500">
      <div
        style={{
          backgroundImage: `url('/02-01.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
        className="font-serif  shadow-2xl py-3"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-semibold text-gray-900 tracking-wide">
            MEDIUM
          </h1>
        </div>
      </div>

      <div className="flex-grow flex">
        <div className="w-full md:w-3/5 flex flex-col justify-center px-8 md:px-16 py-12">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-normal mb-6 leading-none text-white">
            <span className="block">Human</span>
            <span className="block lg:whitespace-nowrap">stories & ideas</span>
          </h1>
          <p className=" md:text-xl font-sans font-medium mb-8 text-gray-300">
            A place to read, write, and deepen your understanding
          </p>
          <button
            onClick={handleNavigation}
            className="bg-slate-900 text-white hover:bg-slate-800 font-sans font-medium text-lg px-6 py-2 rounded-full transition duration-300 ease-in-out w-fit shadow-lg"
          >
            Start reading
          </button>
        </div>
        <div
          className="hidden md:block md:w-2/5 bg-cover bg-center rounded-lg "
          style={{
            backgroundImage:
              "url('https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
    </div>
  );
}
