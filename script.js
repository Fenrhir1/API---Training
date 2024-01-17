const container = document.getElementById("container");

async function getPost() {
  const responsePosts = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const posts = await responsePosts.json();
  return posts;
}

async function getComments() {
  const responseComments = await fetch(
    "https://jsonplaceholder.typicode.com/comments"
  );
  const comments = await responseComments.json();
  console.log(comments);
  return comments;
}

function writePostAndComments() {
  Promise.all([getPost(), getComments()]).then(([posts, comments]) => {
    posts.forEach((post) => {
      let filteredComments = comments.filter((comment) => {
        return comment.postId == post.id;
      });
      let mappedComments = filteredComments
        .map((comment) => {
          return `<div style="background-color: red">
        <span>Nome:${comment.name} </span <br>
        <span>Email:${comment.email} </span> <br>
        <span>Commento:${comment.body} </span>
        </div>`;
        })
        .join("");

      container.innerHTML += `<div class="post">
    <h1>${post.title}</h1>
    <br>
    <span>${post.body}</span> <br>
     ${mappedComments}
    </div>`;
    });
  });
}

writePostAndComments();
