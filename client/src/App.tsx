
import './App.css'
import { Provider,useDispatch,useSelector } from 'react-redux'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
import store from './redux/store'
function App() {
 
  return (
  <>
  <Provider store={store}>

  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path='/cart' element={<Cart/>}/>
    </Routes>
  </Router>

  </Provider>
  </>
  )
}

export default App
