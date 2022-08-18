import React, { useEffect, useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const SignUp = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token && userId) {
  //     navigate("/");
  //   }
  // }, []);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const signUp = async (e) => {
    e.preventDefault();

    let { name, email, password } = user;
    if (name && email && password) {
      await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          userType: "client",
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res?.success == true) {
            setUser({
              name: "",
              email: "",
              password: "",
            });
            navigate("/signin");
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("plz fill all the feilds");
    }
    // results = await results.json();
    // localStorage.setItem("userData", JSON.stringify(results));
  };
  let name, value;
  const postData = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUser({ ...user, [name]: value });
  };
  return (
    //   <div className="main">
    <div className="main mt-4 pt-3">
      <div className="app_auth">
        <div className="imgMainDiv">
          <img
            className="chatSignUpImg pb-2 pl-3"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlK3BMFdRkYNxYjR1pzkU-OpRo4N6lKYD8nQ&usqp=CAU"
            alt=""
          />
        </div>
        <div className="col-md-12 header">
          <div className="header_sign_in text-center">
            {/* <span className="icon1"><i className="fas fa-angle-left"></i></span> */}
            SignUp
          </div>
        </div>
        <form method="POST">
          <div className="col-md-12">
            <div className="name_signUp pt-5">
              <input
                placeholder="UserName"
                className="inputs"
                onChange={postData}
                name="name"
                value={user.name}
                required
              />
              {/* <span className="icon3"><i className="fas fa-pen"></i></span> */}
              {/* <hr className="line"/> */}
            </div>
            <div className="name_signUp  pt-5">
              <input
                placeholder="Email"
                className="inputs"
                onChange={postData}
                value={user.email}
                name="email"
              />
            </div>
            <div className="name_signUp pt-5">
              <input
                type="password"
                placeholder="Password"
                className="inputs"
                onChange={postData}
                value={user.password}
                name="password"
              />
            </div>

            <Link to="/signin" className="aboutAccountText">
              Already have an account?
            </Link>
            <div className="pt-3">
              <button className="auth_footer_button" onClick={signUp}>
                signUp
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    //  </div>
  );
};
export default SignUp;
