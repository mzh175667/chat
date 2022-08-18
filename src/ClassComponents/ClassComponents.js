import React from "react";
class ClassComponents extends React.Component {
  // kisi object ko initialize krny ky liye ya parent component ko access krny ya read krny
  // ya kisi method ko bind krny
  // ky liye use krty hai constructor ko
  // else nhi krty
  constructor() {
    //  super hum parent component ko call krny ky liye use krty hai
    super();
    this.state = {
      data: "MZH",
    };
    console.log("constructor");
  }
  // before mounting
  componentWillMount() {
    console.log("here is some componentWillMount");
  }
  // after mounting
  componentDidMount() {
    console.log("here is some componentDidMount");
  }
  render() {
    console.log("here is some render");
    return (
      <div>
        <h1 style={{ fontStyle: "italic" }}>{this.state.data}</h1>
      </div>
    );
  }
}
export default ClassComponents;
// Class base component ma constructor componentDidmount and render and return ye sab aik life cycle method hoty hai
// for removing data
// componentWillUnMount() {
//   console.log("here is some componentWillMount");
// }
