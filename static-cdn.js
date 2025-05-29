function copyToClipboard() {
    const text = document.getElementById("manualDownloadLink").value;
    navigator.clipboard.writeText(text).then(() => {
        alert("Link telah disalin!");
    });
}

function gantiIframe(judul, url, element) {
    document.getElementById('frameEpisode').src = url;
    document.getElementById('judulEpisode').innerText = judul;

    document.querySelectorAll('.episode-grid button').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');

    const ad = adLinks[Math.floor(Math.random() * adLinks.length)];
    window.open(ad, "_blank");
}
