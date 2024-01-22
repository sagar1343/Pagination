async function getPost() {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const data = await fetch(url);
  const jsonData = await data.json();
  console.log(jsonData);
  return jsonData;
}
const posts = getPost();
let postStartIndex = 0;
let postEndIndex = postStartIndex + 5;

const listGroup = document.querySelector(".list-group");
function updatePost() {
  posts.then((posts) => {
    posts.slice(postStartIndex, postEndIndex).forEach((post) => {
      const list = document.createElement("li");
      list.innerHTML = `<p>${post.id} ${post.title}</p>`;
      listGroup.appendChild(list);
    });
  });
}
updatePost();

const prev = document.querySelector("#prev");
const next = document.querySelector("#next");

next.addEventListener("click", function () {
  if (postEndIndex <= 100) {
    listGroup.innerHTML = "";
    postStartIndex += 5;
    postEndIndex += 5;
    updatePost();
  } else {
    listGroup.innerHTML = `<h1>No more posts</h1>`;
  }
});
prev.addEventListener("click", function () {
  if (postStartIndex <= 100) {
    listGroup.innerHTML = "";
    postStartIndex -= 5;
    postEndIndex -= 5;
    updatePost();
  } else {
    listGroup.innerHTML = `<h1>No more posts</h1>`;
  }
});
