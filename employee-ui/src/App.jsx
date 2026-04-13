
import './App.css'
import Footer from './component/Footer'
import Header from './component/Header'
import ListEmployeeComponent from './component/ListEmployeeComponent'
// import HelloWorldFunction from './MyFunctionFile'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import EmployeeScreen from './component/EmployeeScreen'

//  https://www.youtube.com/watch?v=AXywe3nDOec&list=PLnlos9IQTynlMZYnG3HnT1uz-u2fYRAYA&index=5



function App() {
  

  return (
    <>
    <BrowserRouter>
      <Header/>
        <Routes>
          {/* //http://localhost:3000/ */}
          <Route path="/" element={<ListEmployeeComponent/>}></Route>

          {/* //http://localhost:3000/employees */}
          <Route path="/employees" element={<ListEmployeeComponent/>}></Route>

          {/* //http://localhost:3000/add-new-employee-screen */}
          <Route path="/add-new-employee-screen" element={<EmployeeScreen/>}></Route>

          {/* //http://localhost:3000/update-employee-screen/1 */}
          <Route path="/update-employee-screen/:id" element={<EmployeeScreen/>}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
