// Array to store posts
let posts = [];

// Function to open create post popup
function openCreatePostPopup() {
  document.getElementById("createPostPopup").style.display = "block";
}

// Function to submit post
function submitPost() {
  const title = document.getElementById("postTitle").value;
  const description = document.getElementById("postDescription").value;
  const category = document.getElementById("postCategory").value;
  
  // Create post object
  const post = {
    title: title,
    description: description,
    category: category
  };
  
  // Add post to array
  posts.push(post);
  
  // Display posts
  displayPosts();
  
  // Reset input fields
  document.getElementById("postTitle").value = "";
  document.getElementById("postDescription").value = "";
  document.getElementById("postCategory").value = "";
  
  // Close popup
  document.getElementById("createPostPopup").style.display = "none";
}

// Function to display posts
function displayPosts() {
  const postsList = document.getElementById("postsList");
  postsList.innerHTML = "";
  
  posts.forEach(post => {
    const postDiv = document.createElement("div");
    postDiv.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.description}</p>
      <p><strong>Category:</strong> ${post.category}</p>
    `;
    postsList.appendChild(postDiv);
  });
}

// Function to search post
function searchPost() {
  const searchTerm = document.getElementById("searchInput").value;
  const foundPost = posts.find(post => post.title.toLowerCase() === searchTerm.toLowerCase());
  if (foundPost) {
    alert(`Post found:\nTitle: ${foundPost.title}\nDescription: ${foundPost.description}\nCategory: ${foundPost.category}`);
  } else {
    alert("Post not found.");
  }
}
