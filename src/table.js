import { useState } from 'react';
// import './App.css';
function App() {
const [data, setData] = useState();
const [num, setNum] = useState();
const HandleData = () => {
let show;
for(let n = 0 ; n <= 10 ; n++){
  show+=num+"x" + n + "=" + num*n 
}
setData(show)
}

  return (
    <div>
      <h1>helooo guys</h1> 
    <input
    type="number"
    placeholder="type some number"
    onChange={(e) =>  setNum(e.target.value)}
    />
    <button 
    style={{
      width:"45px",
      height:"45px",
      borderRadius:"45px",
      objectFit:"cover"
    }}
     onClick={HandleData}
     >
       =
     </button>
    {JSON.stringify(data)}
    </div>
  );
}

export default App;
