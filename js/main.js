// Get
let elUsersWrapper = document.querySelector(".users__wrapper");
let elUsersTotal = document.querySelector(".total__users");
let elPostsTotal = document.querySelector(".total__posts");
let elCommentsTotal = document.querySelector(".total__comments");
let elPostsWrapper = document.querySelector(".posts__wrapper");
let elCommentsWrapper = document.querySelector(".comment__wrapper");
let elTempUsers = document.querySelector("#user__template").content;
let elTempPosts = document.querySelector("#post__template").content;
let elTempComments = document.querySelector("#comment__template").content;


function renderUsers(array) {
    elUsersTotal.innerHTML = array.length;
    elUsersWrapper.innerHTML = null;
    elCommentsWrapper.innerHTML = null;
    let newFragment = document.createDocumentFragment();

    for (const item of array) {
        let newLi = elTempUsers.cloneNode(true);

        newLi.querySelector(".user__link").innerHTML = `<p class="user__name>Name:${item.name}</p>
        <p class="user__username">Username:${item.username}</p>
        <p class="user__website link">website:${item.website}</p>
        <a class="user__email text-reset text-primary" href="mailto:${item.email}">Email:${item.email}</a>`;
        newLi.querySelector(".user__link").dataset.userId = item.id;

        newFragment.appendChild(newLi);
    }

    elUsersWrapper.appendChild(newFragment);
}

function renderPosts(array) {

    elPostsTotal.innerHTML = array.length;
    elPostsWrapper.innerHTML = null;
    elCommentsWrapper.innerHTML = null;
    let newFragment = document.createDocumentFragment();

    for (const item of array) {
        let newLi = elTempPosts.cloneNode(true);

        newLi.querySelector(".post__link").dataset.postId = item.id;
        newLi.querySelector(".post__link").textContent = item.title;
        newLi.querySelector(".post__body").textContent = item.body;

        newFragment.appendChild(newLi);
    }

    elPostsWrapper.appendChild(newFragment);
}

function renderComments(array) {

    elCommentsTotal.innerHTML = array.length;
    elCommentsWrapper.innerHTML = null;
    let newFragment = document.createDocumentFragment();

    for (const item of array) {
        let newLi = elTempComments.cloneNode(true);
        newLi.querySelector(".comment__name").textContent = item.name;
        newLi.querySelector(".comment__body").textContent = item.body;
        newLi.querySelector(".comment__email").textContent = item.email; 
        newLi.querySelector(".comment__email").href = `
        mailto: //${item.email}`;

        newFragment.appendChild(newLi);
    }

    elCommentsWrapper.appendChild(newFragment);
}

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => renderUsers(json))


elUsersWrapper.addEventListener("click", function (evt) {
    let datasetId = evt.target.dataset.userId;

    if (datasetId) {
        fetch(`https://jsonplaceholder.typicode.com/users/${datasetId}/posts`)
            .then(response => response.json())
            .then(json => renderPosts(json))
    }

})

elPostsWrapper.addEventListener("click", function (evt) {
    let datasetId = evt.target.dataset.postId;
    if (datasetId) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${datasetId}/comments`)
            .then(response => response.json())
            .then(json => renderComments(json))
    }
})