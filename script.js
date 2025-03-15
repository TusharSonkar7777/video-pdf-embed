document.getElementById("uploadForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    let formData = new FormData();
    formData.append("pdf", document.getElementById("pdf").files[0]);
    formData.append("video", document.getElementById("video").files[0]);

    let progress = document.getElementById("progress");
    let error = document.getElementById("error");
    let downloadLink = document.getElementById("downloadLink");

    progress.style.display = "block";
    error.innerText = "";
    downloadLink.style.display = "none";

    try {
        let response = await fetch("https://tusharsonkar7.pythonanywhere.com/upload", {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            let blob = await response.blob();
            let url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = "output.pdf";
            downloadLink.style.display = "block";
            downloadLink.innerText = "Download Modified PDF";
        } else {
            let errorData = await response.json();
            error.innerText = errorData.error || "An unknown error occurred.";
        }
    } catch (err) {
        error.innerText = "Network error. Please try again.";
    }

    progress.style.display = "none";
});
