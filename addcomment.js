const addComment = async (comment) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    // Make a POST request to add the comment
    const response = await fetch(`https://pacifique-mybrand-endpoints.onrender.com/comment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });

    if (!response.ok) {
      throw new Error("Failed to add comment");
    }
  } catch (error) {
    console.error(error);
    // Handle errors here
  }
};

document.getElementById("comment-form").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Extract the new comment from the input field
  const comment = document.getElementById("blogcomment").value;
  const blogid = getElementById('blogid').value;

  const newcomment = {
    blogid:blogid,
    comment:comment
  }
  await addComment(newcomment);
  
});
