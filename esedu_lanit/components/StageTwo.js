import React from "react";

const StageTwo = ({ stage, setPage, handleChange, handleSubmitCode }) => (
  <>
    {stage === 3 ? (
      setPage(3)
    ) : (
      <div className="lg:ml-64 lg:mr-64 sm:ml-32 sm:mr-32">
        <div className="w-full mb-60 p-10 bg-white rounded-xl shadow-lg z-10">
          <form className="">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Syötä vahvistuskoodi, joka lähetettiin sähköpostiisi.
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="Vahvistuskoodi"
                onChange={handleChange}
                type="text"
                placeholder="Vahvistuskoodi"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSubmitCode}
              >
                Jatka
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </>
);

export default StageTwo;
