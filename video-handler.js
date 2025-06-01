document.addEventListener("DOMContentLoaded", function () {
    const videoPlayer = document.getElementById("videoPlayer");
    const adOverlay = document.getElementById("adOverlay");
    const adVideo = document.getElementById("adVideo");
    const closeAdBtn = document.getElementById("closeAdBtn");
    const episodeTitle = document.getElementById("episodeTitle");
    const episodeButtonsContainer = document.getElementById("episodeButtons");
    const downloadBtn = document.getElementById("downloadBtn");
    const manualDownloadPopup = document.getElementById("manualDownloadPopup");
    const manualDownloadLink = document.getElementById("manualDownloadLink");

    const adLinks = window.adLinks || [];
    const episodes = window.episodes || [];

    let currentEpisode = episodes[0];
    videoPlayer.src = currentEpisode.url;
    episodeTitle.textContent = currentEpisode.title;

    episodes.forEach((episode, index) => {
        const btn = document.createElement("button");
        btn.textContent = index + 1;
        btn.classList.add("episode-button");
        if (index === 0) btn.classList.add("active");

        btn.addEventListener("click", () => {
            window.open(adLinks[Math.floor(Math.random() * adLinks.length)], "_blank");
            document.querySelectorAll(".episode-button").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            videoPlayer.src = episode.url;
            episodeTitle.textContent = episode.title;
            currentEpisode = episode;
            videoPlayer.play();
        });

        episodeButtonsContainer.appendChild(btn);
    });

    const intervalIklan = 600;
    let iklanKe = 1;
    let waktuIklanSelanjutnya = intervalIklan;

    videoPlayer.addEventListener("timeupdate", function () {
        if (videoPlayer.currentTime >= waktuIklanSelanjutnya) {
            videoPlayer.pause();
            setTimeout(() => {
                adOverlay.style.display = "flex";
                adVideo.currentTime = 0;
                adVideo.play();
            }, 100);

            let countdown = 15;
            closeAdBtn.disabled = true;
            closeAdBtn.innerText = `Tutup Iklan (${countdown})`;

            const interval = setInterval(() => {
                countdown--;
                closeAdBtn.innerText = `Tutup Iklan (${countdown})`;
                if (countdown <= 0) {
                    clearInterval(interval);
                    closeAdBtn.disabled = false;
                    closeAdBtn.innerText = "Tutup Iklan";
                }
            }, 1000);

            iklanKe++;
            waktuIklanSelanjutnya = intervalIklan * iklanKe;
        }
    });

    adVideo.addEventListener("ended", () => {
        adOverlay.style.display = "none";
        videoPlayer.play();
    });

    closeAdBtn.addEventListener("click", () => {
        if (closeAdBtn.disabled) {
            window.open("https://www.admto.online", "_blank");
        } else {
            adOverlay.style.display = "none";
            adVideo.pause();
            videoPlayer.play();
        }
    });

    adVideo.addEventListener("error", () => {
        adOverlay.style.display = "none";
        videoPlayer.play();
    });

    let clickCount = 0;
    downloadBtn.addEventListener("click", function (e) {
        e.preventDefault();
        clickCount++;
        if (clickCount < 3) {
            window.open(adLinks[Math.floor(Math.random() * adLinks.length)], "_blank");
        } else {
            if (currentEpisode && currentEpisode.url) {
                manualDownloadLink.value = currentEpisode.url;
                manualDownloadPopup.style.display = "block";
            } else {
                alert("Link download tidak tersedia.");
            }
            clickCount = 0;
        }
    });
});

function copyToClipboard() {
    const input = document.getElementById("manualDownloadLink");
    input.select();
    document.execCommand("copy");
    alert("Link telah disalin ke clipboard!");
}
