const params = new URLSearchParams(window.location.search);

const type = params.get("type");

const postTitle = document.querySelector("#postTitle");

if (type === "lost") {
    postTitle.textContent = "Report a Lost Item";
}

if (type === "found") {
    postTitle.textContent = "Report a Found Item";
}
// Image Preview

const imageInput = document.querySelector("#itemImage");
const imagePreview = document.querySelector("#imagePreview");
const uploadText = document.querySelector(".upload-text");


imageInput.addEventListener("change", function () {

    const file = imageInput.files[0];

    if (file) {

        const imageURL = URL.createObjectURL(file);

        imagePreview.src = imageURL;

        imagePreview.style.display = "block";

        uploadText.style.display = "none";
    }

});
// Post Form

const postForm = document.querySelector("#postForm");

postForm.addEventListener("submit", function (event) {

    event.preventDefault();

    alert("Item posted successfully!");

});