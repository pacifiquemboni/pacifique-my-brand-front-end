
const fetchAllUsers = async () => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    console.log(token);
    // Check if the token exists
    if (!token) {
      throw new Error("Token not found in localStorage");
    }
    // Fetch bookmarks with the token included in the request headers
    const response = await fetch(
      "https://pacifique-mybrand-endpoints.onrender.com/users",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch Users");
    }
    // Extract bookmarks data from the response
    const dataObj = await response.json();
    usersData = dataObj.data;
    console.log(usersData.length);
    document.getElementById('allusers').innerHTML=usersData.length-1
  } catch (error) {
    console.log("Error while fetching Users:", error);
  }
};

const fetchAllBlogs = async () => {
  try {
    
    // Fetch bookmarks with the token included in the request headers
    const response = await fetch(
      "https://pacifique-mybrand-endpoints.onrender.com/blogs"
    );
    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }
    // Extract bookmarks data from the response
    const dataObj = await response.json();
    blogsData = dataObj.data;
    document.getElementById('allblogs').innerHTML= blogsData.length
    
    // displayBlogsOnBlogsPage();
  } catch (error) {
    console.log("Error while fetching blogs:", error);
  }
};

const fetchAllComments = async () => {
  try {
    
    // Fetch bookmarks with the token included in the request headers
    const response = await fetch(
      "https://pacifique-mybrand-endpoints.onrender.com/comments"
    );
    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }
    // Extract bookmarks data from the response
    const dataObj = await response.json();
    commentsData = dataObj.data;
    console.log('comments:', commentsData.length);
    document.getElementById('allcomments').innerHTML= commentsData.length
    
    // displayBlogsOnBlogsPage();
  } catch (error) {
    console.log("Error while fetching comments:", error);
  }
}
