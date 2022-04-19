import React, { createContext, Component } from "react";
import axios from "axios";

export const Context = createContext();

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost/Esedulanit/api/" // <-- Development
    : "api/"; // <-- Production

// Backend Ossi Api
const Axios = axios.create({
  baseURL,
});

export default class ContextProvider extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
  }

  // Root State
  state = {
    isAuth: false,
    lomakkeet: "",
  };

  ///////////////////////////////////////////////////

  stopIt = async () => {
    this.setState({
      isAuth: false,
      lomakkeet: [],
    });
  };

  submitForm = async (props) => {
    console.log("lets do it");
    console.table(props);

    const doThis = await Axios.post("postform.php/", props).catch(function (
      error
    ) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

    if (doThis) {
      console.table(doThis.data);
    }
  };

  doThis = async (props) => {
    console.log("lets do it");
    console.table(props);

    const doThis = await Axios.post("mailer.php/").catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

    if (doThis) {
      console.table(doThis.data);
    }
  };

  getPosts = async (props) => {
    console.log(props)
    Axios.get("getPosts.php", { withCredentials: true }).then((response) => {
      console.log(response)

      this.setState({
        lomakkeet: response.data,
      });
    });
  };

  doThisCheckerValidationSuper = async (props) => {
    let post = {
      lol: props,
    };
    console.log(props);

    const doThis = await Axios.post("trytovalidatethis.php/", post).then((response) => {
      console.log(response.data)
      this.setState({
        isAuth: response.data.isAuth,
    
      });
    }).catch(
      function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
    );

    // if (doThis) {
    //   console.log(doThis.data.isAuth);

    //   if (doThis.data.isAuth) {
    //     this.setState({
    //       isAuth: doThis.data.isAuth,
    //     });
    //   }
    // }
  };

  changeEstate = async (props) => {
    console.table(props);

    Axios("modifyPost.php", {
      method: "post",
      data: props,
      withCredentials: true,
    }).then((response) => {
      this.setState({
        lomakkeet: response.data,
      });
    })

    // Axios.get("modifyPost.php", { withCredentials: true, props }).then(
    //   (response) => {
    //     console.log(response);

    //     // To keep user logged in
    //   }
    // );
  };

  ////////////////////////////////////////////////////

  render() {
    const contextValue = {
      rootState: this.state,
      doThisCheckerValidationSuper: this.doThisCheckerValidationSuper,
      changeEstate: this.changeEstate,
      stopIt: this.stopIt,
      doThis: this.doThis,
      getPosts: this.getPosts,
      submitForm: this.submitForm,
    };
    return (
      <Context.Provider value={contextValue}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
