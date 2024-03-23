document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const errorContainer = document.getElementById("errorContainer");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("loginUserName").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    // Basic input validation
    if (!email || !password) {
      showToast("Please enter both email and password.",'error');
      return;
    }
    // use fetch api
    try {
      showToast('Loading.....')
      const response = await fetch(
        "https://pacifique-mybrand-endpoints.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to login");
      }
      // Extract the JWT token from the response
      const { token, role } = await response.json();

      console.log("token:", token);
      console.log("role:", role);
     
      // Store the token in localStorage
      localStorage.setItem("token", token);
    

      if (role === "admin") {
        localStorage.setItem("Role", role);
        setTimeout(() => {
          window.location.href = "./dashboard/dashaddblog.html";
        });
      } else {
        localStorage.setItem("Role", role);
        window.location.href = "./blogs.html";
      }
    } catch (error) {
      console.error("Error during login:", error);
      showError(error.message || "Failed to login. Please try again.");
    }
  });

  // Function to display error message
  function showError(message) {
    errorContainer.textContent = message;
    errorContainer.style.display = "block";
  }
});
const CheckLoggedInUser = async()=>{
  try {
    const role = localStorage.getItem("Role");
    if(role ==='admin'){
      document.getElementById('dashboard').style.display='block'
      document.getElementById('login').style.display ='none'
      document.getElementById('hidden').style.display ='none'
    }else if(role ==='user'){
      document.getElementById('userdashboard').style.display='block'
      document.getElementById('login').style.display ='none'
      document.getElementById('hidden').style.display ='none'
    }else{
      document.getElementById('login').style.display ='block'
      document.getElementById('userdashboard').style.display='none'
      document.getElementById('dashboard').style.display='none'
    }
  } catch (error) {
    
  }
}

const logout = () => {
  // Clear the authentication token from local storage
  localStorage.removeItem("token");
  localStorage.removeItem("Role");
  // setTimeout(()=>{

  // })
  // Redirect the user to the login page or update UI to reflect logged out state
  // For example, you can redirect to the login page
  window.location.href = "../login.html"; // Change the URL to your login page
};
const navigateToDashboard = ()=>{
  window.location.href='./dashboard/dashaddblog.html'
}

function showToast(message, type = "success", duration = 10000) {
  const toast = document.getElementById("toastNotification");
  toast.textContent = message;
  toast.classList.add("show", type); // Add 'type' class for styling
  setTimeout(() => {
    toast.classList.remove("show", type);
  }, duration);
}
