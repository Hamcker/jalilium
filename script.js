let baseImageLoaded = false;

document.getElementById("baseImage").addEventListener("change", mergeImages);
document
    .getElementById("downloadButton")
    .addEventListener("click", downloadImage);

const overlayImage = new Image();
overlayImage.src = "overlay-light.png";

overlayImage.onload = function () {
    console.log("Overlay image loaded");
    if (baseImageLoaded) {
        mergeImages();
    }
};

function mergeImages() {
    const baseImageFile = document.getElementById("baseImage").files[0];

    if (baseImageFile) {
        const baseImage = new Image();
        const reader = new FileReader();

        reader.onload = function (e) {
            baseImage.src = e.target.result;
        };

        reader.readAsDataURL(baseImageFile);

        baseImage.onload = function () {
            console.log("Base image loaded");
            baseImageLoaded = true;

            if (overlayImage.complete) {
                drawImages(baseImage, overlayImage);
            } else {
                overlayImage.onload = function () {
                    drawImages(baseImage, overlayImage);
                };
            }
        };
    } else {
        alert("لطفا تصویر پایه را انتخاب کنید");
    }
}

function drawImages(baseImage, overlayImage) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = baseImage.width;
    canvas.height = baseImage.height;

    ctx.drawImage(baseImage, 0, 0);
    ctx.drawImage(overlayImage, 0, 0, baseImage.width, baseImage.height);
}

function downloadImage() {
    const canvas = document.getElementById("canvas");
    const link = document.createElement("a");
    link.download = "Jalilium.png";
    link.href = canvas.toDataURL();
    link.click();
}
