import './App.css'
import EmployeeComponent from './components/EmployeeComponent'
import Footer from './components/Footer'
import Header from './components/Header'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>  
      <BrowserRouter>
          <Header/>
          <Routes>
            {/* http://localhost:3000 */}
            <Route path='/' element={<ListEmployeeComponent/>}/>
            {/* http://localhots:3000/employees */}
            <Route path='/employees' element={<ListEmployeeComponent/>}/>
            {/* http://localhots:3000/add-employee */}
            <Route path='/add-employee' element={<EmployeeComponent/>}/>
            {/* http://localhots:3000/edit-employee */}
            <Route path='/edit-employee/:id' element={<EmployeeComponent/>}/>
          </Routes>
          <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
