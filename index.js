async function getPost() {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const data = await fetch(url);
  const jsonData = await data.json();
  console.log(jsonData);
  return jsonData;
}
const posts = getPost();
let postStartIndex = 0;
let currentPage = 1;
const listGroup = document.querySelector(".list-group");
function updatePost(postStartIndex) {
  posts.then((posts) => {
    posts.slice(postStartIndex, postStartIndex + 5).forEach((post) => {
      const list = document.createElement("li");
      list.innerHTML = `<p>${post.id} ${post.title}</p>`;
      listGroup.appendChild(list);
    });
  });
}
updatePost(postStartIndex);

const prev = document.querySelector("#prev");
const next = document.querySelector("#next");

next.addEventListener("click", function () {
  if (postStartIndex < 95) {
    listGroup.innerHTML = "";
    postStartIndex += 5;
    currentPage++;
    updatePost(postStartIndex);
    pagination();
  }
});
prev.addEventListener("click", function () {
  if (postStartIndex > 0) {
    listGroup.innerHTML = "";
    postStartIndex -= 5;
    currentPage--;
    updatePost(postStartIndex);
    pagination();
  }
});
const pages = document.querySelector(".pages");
function pagination() {
  pages.innerHTML = "";
  posts.then((posts) => {
    for (let index = 1; index <= posts.length / 5; index++) {
      const page = document.createElement("li");
      if (currentPage == index) {
        page.classList.add("active");
      }
      page.innerHTML = `${index}`;
      pages.appendChild(page);
    }
  });
}

pagination();

pages.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    const n = event.target.innerHTML;
    postStartIndex = 5 * n - 5;
    listGroup.innerHTML = "";
    currentPage = n;
    updatePost(postStartIndex);
    pagination();
  }
});
