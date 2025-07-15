import { FaGithub, FaTelegram, FaTwitter } from "react-icons/fa6";
export function Footer() {
  return (
    <div className="flex w-full flex-col items-center justify-between px-1 pb-8 pt-3 lg:px-8 xl:flex-col ">
        <p className="mb-4 text-center text-sm font-medium text-white sm:!mb-0 md:text-lg">
            <span className="mb-4 text-center text-sm text-white sm:!mb-0 md:text-base">
            ©{new Date().getFullYear()} CardFi Protocol. All Rights Reserved.
            </span>
        </p>
        <div>
            <ul className="flex flex-wrap items-center gap-3 sm:flex-nowrap md:gap-10">
            <li>
                <a
                target="blank"
                href="https://x.com/cardficash"
                className="text-base font-medium text-white hover:text-gray-600"
                >
                <FaTwitter size={30}></FaTwitter>
                </a>
            </li>
            <li>
                <a
                target="blank"
                href="https://t.me/+ukjqIc0qpfcwN2U1"
                className="text-base font-medium text-white hover:text-gray-600"
                >
                <FaTelegram  size={30}></FaTelegram>
                </a>
            </li>
            <li>
                <a
                target="blank"
                href="https://github.com/cardfi-cash"
                className="text-base font-medium text-white hover:text-gray-600 flex"
                >
                <FaGithub  size={30}/>
                </a>
            </li>
            </ul>
        </div>
        </div>
    );
}

