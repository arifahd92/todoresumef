import React, { useState } from "react";
import swal from "sweetalert";
import "./app.css"
import { useEffect } from "react";
const Todolist = () => {
  let [name, setname] = useState([]);
  let [val, setval] = useState("");
  let [updt,setupdt]=useState(true)
  let [iid,setiid]=useState(null)

    useEffect(()=>{
      mytodo()
    },[name])

    async function mytodo(){
      const res = await fetch("https://todoresume.onrender.com/getdata")
      const data = await res.json()
        setname(data)
    }

    async function gettodo() {
  if(val){
   
      const res = await fetch("https://todoresume.onrender.com/todo",{
          
        method:"post",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
          val
          
          })
        
        })

  let data= await res.json()//res.json wala ayrga
  console.log(data)
   setname([...data,val])

    setval("");
  }
  return;
}
  function removebuddy(ind) {

swal("Are you sure? task will be deleted permanently", {  dangerMode: true,  buttons: true,}).then((e)=>{
  console.log(`ime ${e}`)
  if(e===true){

    deleteitem(ind)
  }
})
async function deleteitem(ind){


const res = await fetch("https://todoresume.onrender.com/delete",{
      
  method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
    ind
    
    })
  
  })
  let data=await res.json()//res.json wala ayrga
  console.log(data)
   setname(data)
}

  }
 async function update(id,inp){
   setval(inp)
   setupdt(false)
   setiid(id)
 }
async function updatetodo(){
  const res = await fetch("https://todoresume.onrender.com/update",{
          
    method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
      _id:iid,
      item:val
      
      })
    
    })
    const data = await res.json()
    setname(data)
    setupdt(true)
    setval("")
 }

  return (
    <div>
      <div className="btn">

      <h1>TODO LIST</h1>
      </div>
    <br />
  
    <div className="btn">
      <input
      className="todoinpt"
        type="text"
        placeholder="Enter List"
        value={val}
        onChange={(e) => setval(e.target.value)}
      />
      {(updt?
        
        <span role="img" className="todobtn" onClick={gettodo}>➕</span>:<span role="img" className="todobtn" onClick={updatetodo}>✅</span>
        )
      }
       </div>
      {(name.length>0)?  name.map((elm, indx) => {
        return (
          <div className="btn">
          < p className="todoitem" key={elm._id} >
            {elm.item} </p> <span role="img" className="dlt" onClick={() => removebuddy(elm._id)}>⛔</span> 
            <span role="img" className="edt" onClick={()=>update(elm._id,elm.item)}>🖋️</span>
        </div>
        );
      }):""}
    </div>
  );
};
export default Todolist;
