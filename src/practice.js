import React, { useState } from "react"
import "./App.css"

const App = () =>{
    const [data, setData] = useState("")
    let i;
    for(i=1 ; i<=5; i++){
     for(i=5 ; i>=1; i--){
       setData("*")
     }
    }
  return(
    <div className="main">
             
   </div>
  )
}
export default App;