import React from "react";

const StageOne = ({
  handleSubmit,
  page,
  state,
  handleChange,
  errorf,
  openCarerContent,
}) => (
  <form onSubmit={handleSubmit}>
    <br />
    <br />
    <div>
      <div
        style={page === 1 ? { display: "block" } : { display: "none" }}
        className="lg:ml-64 lg:mr-64 sm:ml-32 sm:mr-32"
      >
        <div className="w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
          <div className="grid  gap-8 grid-cols-1">
            <div className="flex flex-col ">
              <div className="flex flex-col sm:flex-row items-center">
                <h2 className="font-semibold text-lg mr-auto">
                  Ilmoittautumislomake
                </h2>
                <div className="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0" />
              </div>
              <div className="mt-5">
                <div className="form">
                  <div className="md:flex flex-row md:space-x-4 w-full text-xs">
                    <div className="mb-3 space-y-2 w-full text-xs">
                      <label className="font-semibold text-gray-600 py-2">
                        Etunimi
                        <abbr title="required">*</abbr>
                      </label>

                      <input
                        placeholder="Etunimi"
                        className="font-bold appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        type="text"
                        name="Etunimi"
                        value={state.Etunimi}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />

                      {typeof errorf["Etunimi"] !== "undefined" ? (
                        <p className="text-xs text-red-500 text-right my-3">
                          {errorf["Etunimi"]}
                        </p>
                      ) : null}
                    </div>

                    <div className="mb-3 space-y-2 w-full text-xs">
                      <label className="font-semibold text-gray-600 py-2">
                        Sukunimi <abbr title="required">*</abbr>
                      </label>
                      <input
                        placeholder="Sukunimi"
                        className="font-bold appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        type="text"
                        name="Sukunimi"
                        value={state.Sukunimi}
                        onChange={handleChange}
                      />

                      {typeof errorf["Sukunimi"] !== "undefined" ? (
                        <p className="text-xs text-red-500 text-right my-3">
                          {errorf["Sukunimi"]}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-3 space-y-2 w-full text-xs">
                    <label className=" font-semibold text-gray-600 py-2">
                      Sähköposti
                    </label>
                    <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                      <div className="flex">
                        <span className="flex  leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-blue-300 px-3 whitespace-no-wrap text-grey-dark w-12 h-10 bg-blue-300 justify-center items-center  text-xl rounded-lg text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="font-bold flex-shrink flex-grow flex-auto leading-normal w-px  border border-l-0 h-10 border-grey-light rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow"
                        placeholder="email@domain.com"
                        name="Email"
                        value={state.Email}
                        onChange={handleChange}
                      />
                    </div>
                    {typeof errorf["Email"] !== "undefined" ? (
                      <p className="text-xs text-red-500 text-right my-3">
                        {errorf["Email"]}
                      </p>
                    ) : null}
                  </div>

                  <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                    <div className="w-full flex flex-col mb-3">
                      <label className="font-semibold text-gray-600 py-2">
                        Puhelin
                      </label>
                      <input
                        placeholder="Puhelinnumero"
                        className="font-bold appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        type="text"
                        name="Puhelin"
                        value={state.Puhelin}
                        onChange={handleChange}
                      />
                      {typeof errorf["Puhelin"] !== "undefined" ? (
                        <p className="text-xs text-red-500 text-right my-3">
                          {errorf["Puhelin"]}
                        </p>
                      ) : null}
                    </div>
                    <div className="w-full flex flex-col mb-3">
                      <label className="font-semibold text-gray-600 py-2">
                        Ikä
                      </label>
                      <input
                        className="font-bold block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full "
                        placeholder="Ikä"
                        name="Ika"
                        onChange={handleChange}
                        value={state.Ika}
                      />

                      {typeof errorf["Ika"] !== "undefined" ? (
                        <p className="text-xs text-red-500 text-right my-3">
                          {errorf["Ika"]}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                    <div className="w-full flex flex-col mb-3">
                      <div className="w-full flex flex-col mb-3">
                        <label className="font-semibold text-gray-600 py-2">
                          Discord ID
                        </label>
                        <input
                          placeholder="Palkka"
                          className="font-bold appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                          type="text"
                          name="DiscordID"
                          id="integration_street_address"
                          value={state.DiscordID}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {!openCarerContent ? null : (
                    <>
                      <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                        <div className="w-full flex flex-col mb-3">
                          <label className="font-semibold text-gray-600 py-2">
                            Huoltajan nimi
                            <abbr title="required">*</abbr>
                          </label>
                          <input
                            placeholder="Huoltajan nimi"
                            className="font-bold appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                            type="text"
                            name="carerName"
                            value={state.carerName}
                            onChange={handleChange}
                          />
                          {typeof errorf["carerName"] !== "undefined" ? (
                            <p className="text-xs text-red-500 text-right my-3">
                              {errorf["carerName"]}
                            </p>
                          ) : null}
                        </div>
                        <div className="w-full flex flex-col mb-3">
                          <label className="font-semibold text-gray-600 py-2">
                            Huoltajan puhelin
                          </label>
                          <input
                            placeholder="Huoltajan puhelinnumero"
                            className="font-bold appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                            type="text"
                            name="carerPhone"
                            value={state.carerPhone}
                            onChange={handleChange}
                          />
                          {typeof errorf["carerPhone"] !== "undefined" ? (
                            <p className="text-xs text-red-500 text-right my-3">
                              {errorf["carerPhone"]}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div className="mb-3 space-y-2 w-full text-xs">
                        <label className=" font-semibold text-gray-600 py-2">
                          Huoltajan Sähköposti
                        </label>
                        <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                          <div className="flex">
                            <span className="flex  leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-blue-300 px-3 whitespace-no-wrap text-grey-dark w-12 h-10 bg-blue-300 justify-center items-center  text-xl rounded-lg text-white">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="font-bold flex-shrink flex-grow flex-auto leading-normal w-px  border border-l-0 h-10 border-grey-light rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow"
                            placeholder="sähköposti@email.com"
                            name="carerEmail"
                            value={state.carerEmail}
                            onChange={handleChange}
                          />
                        </div>
                        {typeof errorf["carerEmail"] !== "undefined" ? (
                          <p className="text-xs text-red-500 text-right my-3">
                            {errorf["carerEmail"]}
                          </p>
                        ) : null}
                      </div>

                      <div className="flex-auto w-full mb-1 text-xs space-y-2">
                        <label className="font-semibold text-gray-600 py-2">
                          Ilmoituksen kuvaus
                        </label>
                        <br />
                        <span className="text-gray-600 py-2">
                          Kerro tarkemmin, mistä työtehtävästä on kyse. Kerro
                          myös yrityksestä, bonuksista ja muista eduista.
                        </span>

                        {typeof errorf["kuvaus"] !== "undefined" ? (
                          <p className="text-xs text-red-500 text-right my-3">
                            {errorf["kuvaus"]}
                          </p>
                        ) : null}
                      </div>
                    </>
                  )}

                  {errorf ? (
                    <>
                      <p className="text-xs text-red-500 text-right my-3">
                        Täytä tähdillä merkityt kohdats
                        <abbr title="Required field">*</abbr>
                      </p>
                    </>
                  ) : null}

                  <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                    <input
                      type="submit"
                      value="Jatka"
                      className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />

      <br />
    </div>
  </form>
);

export default StageOne;
