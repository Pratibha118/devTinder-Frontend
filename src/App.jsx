import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"


function App() {

  return (
    <>
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<div>base path</div>} />
        <Route path="/login" element={<div>login path</div>} />
        <Route path="/hello" element={<div>hello path</div>} />

      </Routes>
      </BrowserRouter>
      <Navbar />
      <h1 className="text-3xl font-bold underline" >Hello World</h1>
    </>
  )
}

export default App
