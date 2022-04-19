import React, { useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

import Link from "next/link";
import { LoginContext } from "../context/loginstate";

export const Navbar = () => {
  const { rootLoginState, onSignoutSuccess, onSignout } =
    useContext(LoginContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cookies] = useCookies(["CIS_1"]);
  const router = useRouter();

  const destroyID = async (event) => {
    await onSignout(event);
    console.log("heihei");
  };

  return (
    <div className="bg-gray-900">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <a
                aria-label="EsduLanit"
                title="Esedulanit"
                className="inline-flex items-center mr-8"
              >
            
                <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">
                  Esedu Lanit
                </span>
              </a>
            </Link>
            <ul className="flex items-center  space-x-8 lg:flex"></ul>
          </div>
          <ul className="flex items-center  space-x-8 lg:flex">
            {cookies.CIS_1 ? (
              <>
                <li className="hover:bg-gray-900 text-white  hover:text-gray-300  rounded py-1 px-2 ">
                  <Link href="/">
                    <a
                      onClick={() => {
                        destroyID();
                      }}
                      className="font-medium tracking-wide  hover:text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                    >
                      Kirjaudu Ulos
                    </a>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:bg-gray-900 text-white  hover:text-gray-300  rounded py-1 px-2 ">
                  <Link href="/login">
                    <a className="font-medium tracking-wide  hover:text-white transition-colors duration-200 hover:text-deep-purple-accent-400">
                      Kirjaudu
                    </a>
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
      
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Link href="/">
                        <a
                          aria-label="Esedulanit"
                          title="Esedulanit"
                          className="inline-flex items-center"
                        >
      
                          <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                            EseduLanit
                          </span>
                        </a>
                      </Link>
                    </div>
                    <div>
                      <button
                        aria-label="Sulje Menu"
                        title="Sulje Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      <li>
                        <Link href="/">
                          <a
                            aria-label="Etusivu"
                            title="Etusivu"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Etusivu
                          </a>
                        </Link>
                      </li>

                      <li>
                        <Link href="/login">
                          <a
                            aria-label="Login"
                            title="Login"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Kirjaudu
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
