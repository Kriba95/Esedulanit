import React, { createContext, Component } from "react";
import axios from "axios";

export const LoginContext = createContext();
import { withCookies, Cookies } from "react-cookie";
import Router, { withRouter } from "next/router";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost/Esedulanit/api/" // <-- Development
    : "api/";

// Backend Ossi Api
const Axios = axios.create({
  baseURL,
});

class LoginContextProvider extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isAuth: false,
    isLoggedin: false,
    selectUserType: false,
    ShowloginButton: true,
    ShowlogoutButton: false,
    NShowloginButton: true,
    NShowlogoutButton: false,
    log: "",
    inValidPass: false,
    inValidEmail: false,
    errorType: false,
    token: false,
    theUser: {
      username: "",
      email: "",
      kaupunki: "",
      koulutus: "",
      maakunta: "",
      nimi: "",
      nykyinentyo: "",
      osoite: "",
      postinumero: "",
      sukunimi: "",
      tietoaMinusta: "",
    },
  };

  ///////////////////////////////////////////////////

  setProfile = async (props) => {
    // Työntekijä
    //console.log("gei")

    const { emp } = props;

    var postData = {
      emp: emp ? emp : 2,
    };

    //console.log("työntekijä");
    //console.log(postData);

    Axios.post(
      "/api/ware/sure.php",
      { postData },
      { withCredentials: true }
    ).then((response) => {
      //console.log(response);
    });
  };

  onLoginSuccess = async (res) => {
    //console.log("Login Success:", res.profileObj);
    this.setState({
      ShowloginButton: false,
      ShowlogoutButton: true,
      isAuth: true,
      login: res.profileObj,
    });
    //console.log(this.state);
  };

  onLoginFailure = async (res) => {
    //console.log("Login Failed:", res);
    //console.log(this.state);
  };

  onSignoutSuccess = async (props) => {
    alert("You have been logged out successfully");
    console.clear();
    this.setState({
      ShowloginButton: true,
      ShowlogoutButton: false,
    });
    //console.log(this.state);
  };

  // registerUser = async (props) => {
  //   const { email, password } = props;
  //   var postData = {
  //     email: email,
  //     password: password,
  //   };
  //   const { cookies } = this.props;

  //   Axios.post("/api/ware/register.php", postData).then((response) => {
  //     if (response.data.status === 201) {
  //       Router.push("/oma-profiili/kuka-olen/");
  //       cookies.set("CIS_1", "1", { path: "/" });

  //       this.setState({
  //         isAuth: true,
  //         selectUserType: true,
  //         log: response.data.message,
  //       });
  //     }
  //     if (response.data.status === 422) {
  //       this.setState({
  //         log: response.data.message,
  //         errorType: response.data.ErrorType,
  //       });
  //     }
  //   });
  // };

  loginUser = async (props) => {
    //console.log("gei")

    const { username, password } = props;
    const { cookies } = this.props;

    var postData = {
      email: username,
      password: password,
    };

    Axios.post("ware/login.php", { withCredentials: true, postData }).then(
      (response) => {
        if (response.data.success === 1) {
          cookies.set("CIS_1", "1", { path: "/" });

          Axios.defaults.headers.common["Authorization"] =
            "bearer " + response.data.token;

          Axios.get("ware/user-info.php", { withCredentials: true }).then(
            (response) => {
              console.log(response)
              cookies.set("CIS_id", response.data.user.id, { path: "/" });
              if (response.data.user === 0) {
                Router.push("/admin/");
              } else {
                Router.push("/admin");
              }
            }
          );

          this.setState({
            log: response.data.message,
            errorType: true,
            isAuth: true,
          });

          if (response.data.status === 422) {
            this.setState({
              log: response.data.message,
              errorType: response.data.ErrorType,
            });
          }
        }

        // To keep user logged in
      }
    );
  };

  onSignout = async () => {
    //console.log("gei")

    const { cookies } = this.props;

    cookies.remove("CIS_1", "1", { path: "/" }); // setting the cookie

    Axios.post("ware/logout.php", {}, { withCredentials: true })
      .then((res) => {
        // //console.log(res);
        location = "/";
      })
      .catch((err) => {
        // //console.log(err.response);
      });
  };

  isLoggedIn = async () => {
    //console.log("gei")

    //console.log("Needs if stament from cookies if logged in");
    Axios.post("/api/ware/isLoggedIn.php", {}, { withCredentials: true }).then(
      (response) => {
        ////console.log(response);
        if (response.data.success === 1) {
          this.setState({
            NShowloginButton: false,
            NShowlogoutButton: true,
            isAuth: true,
          });
        }
      }
    );
    ////console.log(this.state);
  };

  getUserData = async () => {
    //console.log("getUserData")
    const { cookies } = this.props;
    //console.log(cookies.CIS_id)

    Axios.post("/api/ware/profile.php", {}, { withCredentials: true })
      .then((res) => {
        //console.log(res.data);
        this.setState({
          theUser: res.data,
        });
        // location = "/";
      })
      .catch((err) => {
        // //console.log(err.response);
      });
  };

  sendUserData = async () => {
    //console.log("gei")
    const { cookies } = this.props;
    cookies.remove("CIS_1", "1", { path: "/" });
    Axios.post("/api/ware/logout.php", {}, { withCredentials: true })
      .then((res) => {
        // //console.log(res);
        // location = "/";
      })
      .catch((err) => {
        // //console.log(err.response);
      });
  };
  ////////////////////////////////////////////////////

  render() {
    const contextValue = {
      rootLoginState: this.state,
      getUserData: this.getUserData,
      sendUserData: this.sendUserData,

      onSignout: this.onSignout,
      setProfile: this.setProfile,
      onLoginSuccess: this.onLoginSuccess,
      onLoginFailure: this.onLoginFailure,
      onSignoutSuccess: this.onSignoutSuccess,
      registerUser: this.registerUser,
      loginUser: this.loginUser,
      isLoggedIn: this.isLoggedIn,
    };
    return (
      <LoginContext.Provider value={contextValue}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}

export default withRouter(withCookies(LoginContextProvider));
