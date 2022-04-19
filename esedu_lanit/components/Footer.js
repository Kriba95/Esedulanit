import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="bg-gray-900">
      <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid row-gap-10 mb-8 lg:grid-cols-6">
          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
            <div>
              <p className="font-medium tracking-wide text-gray-300">
                Yhdensivun sivut
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link href="/">
                    <a className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200">
                      Etusivu
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/login">
                    <a className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200">
                      Kirjaudu
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium tracking-wide text-gray-300">Ehdot</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link href="/kayttajaehdot">
                    <a className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200">
                      Käyttöehdot
                    </a>
                  </Link>
                </li>

                <li>
                  <Link href="/privacy-policy">
                    <a className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200">
                      Tietosuoja
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
