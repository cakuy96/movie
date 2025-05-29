// gantiIframe.js (CDN)
function gantiIframe(judul, url, element) {
    document.getElementById('frameEpisode').src = url;
    document.getElementById('judulEpisode').innerText = judul;

    const buttons = document.querySelectorAll('.episode-grid button');
    buttons.forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');

    const ad = adLinks[Math.floor(Math.random() * adLinks.length)];
    window.open(ad, "_blank");
}

let clickCount = 0;

function handleDownloadClick() {
    clickCount++;
    if (clickCount < 3) {
        const ad = adLinks[Math.floor(Math.random() * adLinks.length)];
        window.open(ad, "_blank");
    } else {
        const current = document.getElementById("judulEpisode").textContent.trim();
        const link = downloadLinks[current];
        if (link) {
            document.getElementById("manualDownloadLink").value = link;
            document.getElementById("manualDownloadPopup").style.display = "block";
        } else {
            alert("Link download tidak tersedia.");
        }
        clickCount = 0;
    }
}

function copyToClipboard() {
    const text = document.getElementById("manualDownloadLink").value;
    navigator.clipboard.writeText(text).then(() => {
        alert("Link telah disalin!");
    });
}

const adLinks = [
    "https://www.admto.xyz/",
    "https://www.admto.site/",
    "https://www.admto.info/",
    "https://www.admto.online/"
];

document.addEventListener("DOMContentLoaded", function () {
    const downloadBtn = document.getElementById("downloadBtn");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", function (e) {
            e.preventDefault();
            handleDownloadClick();
        });
    }
});
