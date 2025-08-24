import { FaFacebook, FaGithub  } from "react-icons/fa6";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-600 text-white shadow-lg py-4 px-10 w-full mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <span className="text-base">© {year}. phucnguyen</span>
        <div className="flex gap-3 text-xl">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:-translate-y-1.5 transition-transform duration-300 font-semibold"
          >
            <FaFacebook />
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:-translate-y-1.5 transition-transform duration-300 font-semibold"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
}
