document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  try {
    const token = localStorage.getItem("token");
    // const role = localStorage.getItem('adminRole');

    // Check if the token exists
    if (!token) {
      throw new Error("Token not found in localStorage");
    }
    // Fetch the user data corresponding to the provided ID from the backend
    const response = await fetch(`https://pacifique-mybrand-endpoints.onrender.com/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user for editing");
    }

    const resObj = await response.json();
    const userToUpdate = resObj.data;
    console.log(resObj.data);
    console.log(userToUpdate.names, userToUpdate.email, userToUpdate.password);

    // Populate the edit form with the fetched user data
    document.getElementById("editusername").value = userToUpdate.names;
    document.getElementById("edituseremail").value = userToUpdate.email;
    document.getElementById("edituserpassword").value = userToUpdate.password;
  } catch (error) {
    console.error("Error fetching bookmark for editing:", error);
  }

  // Add event listener for the edit form submission
  document
    .getElementById("editUserForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const names = document.getElementById("editusername").value;
      const email = document.getElementById("edituseremail").value;
      const password = document.getElementById("edituserpassword").value;

      const updatedUser = {
        names: names,
        email: email,
        password: password,
      };
      try {
        const token = localStorage.getItem("token");
        // const role = localStorage.getItem('adminRole');

        // Check if the token exists
        if (!token) {
          throw new Error("Token not found in localStorage");
        }
        // Update the user with the new data
        const response = await fetch(`https://pacifique-mybrand-endpoints.onrender.com/users/${id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        });

        if (!response.ok) {
          throw new Error("Failed to update user");
        }

        // Redirect to the bookmarks page after successful update
        window.location.href = "users.html";
      } catch (error) {
        console.error("Error updating user:", error);
      }
    });
});
