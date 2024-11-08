
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

  return (
    <div>
      <h1 className='text-xl text-green-700'>Order successfully Placed on {date}/{month}/{year}</h1>
      <Link to='/'><button className='p-4 bg-red-600 rounded-md mt-7'><span className='font-semibold text-white'>CONTINUE SHOPPING</span></button></Link>
    </div>
  )
}

export default OrderSuccess
