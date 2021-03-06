import React, { useState, useContext } from "react";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import { LoginContext } from "../context/loginstate";
import LoginLoad from "../components/LoginLoad";

export default function Login() {
  const [userInput, setUserInput] = useState({});
  const [loading, setLoading] = useState(false);
  const { loginUser } = useContext(LoginContext);

  const login = async (event) => {
    await loginUser(userInput);
    event.preventDefault();
  };

  const handleChange = ({ target }) => {
    //console.log("adsa");
    let value;
    if (target.value === "") {
      value = null;
    } else {
      value = target.value;
    }
    let data = userInput;
    data[target.name] = value;
    setUserInput(data);
  };

  const loadings = () => {
    setLoading(true);
  };

  return (
    <>
      <Head>
        <title>Esedu_Lanit | Kirjaudu </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-3xl mb-3">Kirjaudu</h1>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Käyttäjätunnus
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                name="username"
                type="text"
                placeholder="Käyttäjätunnus"
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Salasana
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                placeholder="Salasana"
                onChange={handleChange}
              />
      
            </div>

            {loading ? (
              <>
                <LoginLoad />
              </>
            ) : null}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={login}
            >
              Kirjaudu
            </button>
          </form>
          <p className="text-center text-gray-500 text-xs">Esedulanit</p>
        </div>
      </main>
    </>
  );
}
