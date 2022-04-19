import React from "react";

const StageThree = ({ state, errorf, muokkaa, handleSubmitAll }) => (
  <div className="lg:ml-64 lg:mr-64 sm:ml-32 sm:mr-32">
    <div className="w-full mb-60 p-10 bg-white rounded-xl shadow-lg z-10">
      <form className="">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Hienoa, Tarkista että tiedot pitävät paikkaansa. Sinulle vielä
            lähetetään muistutus sähköpostiin.
          </label>
        </div>

        <p>
          Nimi: <span>{state.Etunimi}</span>
        </p>
        <p>
          Sukunimi: <span>{state.Sukunimi}</span>
        </p>
        <p>
          Sähköposti: <span>{state.Email}</span>
        </p>
        <p>
          Puhelin: <span>{state.Puhelin}</span>
        </p>
        <p>
          Ikä: <span>{state.Ika}</span>
        </p>
        <p>
          Discord ID: <span>{state.DiscordID}</span>
        </p>

        {state.Ika < 18 ? (
          <>
            <br />
            <hr />
            <p>
              Huoltajan nimi:{" "}
              <span>
                {state.carerName}{" "}
                {typeof errorf["carerName"] !== "undefined" ? (
                  <span className="text-xs text-red-500 text-right my-3">
                    {errorf["carerName"]}
                  </span>
                ) : null}
              </span>
            </p>

            <p>
              Huoltajan puhelin:{" "}
              <span>
                {state.carerPhone}{" "}
                {typeof errorf["carerPhone"] !== "undefined" ? (
                  <span className="text-xs text-red-500 text-right my-3">
                    {errorf["carerPhone"]}
                  </span>
                ) : null}
              </span>
            </p>
            <p>
              Huoltajan sähköposti:{" "}
              <span>
                {state.carerEmail}{" "}
                {typeof errorf["carerEmail"] !== "undefined" ? (
                  <span className="text-xs text-red-500 text-right my-3">
                    {errorf["carerEmail"]}
                  </span>
                ) : null}
              </span>
            </p>
            <br />
          </>
        ) : null}

        <hr className="mt-20" />

        {errorf ? (
          <>
            <p className="text-xs text-red-500 text-right my-3">
              Täytä tähdillä merkityt kohdat
              <abbr title="Required field">*</abbr>
            </p>
          </>
        ) : null}
        <p className="pt-2">Maksu 10€</p>

        <div className="flex mt-5 items-center justify-between">
          <button
            className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={muokkaa}
          >
            Muokkaa
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmitAll}
          >
            Varaa
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default StageThree;
