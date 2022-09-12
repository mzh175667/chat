import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate, Link } from "react-router-dom";
import Wave from "react-wavify";
const SignIn = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token && userId) {
  //     navigate("/");
  //   }
  // }, []);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const signIn = async (e) => {
    e.preventDefault();
    let { email, password } = user;
    const data = {
      email,
      password,
    };
    if (!email) {
      alert("please fill the email feild");
      return;
    }
    if (!password) {
      alert("please fill the password feild");
      return;
    }
    await fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success == true) {
          setUser({
            name: "",
            email: "",
          });

          console.log(res.token);
          localStorage.setItem("token", res.token);
          localStorage.setItem("userId", res._id);

          navigate("/chat");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let name, value;
  const postData = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUser({ ...user, [name]: value });
  };
  return (
    <div>
      <div className="main mt-4 pt-3">
        <div className="app_auth">
          <div className="imgMainDiv">
            {/* <img
              className="chatSignInImg pb-3 pl-3"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlK3BMFdRkYNxYjR1pzkU-OpRo4N6lKYD8nQ&usqp=CAU"
              alt=""
            /> */}
          </div>
          <div className="header">
            <div className="header_sign_in text-center">
              {/* <span class Name="icon1"><i className="fas fa-angle-left"></i></span> */}
              SignIn
            </div>
          </div>
          <form method="POST">
            <div className="col-md-12">
              <div className="name_signUp pt-5">
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
              <Link to="/signup" className="aboutAccountText">
                Create account
              </Link>
              <div className="pt-5 mt-5">
                <button className="auth_footer_button" onClick={signIn}>
                  SignIn
                </button>
              </div>
            </div>
          </form>
          <div style={{ width: "100%" }}>
            <Wave
              fill="#1676f0"
              paused={false}
              className="pt-5 mt-4 pl-0 pr-0"
              options={{
                height: 20,
                width: "100%",
                amplitude: 20,
                speed: 0.15,
                points: 3,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
