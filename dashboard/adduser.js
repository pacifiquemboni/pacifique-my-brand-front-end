let usersData = [];
let newBlogCount = 0;
const fetchUsers = async () => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    
    console.log(token)
    // Check if the token exists
    if (!token) {
      throw new Error('Token not found in localStorage');
    }
    // Fetch bookmarks with the token included in the request headers
    const response = await fetch("https://pacifique-mybrand-endpoints.onrender.com/users",{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch Users");
    }
    // Extract bookmarks data from the response
    const dataObj = await response.json();
    usersData = dataObj.data;
    
    displayUsers();
  } catch (error) {
    console.log("Error while fetching Users:", error);
  }
};

// function to create a blog element
const createUserElement = (user) => {
  let userElement = document.createElement("tr");
 // Check if the user has admin role
 const isUser = user.role === 'user';

 userElement.innerHTML = `
   <td>${user.names}</td>
   <td class="useremail">${user.email}</td>
   <td class="usepass">${user.password.slice(0, 10)}......</td>
   <td class="action-buttons">
   ${isUser ? `<img width="64" height="20" src="https://img.icons8.com/wired/64/40C057/edit.png" alt="edit"  onclick="navigateToUserEditForm('${user._id}')"/>` : '<img width="28" height="20" src="https://img.icons8.com/fluency-systems-filled/48/FA5252/delete-trash.png" alt="delete-trash"/>'}
   
     ${isUser ? `<img width="60" height="20" src="https://img.icons8.com/sf-black-filled/64/FA5252/filled-trash.png" alt="filled-trash"  onclick="deleteUser('${user._id}')"/>` : 'Admin'}
   </td>
 `;
 
  return userElement;
};

