import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchAddresses,
  updateAddress,
  deleteAddress,
  addAddress,
} from "../redux/addressSlice";

function Addresses() {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const addresses = useSelector((state: RootState) => state.address.addresses);
  console.log(addresses,'<---');
  
  const [editId, setEditId] = useState("");

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);
  const handleAddAddress=()=>{
    console.log(newAddress);
    dispatch(addAddress(newAddress))
    setNewAddress({ street: "", city: "", state: "", postalCode: "", country: "" })
  }

const handleDelete = (_id:string)=>{
    dispatch(deleteAddress(_id))
}
const handleEdit=(address:any)=>{

    setEditId(address._id)
    setIsEditing(true)
    setNewAddress(address)

  

}
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold">Addresses</h2>

        <div className="border mb-6 p-4">
          <h3>{isEditing ? "Edit Address" : "Add Address"}</h3>
        </div>
        <div className="grid grid-cols-1 gap-4">
            {/* addnewAddress */}
          <input
            type="text"
            placeholder="street"
            className="border p-2 rounded-md"
            value={newAddress.street}
            onChange={(e) => setNewAddress({...newAddress, street: e.target.value })}
          />

          <input
            type="text"
            placeholder="City"
            className="border p-2 rounded-md"
            value={newAddress.city}
            onChange={(e) => setNewAddress({...newAddress,city: e.target.value})}
          />
          <input
            type="text"
            placeholder="State"
            className="border p-2 rounded-md"
            value={newAddress.state}
            onChange={(e) => setNewAddress({...newAddress,state: e.target.value})}

          />
          <input
            type="text"
            placeholder="Postal Code"
            className="border p-2 rounded-md"
            value={newAddress.postalCode}
            onChange={(e) => setNewAddress({...newAddress,postalCode: e.target.value})}

          />
          <input
            type="text"
            placeholder="Country"
            className="border p-2 rounded-md"
            value={newAddress.country}
            onChange={(e) => setNewAddress({...newAddress,country: e.target.value})}

          />
          <button className="bg-blue-600 text-white mt-4 rounded-sm"
          onClick={handleAddAddress}
          >
            {isEditing ? "Edit Address" : "Add Address"}
          </button>
        </div>
      {
        addresses.map((address)=>{
            return(
                <>
                <div key={address._id} className="border p-4 mb-3 rounded-md">
                  <h3>{address.street}, {address.city}, {address.state}, {address.postalCode}, {address.country}</h3>
                  <div className="justify-between space-x-4 gap-3">
                  <button
                  onClick={()=>{handleEdit(address)}}
                  ><p className="text-blue-600">Edit </p></button>
                  <button
                  onClick={()=>{handleDelete(address._id)}}
                  className="text-red-700">Delete</button>
                  </div>
             </div>
                </>
            )
        })
      }
 
      </div>
    </div>
  );
}

export default Addresses;
