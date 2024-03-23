


let messagesData = [];


const fetchMessages = async () => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('adminRole');
    console.log(token,role)
    // Check if the token exists
    if (!token) {
      throw new Error('Token not found in localStorage');
    }
    // Fetch bookmarks with the token included in the request headers
    const response = await fetch("https://pacifique-mybrand-endpoints.onrender.com/messages",{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }
    // Extract bookmarks data from the response
    const dataObj = await response.json();
    messagesData = dataObj.data;
    console.log('data:', messagesData)
    displayMessages();
  } catch (error) {
    console.log("Error while fetching messages:", error);
  }
};

// function to create a blog element
const createMessageElement = (message) => {
  let messageElement = document.createElement("tr");

  
  messageElement.innerHTML = `
  
  <td>${message.names} </td>
  <td class="tdemail">${message.email} </td>
  <td class="tdmessage">${message.message} </td>
  <td class="action-buttons">
          <img src="../images/formicon/reply.png" alt="" onclick="replyToUser('${message.email}')">
          <img src="../images/formicon/trash.png" alt="" onclick="deleteMessage('${message._id}')">
  </td>
  `;
  return messageElement;
};

// function to display blogs
const displayMessages = () => {
  let messagesList = document.getElementById("message-table");
  messagesList.innerHTML = "";

  if (!Array.isArray(messagesData) || messagesData.length === 0) {
    messagesList.innerHTML = "You do not have messages yet";
    return;
  }
  messagesData.forEach((message) => {
    let messageElement = createMessageElement(message);
    messagesList.appendChild(messageElement);
  });
};
// Function to reply to a user by email
const replyToUser = (email) => {
  // Construct the Gmail URL with the recipient email pre-filled
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
  
  // Open the Gmail URL in a new tab
  window.open(gmailUrl, '_blank');
};

// Function to delete a user
const deleteMessage = async (id) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // Check if the token exists
    if (!token) {
      throw new Error('Token not found in localStorage');
    }
    showToast('Deleting.....')
    const response = await fetch(`https://pacifique-mybrand-endpoints.onrender.com/messages/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete message');
    }

    // Optionally, you can handle the response after a successful deletion
    const deletedData = await response.json();
    console.log('message deleted successfully:', deletedData);
    showToast('message deleted successfully!')
    // Refresh users after deleting
    fetchMessages();
  } catch (error) {
    console.error('Error deleting message:', error.message);
  }
};

function showToast(message, type = "success", duration = 3000) {
  const toast = document.getElementById("toastNotification");
  toast.textContent = message;
  toast.classList.add("show", type); // Add 'type' class for styling
  setTimeout(() => {
    toast.classList.remove("show", type);
  }, duration);
}




































// let messagedata = JSON.parse(localStorage.getItem("smsobject")) || []
// // [
// //   {
// //     id: 10,
// //     name: "pacifique",
// //     email: "pacifiquemboni@gmail.com",
// //     message: "i need to hire you mr developer",
// //   },
// // ];

// function readMessage() {
//   localStorage.setItem("smsobject", JSON.stringify(messagedata));
//   var tabledata = document.getElementById("message-table");

//   var objectdata = JSON.parse(localStorage.getItem("smsobject"));
//   var smselements = "";

//   if (objectdata.length == 0) {
//     document.getElementById("smsError").innerHTML = "There is no messages";
//     return;
//   }
//   objectdata.forEach((record) => {
//     smselements += ` <tr>
//               <td>${record.name}</td>
//               <td>${record.email}</td>
//               <td>${record.message}</td>
//               <td class="action-buttons">
//                 <img src="images/formicon/reply.png" alt="" onclick="edit(${record.id})">
//                 <img src="images/formicon/Trash.png" alt=""onclick="delet(${record.id})">
//               </td>

//               </tr>
//       `;
//   });
//   tabledata.innerHTML = smselements;
// }

// function addMessage(){
//   var name = document.getElementById('contactUserName').value;
//   var email = document.getElementById('contactEmail').value;
//   var message = document.getElementById('message').value;

//   let randomNumber = Math.floor(Math.random() * 101);

//   var id = randomNumber;
//   var newobj = { id: id, name: name, email: email, message:message };
//   messagedata.push(newobj);

//   location.reload();
//   readMessage();

// }