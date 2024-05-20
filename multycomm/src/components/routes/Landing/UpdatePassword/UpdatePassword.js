// // src/components/routes/Home/UpdatePassword/UpdatePassword.js

// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import firebase from "firebase/app";
// import "firebase/auth";

// const UpdatePassword = () => {
//   const navigate = useNavigate();
//   const { userId } = useParams(); 
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [updateSuccess, setUpdateSuccess] = useState(false);
//   const [error, setError] = useState(null);

//   const handlePasswordUpdate = async () => {
//     try {
//       // Update the password using Firebase Authentication
//       await firebase.auth().currentUser.updatePassword(newPassword);

//       // Update the password in the backend
//       await axios.post("https://multycomm-backend.onrender.com/update-password", {
//         userId,
//         newPassword
//       });

//       // Update the state to indicate success
//       setUpdateSuccess(true);
//     } catch (error) {
//       // Handle errors
//       setError(error.message);
//     }
//   };

//   return (
//     <div>
//       {error && <p>Error: {error}</p>}
//       {updateSuccess && <p>Password updated successfully!</p>}
//       {!updateSuccess && (
//         <div>
//           <input
//             type="password"
//             placeholder="New Password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Confirm New Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           <button onClick={handlePasswordUpdate}>Update Password</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UpdatePassword;






