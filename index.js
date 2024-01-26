const totalPostPerPage = 5;
const listGroup = document.querySelector(".list-group");
const currentPageBtn = document.getElementById("currentPage");
const prevPageBtn = document.getElementById("prev");
const nextPageBtn = document.getElementById("next");
let n = 1; //n---> pageNumber
async function getPost() {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const data = await fetch(url);
  const posts = await data.json();
  console.log(posts);
  const totalPost = posts.length;
  return [posts, totalPost];
}
async function setUp() {
  const [posts, totalPost] = await getPost();
  const totalPages = totalPost / totalPostPerPage;
  function getPage(n) {
    listGroup.innerHTML = "";
    currentPageBtn.innerText = n;
    if (n === 1) {
      prevPageBtn.classList.add("none");
    } else {
      prevPageBtn.classList.remove("none");
      prevPageBtn.innerText = n - 1;
    }
    if (n === totalPages) {
      nextPageBtn.classList.add("none");
    } else {
      nextPageBtn.classList.remove("none");
      nextPageBtn.innerText = n + 1;
    }

    let An = (n - 1) * totalPostPerPage;
    posts.slice(An, An + totalPostPerPage).forEach((item) => {
      const list = document.createElement("li");
      list.innerHTML = `<p>${item.id} ${item.title}</p>`;
      listGroup.appendChild(list);
    });
  }

  getPage(1);

  currentPageBtn.innerText = n;
  prevPageBtn.addEventListener("click", () => {
    n--;
    getPage(n);
  });
  nextPageBtn.addEventListener("click", () => {
    n++;
    getPage(n);
  });

  const pageStart = document.getElementById("pageStart");
  const pageEnd = document.getElementById("pageEnd");
  pageStart.addEventListener("click", () => getPage(1));
  pageEnd.addEventListener("click", () => getPage(totalPages));
}
setUp();
