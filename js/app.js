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

// Load recent items

const itemsContainer =
    document.querySelector("#itemsContainer");


async function loadItems() {

    const { data, error } = await supabaseClient
        .from("items")
        .select("*")
        .order("created_at", {
            ascending: false
        });


    if (error) {

        console.error("Error loading items:", error);

        itemsContainer.innerHTML =
            "<p>Could not load items.</p>";

        return;
    }


    if (data.length === 0) {

        itemsContainer.innerHTML =
            "<p>No items have been posted yet.</p>";

        return;
    }


    itemsContainer.innerHTML = "";


    data.forEach(function (item) {

        const card =
            document.createElement("div");

        card.classList.add("item-card");


        card.innerHTML = `

            <img
                src="${item.image_url}"
                alt="${item.title}"
                class="item-image"
            >

            <h3>
                ${item.title}
            </h3>

            <p>
                ${item.type} • ${item.location}
            </p>

        `;


        itemsContainer.appendChild(card);

    });

}


loadItems();