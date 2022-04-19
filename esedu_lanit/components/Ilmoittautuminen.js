import React, { useState, useEffect, useRef, useContext } from "react";
import Head from "next/head";
import { Context } from "../context/state"; // import Julkaistu from "./Ssaa";
import Stage from "./Stage";
import StageTwo from "./StageTwo";
import StageOne from "./StageOne";
import StageThree from "./StageThree";

export default function Ilmoittautuminen() {
  const [page, setPage] = useState(1);
  const [stage, setStage] = useState(1);
  const [errorf, setError] = useState(false);

  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  const {
    rootState,
    doThis,
    submitForm,
    stopIt,
    doThisCheckerValidationSuper,
  } = useContext(Context);

  const [userInput, setUserInput] = useState({});
  const [kuvaus, setKuvaus] = useState({});
  const [palkanKuvaus, setPalkanKuvaus] = useState({});
  const [dataa, setdata] = useState({});

  const [openCarerContent, setOpenCarerContent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      ...state,
      palkanKuvaus,
      kuvaus,
    };
    setdata(data);

    if (stage === 3) {
      setPage(3);
    } else {
      console.log("jatka")

      if (state.Ika === "") {
        handleValidation();

        return;
      } else {
        if (state.Ika < 18) {
          setOpenCarerContent(true);
        } else if (state.Ika > 18) {
          handleValidation();
        }
      }
    }

    if (openCarerContent) {
      handleValidation();
    }
    return;
    // await handleSubmit(event);
  };

  function handleValidation() {
    let fields = state;
    let errors = {};
    let formIsValid = true;
    console.log("ko")

    // Email
    if (!fields["Email"]) {
      formIsValid = false;
      errors["Email"] = "Ei voi olla tyhjä";
    }
    if (typeof fields["Email"] !== "undefined") {
      let lastAtPos = fields["Email"].lastIndexOf("@");
      let lastDotPos = fields["Email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["Email"].indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          fields["Email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["Email"] = "Sähköposti ei ole validi. Väärä muoto";
      }
    }

    //fields.Ika
    if (fields["Ika"] < 18) {
      // Jos Alaikäinen

      //fields.carerPhone
      if (!fields["carerPhone"]) {
        formIsValid = false;
        errors["carerPhone"] = "Ei voi olla tyhjä";
      }

      if (typeof fields["carerPhone"] !== "undefined") {
        if (fields["carerPhone"] === "") {
          formIsValid = false;
        } else if (!fields["carerPhone"].match(/^[0-9]+$/)) {
          formIsValid = false;
          errors["carerPhone"] = "Puhelinnumero ilman maakoodia";
        }
      }

      //fields.carerName
      if (!fields["carerName"]) {
        formIsValid = false;
        errors["carerName"] = "Ei voi olla tyhjä";
      }

      if (typeof fields["carerName"] !== "undefined") {
        if (fields["carerName"] === "") {
          formIsValid = false;
        } else if (!fields["carerName"].match(/^[a-ö A-Ö]+$/)) {
          formIsValid = false;
          errors["carerName"] = "Vain kirjaimia";
        }
      }

      //fields.Email
      if (!fields["carerEmail"]) {
        formIsValid = false;
        errors["carerEmail"] = "Ei voi olla tyhjä";
      }
    }

    if (!fields["Ika"]) {
      formIsValid = false;
      errors["Ika"] = "Ei voi olla tyhjä";
    }
    if (typeof fields["Ika"] !== "undefined") {
      if (!fields["Ika"].match(/^[0-9]+$/)) {
        formIsValid = false;
        errors["Ika"] = "Valitse Ika";
      }
    }

    //fields.Etunimi
    if (!fields["Etunimi"]) {
      formIsValid = false;
      errors["Etunimi"] = "Ei voi olla tyhjä";
    }
    if (typeof fields["Etunimi"] !== "undefined") {
      if (!fields["Etunimi"].match(/^[a-öA-Ö]+$/)) {
        formIsValid = false;
        errors["Etunimi"] = "Vain kirjaimia";
      }
    }

    //fields.Sukunimi
    if (!fields["Sukunimi"]) {
      formIsValid = false;
      errors["Sukunimi"] = "Ei voi olla tyhjä";
    }
    if (typeof fields["Sukunimi"] !== "undefined") {
      if (!fields["Sukunimi"].match(/^[a-öA-Ö]+$/)) {
        formIsValid = false;
        errors["Sukunimi"] = "Vain kirjaimia";
      }
    }

    //fields.Puhelin
    if (!fields["Puhelin"]) {
      formIsValid = false;
      errors["Puhelin"] = "Ei voi olla tyhjä";
    }

    if (formIsValid) {
      setError(false);
      // Allgood
      if (stage < 2) {
        setPage(2);
        setStage(2);
        doThisHandler();
      } else if (stage === 3) {
        doThatHandler();
      }
    } else {
      setError(errors);
    }
    return formIsValid;
  }

  function muokkaa() {
    setPage(1);
  }

  const doThisHandler = async (event) => {
    await doThis(state);
  };

  const doThatHandler = async (event) => {
    setPage(4);
    await submitForm(state);
  };

  const handleSubmitCode = async (event) => {
    event.preventDefault();
    await doThisCheckerValidationSuper(state.Vahvistuskoodi);
    return;
  };

  const handleSubmitAll = async (event) => {
    event.preventDefault();

    handleValidation();

    return;
  };

  useEffect(() => {
    if (rootState.isAuth) {
      setStage(3);
      setPage(3);
    }
  }, [rootState.isAuth]);

  const [state, setState] = useState({
    Ika: "",
    DiscordID: "",
    Puhelin: "",
    Email: "",
    carerName: "",
    carerPhone: "",
    Etunimi: "",
    Sukunimi: "",
    carerEmail: "",
    Vahvistuskoodi: "",
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const [inputValue, setInputValue] = useState("");

  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Duunihakuri | Jätä Ilmoitus</title>
        <meta
          name="description"
          content="Duunihakuri | Löydä etsimäsi työpaikka"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {page !== 4 ? <Stage {...{ stage, setPage, page }} /> : <></>}

      {page === 1 ? (
        <StageOne
          {...{
            handleSubmit,
            page,
            state,
            handleChange,
            errorf,
            openCarerContent,
          }}
        />
      ) : (
        <>
          {page === 2 ? (
            <StageTwo
              {...{
                stage,
                setPage,
                handleChange,
                handleSubmitCode,
              }}
            />
          ) : (
            <>
              {page === 3 ? (
                <StageThree
                  {...{
                    state,
                    errorf,
                    muokkaa,
                    handleSubmitAll,
                  }}
                />
              ) : (
                <>
                  <div className="lg:ml-64 mt-20 lg:mr-64 sm:ml-32 sm:mr-32">
                    <div className="w-full mb-60 p-10 bg-white rounded-xl shadow-lg z-10">
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="username"
                        >
                          Loistavaa, {state.Etunimi}!
                          <p>
                            Lähetimme sähköpostiisi muistutuksen varauksesta.
                          </p>
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
