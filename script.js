let file;

const dropArea = document.getElementById("drop-area");
const uploadInput = document.getElementById("upload");
const browseBtn = document.getElementById("browseBtn");

// ✅ Browse button click
browseBtn.addEventListener("click", function () {
    uploadInput.click();
});

// ✅ Click anywhere on drop area
dropArea.addEventListener("click", function () {
    uploadInput.click();
});

// ✅ File selected
uploadInput.addEventListener("change", function (e) {
    handleFile(e.target.files[0]);
});

// ✅ Drag over
dropArea.addEventListener("dragover", function (e) {
    e.preventDefault();
    dropArea.classList.add("dragover");
});

// ✅ Drag leave
dropArea.addEventListener("dragleave", function () {
    dropArea.classList.remove("dragover");
});

// ✅ Drop file
dropArea.addEventListener("drop", function (e) {
    e.preventDefault();
    dropArea.classList.remove("dragover");

    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
});

// ✅ Handle file
function handleFile(selectedFile) {
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
        alert("Please select a valid image!");
        return;
    }

    file = selectedFile;

    // Show original size
    document.getElementById("originalSize").innerText =
        "Original Size: " + (file.size / 1024).toFixed(2) + " KB";

    // Reset previous
    document.getElementById("compressedSize").innerText = "";
    document.getElementById("download").style.display = "none";

    // Preview
    const reader = new FileReader();
    reader.onload = function () {
        document.getElementById("preview").src = reader.result;
    };
    reader.readAsDataURL(file);
}

// ✅ Compress image
function compressImage() {

    if (!file) {
        alert("Please upload an image first!");
        return;
    }

    const quality = Number(document.getElementById("quality").value);

    const download = document.getElementById("download");

    document.getElementById("compressedSize").innerText = "Compressing...";
    download.style.display = "none";

    new Compressor(file, {
        quality: quality,

        success(result) {

            document.getElementById("compressedSize").innerText =
                "Compressed Size: " + (result.size / 1024).toFixed(2) + " KB";

            const url = URL.createObjectURL(result);

            download.href = url;
            download.download = "compressed.jpg";
            download.style.display = "block";
            download.innerText = "Download Compressed Image";
        },

        error(err) {
            console.error(err);
            alert("Compression failed!");
        }
    });
}