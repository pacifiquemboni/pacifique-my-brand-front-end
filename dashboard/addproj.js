let projectsData = [];

// Function to upload image and retrieve image URL

const imageUpload = async () => {
  const imageInput = document.getElementById("imageInput");
  // const uploadMessage = document.getElementById("uploadImage");

  try {
    const formData = new FormData();
    formData.append("image", imageInput.files[0]);
    showToast("Uploading image...Wait for next success message", "success");
    const response = await fetch(
      "https://pacifique-mybrand-endpoints.onrender.com/api/upload/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      // console.log("image added success fully");
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to Upload Image");
    }

    const responseData = await response.json();
    // uploadMessage.innerHTML = `Image uploaded successfully, now go ahead post your blog`;
    showToast(
      "Image uploaded successfully, now go ahead post your blog",
      "success"
    );
    console.log("Image uploaded successfully:", responseData.data);
    document.getElementById("blogImage").value = responseData.data;
    document.getElementById("postbtn").style.display = "block";
  } catch (error) {
    showToast(error);
  }
};

// function to fetch project fro backend

const fetchprojects = async () => {
  try {
    // Fetch bookmarks with the token included in the request headers
    const response = await fetch(
      "https://pacifique-mybrand-endpoints.onrender.com/projects"
    );
    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
    // Extract bookmarks data from the response
    const dataObj = await response.json();
    projectsData = dataObj.data;
    displayProjects();
  } catch (error) {
    console.log("Error while fetching projects:", error);
  }
};

// Function to delete a blog
const deleteproject = async (id) => {
  try {
    // Get the modal
    const modal = document.getElementById("confirmationModal");
    modal.style.display = "block";
    // Get the confirm and cancel buttons
    const confirmButton = document.getElementById("confirmButton");
    const cancelButton = document.getElementById("cancelButton");

    confirmButton.addEventListener("click", async () => {
      // Close the modal
      modal.style.display = "none";
      const token = localStorage.getItem("token");

      // Check if the token exists
      if (!token) {
        throw new Error("Token not found in localStorage");
      }

      // Send DELETE request to delete the blog
      const response = await fetch(
        `https://pacifique-mybrand-endpoints.onrender.com/projects/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Check if deletion was successful
      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      // Refresh the list of projects after deletion
      fetchprojects();
    });
    cancelButton.addEventListener("click", () => {
      // Close the modal
      fetchprojects();
      modal.style.display = "none";
    });
  } catch (error) {
    console.error("Error deleting project:", error.message);
  }
};

// function to create a project element in dashboard
const createProjectElement = (project) => {
  let projectElement = document.createElement("div");
  projectElement.classList.add("card");
  projectElement.innerHTML = `

  
              <img src="${project.image}" alt="Project Image" class="proj-img" />
              <div class="card-content">
                <h2 class="card-title">${project.name}</h2>
                <p class="card-description">
                ${project.description}
                </p>
                <p class="card-time">Started:${project.started}</p>
                <p class="card-time">Ended:${project.ended}</p>
                <div class="projbtn">
                <img width="64" height="20" src="https://img.icons8.com/wired/64/40C057/edit.png" alt="edit" onclick="navigateToBlogEditForm('${project._id}')"/>
                
                <img width="60" height="20" src="https://img.icons8.com/sf-black-filled/64/FA5252/filled-trash.png" alt="filled-trash" onclick="deleteproject('${project._id}')"/>
                
                </div>
              </div>
 

  `;
  return projectElement;
};

// function to display projects in dashboard
const displayProjects = () => {
  let projectsList = document.getElementById("projects-cards");
  projectsList.innerHTML = "";

  if (!Array.isArray(projectsData) || projectsData.length === 0) {
    projectsList.innerHTML = "You do not have Projectss yet";
    return;
  }
  projectsData.forEach((project) => {
    let projectElement = createProjectElement(project);
    projectsList.appendChild(projectElement);
  });
};

// function to fetch project fro backend

const fetchprojects2 = async () => {
  try {
    let projectsList = document.getElementById("myworkprojects-cards");
    setTimeout(() => {
      projectsList.innerHTML = "Loading projects please wait.........";
    });
    // Fetch bookmarks with the token included in the request headers
    const response = await fetch(
      "https://pacifique-mybrand-endpoints.onrender.com/projects"
    );
    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
    // Extract bookmarks data from the response
    const dataObj = await response.json();
    projectsData = dataObj.data;
    // displayProjects();
    displayProjects2();
  } catch (error) {
    console.log("Error while fetching projects:", error);
  }
};
// function to create a project element in my work page
const createProjectElement2 = (project) => {
  let projectElement = document.createElement("div");
  projectElement.classList.add("card");
  projectElement.innerHTML = `

  
              <img src="${project.image}" alt="Project Image" />
              <div class="card-content">
                <h2 class="card-title">${project.name}</h2>
                <p class="card-description">
                ${project.description}
                </p>
                <p class="card-time">Started:${project.started}</p>
                <p class="card-time">Ended:${project.ended}</p>
                <a href="#" class="button" onclick="navigateToMessage()">send us message</a>
              </div>
 

  `;
  return projectElement;
};
const navigateToMessage = ()=>{
  window.location.href='contact.html'
}
// function to display projects in dashboard
const displayProjects2 = () => {
  let projectsList = document.getElementById("myworkprojects-cards");
  projectsList.innerHTML = "";

  if (!Array.isArray(projectsData) || projectsData.length === 0) {
    projectsList.innerHTML = "You do not have Projects yet";
    return;
  }
  projectsData.forEach((project) => {
    let projectElement = createProjectElement2(project);
    projectsList.appendChild(projectElement);
  });
};
document.addEventListener("DOMContentLoaded", () => {
  const projectForm = document.getElementById("projectform");
  if (projectForm) {
    projectForm.addEventListener("submit", handleProjectFormSubmit);
  } else {
    console.error("Element with ID 'projectform' not found.");
  }
});

const handleProjectFormSubmit = async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  const name = document.getElementById("ProjectName").value;
  const description = document.getElementById("dashtextarea").value;
  const started = document.getElementById("started").value;
  const ended = document.getElementById("ended").value;
  const fileInput = document.getElementById("blogImage").value;

  if (!name || !description) {
    showToast(
      "Please provide both title and description for the project.",
      "error"
    );
    return;
  }
  if (!fileInput) {
    showToast("Please select an image for the project.", "error");
    return;
  }

  const proj = {
    name: name,
    description: description,
    started: started,
    ended: ended,
    image: fileInput,
  };
  await addProject(proj);
};

const addProject = async (proj) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    const response = await fetch(
      "https://pacifique-mybrand-endpoints.onrender.com/project",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proj),
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage.message);
    }

    showToast("Project posted successfully");
    fetchprojects(); // Refresh projects after adding
  } catch (error) {
    console.error("Error posting project", error);
    showToast("Project could not be posted", "error");
  }
};

// function showToast(message, type = "success", duration = 10000) {
//   const toast = document.getElementById("toastNotification");
//   toast.textContent = message;
//   toast.classList.add("show", type); // Add 'type' class for styling
//   setTimeout(() => {
//     toast.classList.remove("show", type);
//   }, duration);
// }

function showToast(message, type = "success", duration = 10000) {
  const toast = document.getElementById("toastNotification");
  toast.textContent = message;
  toast.classList.add("show", type); // Add 'type' class for styling
  setTimeout(() => {
    toast.classList.remove("show", type);
  }, duration);
}
function show() {
  document.getElementById("projectform").style.display = "block";
}
