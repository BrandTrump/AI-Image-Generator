import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="flex justify-between p-5 sticky top-0 bg-white z-50 shadow-md">
      <div className="flex space-x-2 items-center">
        <Image
          src="http://links.papareact.com/4t3"
          alt="logo"
          height={30}
          width={30}
        />
        <div>
          <h1 className="text-bold">
            DALL·E 2.0 <span className="text-violet-500">AI</span> Image
            Generator
          </h1>
          <h2 className="text-sm">
            Powered by DALL·E 2, ChatGPT & Microsoft Azure
          </h2>
        </div>
      </div>
      <div className="flex items-center text-xs md:text-base text-gray-500">
        <Link
          href="https://github.com/BrandTrump/AI-Image-Generator"
          target="_blank"
        >
          GitHub Repo
        </Link>
      </div>
    </header>
  );
}

export default Header;
