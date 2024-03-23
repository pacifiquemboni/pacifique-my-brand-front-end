document.addEventListener("DOMContentLoaded", async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (!id) {
      throw new Error("Blog ID not found in URL parameters");
    }

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    const response = await fetch(`https://pacifique-mybrand-endpoints.onrender.com/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blog data");
    }

    const resObj = await response.json();
    const blogToPopulate = resObj.data;

    document.getElementById("title").innerText = blogToPopulate.title;
    document.getElementById("title2").innerText = blogToPopulate.title;
    document.getElementById("blog-author").innerText = blogToPopulate.author;
    document.getElementById("blogIntro").innerText = blogToPopulate.intro;
    document.getElementById("blogbody").innerText = blogToPopulate.body;
    document.getElementById("blogid").value = id;
    const blogImage = document.getElementById("blog-Image");
    const imageElement = document.createElement("img");
    imageElement.src = blogToPopulate.image;
    blogImage.appendChild(imageElement);
  } catch (error) {
    console.error(error);
    // Handle errors here
  }
});
let commentData = [];
let likesData = [];

const fetchcomments = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const token = localStorage.getItem("token");

    // Check if the token exists
    if (!token) {
      // throw new Error('Token not found in localStorage');
      showToast("Login First");
      setTimeout(() => {
        window.location.href = "./login.html";
      },1);
    }
    // Fetch comments with the blog ID included in the request URL
    const response = await fetch(`https://pacifique-mybrand-endpoints.onrender.com/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }

    // Parse the response JSON
    const dataObj = await response.json();
    commentData = dataObj.allcomment;

    // Log the received data
    console.log("Data received from server:", dataObj);

    // Store the comments data in the commentData variable

    //   // Log the content of commentData
    console.log("Content of commentData:", commentData);

    // Display the comments
    displayComments();
  } catch (error) {
    console.log("Error while fetching comments:", error);
  }
};

const createCommentElement = (comment) => {
  let commentElement = document.createElement("div");
  commentElement.classList.add("comment-results");
  commentElement.innerHTML = `
  <div class="comment-profile">
                    <img src="images/profile/mucyo.png" alt="" />
                  </div>
                  <div class="comment-name">${comment.names}</div>
                  <div class="comment-message">${comment.comment}</div>
                  <div class="comment-like">like</div>
                  <div class="comment-reply"><h1></h1></div>
                  <div class="comment-time">${comment.dateadded}</div>
  `;

  return commentElement;
};

const displayComments = () => {
  let commentList = document.getElementById("comments-list");
  commentList.innerHTML = "";
  if (!Array.isArray(commentData) || commentData.length === 0) {
    commentList.innerHTML = "You do not have comments yet";
    return;
  }
  document.getElementById("count").innerText = commentData.length;
  commentData.forEach((comment) => {
    let commentElement = createCommentElement(comment);
    commentList.appendChild(commentElement);
  });
};
const fetchLikes = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const token = localStorage.getItem("token");

    // Check if the token exists
    if (!token) {
      showToast("Login First");
      setTimeout(() => {
        window.location.href = "./login.html";
      },2000);
      return; // Exit the function if token doesn't exist
    }

    // Fetch likes with the blog ID included in the request URL
    const response = await fetch(`https://pacifique-mybrand-endpoints.onrender.com/likes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch likes");
    }

    // Parse the response JSON
    const dataObj = await response.json();
    likesData = dataObj.result;

    // Log the received data
    console.log("Data received from server likes:", dataObj);
   // Log the content of commentData
    console.log("Content of like Data:", likesData);
    // Call displayLikes function to display the fetched data
    displayLikes();
  } catch (error) {
    console.log("Error while fetching likes:", error);
  }
};

const displayLikes = () => {
  document.getElementById("countlike").innerText = likesData.length;
};

function showToast(message, type = "success", duration = 10000) {
  const toast = document.getElementById("toastNotification");
  toast.textContent = message;
  toast.classList.add("show", type); // Add 'type' class for styling
  setTimeout(() => {
    toast.classList.remove("show", type);
  }, duration);
}
