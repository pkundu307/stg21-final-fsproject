import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "../redux/userSlice";
import { RootState } from "../redux/store";
import Navbar from "./Navbar";
import Addresses from "./Addresses";

function Profile() {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  return (
    <>
    <Navbar/>
    <div className="p-4">
      <h2 className="text-2xl font-semibold">Profile</h2>
      <div className="mt-4 ">
<img src={user.picture} alt="profile" className="w-16 h-16 rounded-full" />

<p>
<strong>Name:{user.name}</strong>
<p><strong>Email:{user.email}</strong></p>
</p>
<Addresses/>
      </div>
    </div>
    </>
    
  );
}

export default Profile;
