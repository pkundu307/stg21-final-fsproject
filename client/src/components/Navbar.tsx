import { useState } from "react";
import profile from "../images/profile.jpg";
import cartIcon from "../images/cart.jpg";
import adminIcon from "../images/admindashboard.jpg";
import { GoogleOAuthProvider,GoogleLogin } from "@react-oauth/google";
interface GoogleOAuthResponse{
    credential:string,
    clientId:string
}
function Navbar() {
    const [dropdownOpen,setDropdownOpen]=useState(false);
    const [loginPopupOpen,setloginPopupOpen]=useState(false);

    function toggleDropdown(){
        setDropdownOpen(!dropdownOpen);
  
    }
    const handleGoogleLoginSuccess=(credentialResponse:GoogleOAuthResponse)=>{

        const {credential,clientId} = credentialResponse;

        fetch('https://localhost:5000/google_auth',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                credential,client_id:clientId
            })
        })
        .then(response=>response.json())

    }
    function handleGoogleLoginFailure(){}

  return (

    <GoogleOAuthProvider clientId="690209119477-fk2a214pckkunvqkc6c0t30t6c96p0ug.apps.googleusercontent.com">     
         <nav className="w-full container mx-auto flex items-center justify-between bg-slate-300 p-5">
        <div className="container mx-auto flex items-center justify-between ">
          <div className="flex items-center space-x-4">
            {/* logo */}
            <div className="text-black font-bold text-xl ml-3">stecom</div>
            {/* search bar */}
            <div className="flex items-center bg-gray-300 border-gray-950 rounded-md">
              <input
                type="text"
                placeholder="search🔎"
                className="rounded-md bg-gray-100 px-2 py-2 focuos:outline-none"
              />
              <div className="p-2">Search</div>
            </div>
          </div>
          <div className=" border-b-grey-800 space-x-3">
            <button
            onClick={toggleDropdown}
            >
              <img src={profile} className="w-9 h-9 rounded-full " />
            </button>
            <button>
              <img src={cartIcon} className="w-9 h-9 rounded-full " />
            </button>
            <button>
              <img src={adminIcon} className="w-15 h-9 rounded-full " />
            </button>
          </div>
        </div>
        {/* dropdown menu */}

      </nav>
      {
    loginPopupOpen && 
    <GoogleLogin 
    onSuccess={handleGoogleLoginSuccess}
    onError={handleGoogleLoginFailure}
    ></GoogleLogin>
}
      {dropdownOpen &&  <div className="abosolut right-0 mt-2 w-50 bg-white rounded-md shadow-xl py-2">
            <a href="#" className="block px-4 py-2" onClick={()=>{
                setloginPopupOpen(!loginPopupOpen);
  
            }}>
                Login
            </a>
            <a href="#" className="block px-4 py-2">
                profile
            </a>
            <a href="#" className="block px-4 py-2">
                Logout
            </a>
        </div>}

        {/* login popup */}

      </GoogleOAuthProvider>

  );
}

export default Navbar;
