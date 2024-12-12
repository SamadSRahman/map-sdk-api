import { useState } from "react"
import API from './API'
import SDK from './SDK'

export default function App() {
const [page, setPage] = useState("api")
  return (
   <div>
      <button onClick={()=>setPage("api")}>API</button>
      <button onClick={()=>setPage("sdk")}>SDK</button>


      <div>
        {page==="api"?<API/>:<SDK/>}
      </div>
   </div>
  )
}
