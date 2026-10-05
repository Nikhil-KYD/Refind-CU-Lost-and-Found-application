// Get the type from the URL
const params = new URLSearchParams(window.location.search);
const type = params.get("type");

const postTitle = document.querySelector("#postTitle");

// Change the page title
if (type === "lost") {
    postTitle.textContent = "Report a Lost Item";
}

if (type === "found") {
    postTitle.textContent = "Report a Found Item";
}


// Image preview

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


// Form submission

const postForm = document.querySelector("#postForm");

postForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const itemName =
        document.querySelector("#itemName").value.trim();

    const category =
        document.querySelector("#category").value;

    const location =
        document.querySelector("#location").value.trim();

    const description =
        document.querySelector("#description").value.trim();

    const file =
        imageInput.files[0];


    // Make sure an image was selected

    if (!file) {

        alert("Please select an image.");

        return;
    }


    // Create a unique file name

    const fileExtension =
        file.name.split(".").pop();

    const fileName =
        Date.now() + "." + fileExtension;


    // Upload image to Supabase Storage

    const { error: uploadError } =
        await supabaseClient
            .storage
            .from("item-images")
            .upload(fileName, file);


    if (uploadError) {

        console.error("UPLOAD ERROR:", uploadError);

        alert(
            "Image upload failed:\n\n" +
            uploadError.message
        );

        return;
    }


    // Get public image URL

    const { data: imageData } =
        supabaseClient
            .storage
            .from("item-images")
            .getPublicUrl(fileName);


    const imageURL =
        imageData.publicUrl;


    // Save item information to database

    const { error: databaseError } =
        await supabaseClient
            .from("items")
            .insert([
                {
                    title: itemName,
                    description: description,
                    category: category,
                    type: type,
                    location: location,
                    image_url: imageURL
                }
            ]);


    if (databaseError) {

        console.error(
            "DATABASE ERROR:",
            databaseError
        );

        alert("Item could not be saved.");

        return;
    }


    // Success

    alert("Item posted successfully!");

    postForm.reset();

    imagePreview.src = "";
    imagePreview.style.display = "none";

    uploadText.style.display = "block";
});