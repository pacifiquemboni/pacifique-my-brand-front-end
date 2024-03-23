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
    // Fetch the blog data corresponding to the provided ID from the backend
    const response = await fetch(`https://pacifique-mybrand-endpoints.onrender.com/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch blog for editing");
    }

    const resObj = await response.json();
    const blogToUpdate = resObj.data;
    console.log(resObj.data);
    console.log(blogToUpdate.title, blogToUpdate.intro, blogToUpdate.body,blogToUpdate.image);

    // Populate the edit form with the fetched blog data
    document.getElementById("editblogTitle").value = blogToUpdate.title;
    document.getElementById("editblogIntro").value = blogToUpdate.intro;
    document.getElementById("editdashtextarea").value = blogToUpdate.body;
    document.getElementById("editblogImage").value = blogToUpdate.image;
  } catch (error) {
    console.error("Error fetching bookmark for editing:", error);
  }
  // Add event listener for the edit form submission
  document
    .getElementById("editblogform")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const title = document.getElementById("editblogTitle").value;
      const intro = document.getElementById("editblogIntro").value;
      const body = document.getElementById("editdashtextarea").value;
      const image = document.getElementById("editblogImage").value;

      const updatedBlog = {
        title: title,
        intro: intro,
        body: body,
        image: image,
      };
      try {
        const token = localStorage.getItem("token");
        // const role = localStorage.getItem('adminRole');

        // Check if the token exists
        if (!token) {
          throw new Error("Token not found in localStorage");
        }
        // Update the user with the new data
        const response = await fetch(`https://pacifique-mybrand-endpoints.onrender.com/blogs/${id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBlog),
        });

        if (!response.ok) {
          throw new Error("Failed to update user");
        }

        // Redirect to the bookmarks page after successful update
        window.location.href = "./dashaddblog.html";
      } catch (error) {
        console.error("Error updating user:", error);
      }
    });
   
});
 // Function to upload image and retrieve image URL
 const imageUpload = async () => {
  const imageInput = document.getElementById('imageInput');
  const uploadMessage = document.getElementById('uploadImage');



  try {
    const formData = new FormData();
    formData.append('image', imageInput.files[0]);
    showToast('Uploading image...Wait for next success message', 'success');
    const response = await fetch('https://pacifique-mybrand-endpoints.onrender.com/api/upload/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      console.log('image added success fully')
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to Upload Image');
    }

    const responseData = await response.json();
   showToast(`Image uploaded successfully, now go ahead post your blog`)
   
  console.log('Image uploaded successfully:', responseData.data); 
  document.getElementById('editblogImage').value= responseData.data;
  } catch (error) {
    console.error(error);
  }
};
function showToast(message, type = 'success', duration = 10000) {
  const toast = document.getElementById("toastNotification");
  toast.textContent = message;
  toast.classList.add("show", type); // Add 'type' class for styling
  setTimeout(() => {
    toast.classList.remove("show", type);
  }, duration);
}