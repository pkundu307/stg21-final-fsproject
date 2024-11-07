
import './App.css'
import { Provider,useDispatch,useSelector } from 'react-redux'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
import store from './redux/store'
import Profile from './components/Profile'
import Order from './components/Order'
import OrderSuccess from './components/OrderSuccess'
import MyOrders from './components/MyOrders'
import DashboardCards from './components/AdminPanel'
import OrderList from './components/OrderListAdmin'
import IssueList from './components/IssueList'; 
import About from './components/AboutUs'
function App() {
 
  return (
  <>
  <Provider store={store}>

  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/profile' element={<Profile/>} />
      <Route path='/order' element={<Order/>} />
      <Route path='/order-success' element={<OrderSuccess/>}/>
      <Route path='/orders' element={<MyOrders/>}/>
      <Route path='/adminpanel' element={<DashboardCards/>}/>
      <Route path='/adminorder' element={<OrderList/>}/>
      <Route path='/customerissues' element={<IssueList/>} />

      <Route path='/about' element={<About/>} />



    </Routes>
  </Router>

  </Provider>
  </>
  )
}

export default App
