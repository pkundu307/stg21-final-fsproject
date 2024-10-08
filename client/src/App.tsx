
import './App.css'

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetails from './components/ProductDetails'
function App() {
 
  return (
  <>
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
  </Router>

  </>
  )
}

export default App
