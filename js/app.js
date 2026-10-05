// Search

const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");

searchButton.addEventListener("click", function () {

    const searchText = searchInput.value.trim();

    if (searchText === "") {
        alert("Please enter an item to search.");
        return;
    }

    alert("You searched for: " + searchText);
});


// Lost and Found buttons

const lostButton = document.querySelector("#lostButton");
const foundButton = document.querySelector("#foundButton");

lostButton.addEventListener("click", function () {
    window.location.href = "post.html?type=lost";
});

foundButton.addEventListener("click", function () {
    window.location.href = "post.html?type=found";
});