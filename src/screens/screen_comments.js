import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import "../App.css"
import { Get_Data_Comment } from "../Reducers/DataReducers"
const App = () =>{
 const dispatch = useDispatch()
 const {comments ,data, loading} = useSelector((state) => state.userData)
 console.log("comments ==>",comments)
    useEffect(() =>{
      dispatch(Get_Data_Comment())
    },[])
  return(
   <div className="app_api">
     <div className="col-md-12">
          <h2>{comments?.title}</h2>
     </div>
   </div>
  )
}
export default App;