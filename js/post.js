const params = new URLSearchParams(window.location.search);

const type = params.get("type");

const postTitle = document.querySelector("#postTitle");

if (type === "lost") {
    postTitle.textContent = "Report a Lost Item";
}

if (type === "found") {
    postTitle.textContent = "Report a Found Item";
}