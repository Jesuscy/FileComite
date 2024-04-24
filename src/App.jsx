import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Meeting } from './assets/components/Meeting'
import { Home } from './assets/components/Home'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  return (
    <>
      <Router>

        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/meeting' element={<Meeting />} />

        </Routes>

      </Router>

    </>
  )
}

export default App
