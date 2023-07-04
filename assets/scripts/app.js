const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");

function sendHttpRequest(method, url, data) {
  return fetch(url, {
    method: method,
    body: data,
    // body: JSON.stringify(data),
    // headers: {
    //   "Content-Type": "application/json",
    // },
  }).then((response) => {
    if (response.status >= 20 && response.status < 300) {
      return response.json();
    } else {
      return response.json().then((errData) => {
        console.log(errData);
        throw new Error("Something went wrong - server-side");
      });
    }
  });
}

async function fetchPosts() {
  try {
    const responseData = await sendHttpRequest(
      "GET",
      "https://jsonplaceholder.typicode.com/posts"
    );

    const listOfPosts = responseData;

    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      postEl.querySelector("li").id = post.id;
      listElement.append(postEl);
    }
  } catch (error) {
    alert(error.message);
  }
}

async function createPost(title, content) {
  const userId = Math.random();

  const post = {
    title: title,
    body: content,
    userId: userId,
  };

  const fd = new FormData(form);
  // fd.append("title", title);
  // fd.append("body", content);
  fd.append("userId", userId);

  sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", fd);
}

fetchButton.addEventListener("click", () => {
  fetchPosts();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const enteredTitle = e.currentTarget.querySelector("#title").value;
  const enteredContent = e.currentTarget.querySelector("#content").value;

  createPost(enteredTitle, enteredContent);
});

postList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const postId = e.target.closest("li").id;
    sendHttpRequest(
      "DELETE",
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }
});

//FETCH FUNCTION

// const listElement = document.querySelector(".posts");
// const listElement = document.querySelector(".posts");
// const postTemplate = document.getElementById("single-post");
// const form = document.querySelector("#new-post form");
// const fetchButton = document.querySelector("#available-posts button");
// const postList = document.querySelector("ul");

// function sendHttpRequest(method, url, data) {
//   return fetch(url, {
//     method: method,
//     body: data,
//     // body: JSON.stringify(data),
//     // headers: {
//     //   "Content-Type": "application/json",
//     // },
//   }).then((response) => {
//     if (response.status >= 20 && response.status < 300) {
//       return response.json();
//     } else {
//       return response.json().then((errData) => {
//         console.log(errData);
//         throw new Error("Something went wrong - server-side");
//       });
//     }
//   });
// }

// async function fetchPosts() {
//   try {
//     const responseData = await sendHttpRequest(
//       "GET",
//       "https://jsonplaceholder.typicode.com/posts"
//     );

//     const listOfPosts = responseData;

//     for (const post of listOfPosts) {
//       const postEl = document.importNode(postTemplate.content, true);
//       postEl.querySelector("h2").textContent = post.title.toUpperCase();
//       postEl.querySelector("p").textContent = post.body;
//       postEl.querySelector("li").id = post.id;
//       listElement.append(postEl);
//     }
//   } catch (error) {
//     alert(error.message);
//   }
// }

// async function createPost(title, content) {
//   const userId = Math.random();

//   const post = {
//     title: title,
//     body: content,
//     userId: userId,
//   };

//   const fd = new FormData(form);
//   // fd.append("title", title);
//   // fd.append("body", content);
//   fd.append("userId", userId);

//   sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", fd);
// }

// fetchButton.addEventListener("click", () => {
//   fetchPosts();
// });

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const enteredTitle = e.currentTarget.querySelector("#title").value;
//   const enteredContent = e.currentTarget.querySelector("#content").value;

//   createPost(enteredTitle, enteredContent);
// });

// postList.addEventListener("click", (e) => {
//   if (e.target.tagName === "BUTTON") {
//     const postId = e.target.closest("li").id;
//     sendHttpRequest(
//       "DELETE",
//       `https://jsonplaceholder.typicode.com/posts/${postId}`
//     );
//   }
// });

// // const listElement = document.querySelector(".posts");
// const postTemplate = document.getElementById("single-post");
// const form = document.querySelector("#new-post form");
// const fetchButton = document.querySelector("#available-posts button");
// const postList = document.querySelector("ul");

// function sendHttpRequest(method, url, data) {
//   const promise = new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();

//     xhr.open(method, url);

//     xhr.responseType = "json";

//     xhr.onload = function () {
//       if (xhr.status >= 200 && xhr.status < 300) {
//         resolve(xhr.response);
//       } else {
//         reject(new Error("something went wrong!"));
//       }

//       resolve(xhr.response);
//       // const listOfPosts = JSON.parse(xhr.response);
//     };

//     xhr.onerror = function () {
//       reject(new Error("failed to send request!"));
//     };

//     xhr.send(JSON.stringify(data));
//   });

//   return promise;
// }

// async function fetchPosts() {
//   try {
//     const responseData = await sendHttpRequest(
//       "GET",
//       "https://jsonplaceholder.typicode.com/posts"
//     );

//     const listOfPosts = responseData;

//     for (const post of listOfPosts) {
//       const postEl = document.importNode(postTemplate.content, true);
//       postEl.querySelector("h2").textContent = post.title.toUpperCase();
//       postEl.querySelector("p").textContent = post.body;
//       postEl.querySelector("li").id = post.id;
//       listElement.append(postEl);
//     }
//   } catch (error) {
//     alert(error.message);
//   }
// }

// async function createPost(title, content) {
//   const userId = Math.random();

//   const post = {
//     title: title,
//     body: content,
//     userId: userId,
//   };
//   sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", post);
// }

// fetchButton.addEventListener("click", () => {
//   fetchPosts();
// });

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const enteredTitle = e.currentTarget.querySelector("#title").value;
//   const enteredContent = e.currentTarget.querySelector("#content").value;

//   createPost(enteredTitle, enteredContent);
// });

// postList.addEventListener("click", (e) => {
//   if (e.target.tagName === "BUTTON") {
//     const postId = e.target.closest("li").id;
//     sendHttpRequest(
//       "DELETE",
//       `https://jsonplaceholder.typicode.com/posts/${postId}`
//     );
//   }
// });

// function fetchPosts() {
//   sendHttpRequest("GET", "https://jsonplaceholder.typicode.com/posts").then(
//     (responseData) => {
//       const listOfPosts = xhr.response;

//       for (const post of listOfPosts) {
//         const postEl = document.importNode(postTemplate.content, true);
//         postEl.querySelector("h2").textContent = post.title.toUpperCase();
//         postEl.querySelector("p").textContent = post.body;
//         listElement.append(postEl);
//       }
//     }
//   );
// }