// function to display blogs
const displayUsers = () => {
  let usersList = document.getElementById("userdata_table");
  usersList.innerHTML = "";

  if (!Array.isArray(usersData) || usersData.length === 0) {
    usersList.innerHTML = "You do not have messages yet";
    return;
  }
  usersData.forEach((user) => {
    let userElement = createUserElement(user);
    usersList.appendChild(userElement);
  });
};
// Function to delete a user
const deleteUser = async (id) => {
  try {
    showToast('Deleting.....')
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // Check if the token exists
    if (!token) {
      throw new Error('Token not found in localStorage');
    }
    
    const response = await fetch(`https://pacifique-mybrand-endpoints.onrender.com/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    // Optionally, you can handle the response after a successful deletion
    const deletedData = await response.json();
    console.log('User deleted successfully:', deletedData);

    // Refresh users after deleting
    fetchUsers();
  } catch (error) {
    console.error('Error deleting user:', error.message);
  }
};

// Fetch users from the backend when the page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchUsers();
});
// adding user through dashboard
function submitForm() {
  const names = document.getElementById("signUserName").value;
  const email = document.getElementById("signEmail").value;
  const password = document.getElementById('password').value;
  const confpass = document.getElementById('password2').value;

  // Example: Sending data to the server using Fetch API
  fetch("https://pacifique-mybrand-endpoints.onrender.com/user", {
    //https://pacifique-mybrand-endpoints.onrender.com
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ names, email , password , confpass }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data sent successfully:", data);
      // You can add further actions or UI updates here
      alert("you have successfullu registered to our system")
      location.reload();
    })
    .catch((error) => {
      console.error("Error sending data:", error);
    });
}


// Function to navigate to the edit user form
const navigateToUserEditForm = (id) => {
  window.location.href = `edituser.html?id=${id}`;
};
function showToast(message, type = "success", duration = 3000, gifSrc = null) {
  const toast = document.getElementById("toastNotification");
  toast.textContent = message;
  toast.classList.add("show", type); // Add 'type' class for styling

  // Create a new element for the GIF if provided
  if (gifSrc) {
    const gifImage = document.createElement('img');
    gifImage.src = gifSrc;
    gifImage.classList.add("toast-gif");
    toast.appendChild(gifImage);
  }

  setTimeout(() => {
    toast.classList.remove("show", type);
    if (gifSrc) {
      toast.removeChild(gifImage); // Remove the GIF element
    }
  }, duration);
}
// let userdata=JSON.parse(localStorage.getItem("userInfo")) || [] ;

// // Check if the admin user is already in the userdata array
// // const isAdminUserPresent = userdata.some(user => user.email === 'admin@admin.com');

// // If the admin user is not present, add it to the array
// // if (!isAdminUserPresent) {
// //   userdata.push({id:'01', names: 'adminLogin', email:'admin@admin.com', password:'Admin@123'});
// // }

// // Update local storage with the modified userdata array
// localStorage.setItem("userInfo", JSON.stringify(userdata));
// function readUserData(){
//   localStorage.setItem("userInfo", JSON.stringify(userdata));
//    var userdatatable =document.getElementById("userdata-table");

//    var userInfo = localStorage.getItem('userInfo');
//    var userInfodata = JSON.parse(userInfo);
//    var information = "";

//    userInfodata.map(
//     (record)=>(
//       information += `<tr>

//       <td>${record.names}</td>
//       <td>${record.email}</td>
//       <td>${record.password}</td>
//       <td class="action-buttons">
//         <img src="images/formicon/Edit.png" alt="" onclick="editUser(${record.id})">
//         <img src="images/formicon/Trash.png" alt=""onclick="deleteUser(${record.id})">
//         </td>
//       </tr>`
//     )
//    );
//    userdatatable.innerHTML = information;
// }

// function addUser(){
//   var name = document.getElementById('signUserName').value;
//   var email = document.getElementById('signEmail').value;
//   var password = document.getElementById('password2').value;

//   let randomNumber = Math.floor(Math.random() * 101);

//   var id = randomNumber;
//   var newobj = { id: id, names: name, email: email, password:password };
//   userdata.push(newobj);

//   location.reload();
//   readUserData();

// }
 function createUser(){
  document.querySelector('.sign-upForm').style.display ='block'
  document.getElementById('adduserbtn').style.display ='none'
 }

function editUser(id){
  document.getElementById('adduserbtn').style.display ='none'
  document.querySelector('.sign-upEditForm').style.display ='block'

 }

//  function updateUser(){
//   var names = document.querySelector(".uname").value;
//   var email = document.querySelector(".uemail").value;

//   var password = document.querySelector(".upassword2").value;
//   var id = parseInt(document.querySelector(".id").value);

//   var index = userdata.findIndex((rec) => rec.id === id);
//   userdata[index] = { id, names, email,password };
//   document.querySelector(".sign-upForm").style.display = "none";
//   location.reload();
//   readUserData();
//  }
//  function deleteUser(id){
//   userdata = userdata.filter(rec => rec.id !== id);
//   location.reload();
//   readUserData();
// }

// function userLogin(id){
//   var username =document.getElementById('loginUserName').value;
//   var password = document.getElementById('loginPassword').value;
//   var results = document.querySelector('.results');

//   var userInfo = localStorage.getItem('userInfo');
//   if (userInfo) {
//     var data = JSON.parse(userInfo);

//     // Find the user in the array based on the username
//     var user = data.find((user) => user.email === username);
//     var id = data.find((userid)=> userid.id === id)

//     if (user) {

//       // User found, now you can perform authentication logic
//       if (user.password === password) {
//         results.innerHTML = "Authentication successful!";
//         window.location.href= `/singleuser.html?id=${id}`;
//       } else {
//         results.innerHTML = "Incorrect password";
//       }
//     } else {
//       results.innerHTML = "Fill the form please";
//     }
//   } else {
//     results.innerHTML = "Enter Valid User Credentials.";
//   }
// }
// function adminLogin(){
//   var username =document.getElementById('loginUserName').value;
//   var password = document.getElementById('loginPassword').value;
//   var results = document.querySelector('.results');

//   var userInfo = localStorage.getItem('userInfo');
//   if (userInfo) {
//     var data = JSON.parse(userInfo);

//     // Find the user in the array based on the username
//     var user = data.find((user) => user.email === username);

//     if (user && user.email === 'admin@admin.com') {
//       if (user.password === password) {
//         // Authentication successful for admin
//         results.innerHTML = "Admin authentication successful!";
//         // Redirect to admin dashboard or perform other actions
//         window.location.href = '/board.html';
//       } else  {
//         results.innerHTML = "Incorrect admin password";
//       }
//     } else if (user) {

//       // User found, now you can perform authentication logic
//       if (user.password === password) {
//         results.innerHTML = "Authentication successful!";
//         window.location.href= `/singleuser.html`;
//       } else {
//         results.innerHTML = "Incorrect password";
//       }
//     } else {
//     results.innerHTML = "Enter valid credentials.";
//   }
// }
// }
