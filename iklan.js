document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('videoPlayer');
    const videoSrc = 'https://vz-8c4bc4de-841.b-cdn.net/6366cd8e-dca0-4160-8b44-ffed44b30ce8/playlist.m3u8';
    const overlay = document.getElementById('adOverlay');
    const adVideo = document.getElementById('adVideo');
    const closeBtn = document.getElementById('closeAdBtn');

    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
    }

    let adInterval = 900; // 15 menit
    let nextAdTime = adInterval;

    video.addEventListener('timeupdate', () => {
        if (video.currentTime >= nextAdTime) {
            nextAdTime += adInterval;
            showAdOverlay();
        }
    });

    function showAdOverlay() {
        video.pause();
        overlay.style.display = 'flex';
        adVideo.currentTime = 0;
        adVideo.play();

        closeBtn.disabled = true;
        closeBtn.classList.remove('enabled');
        let closeTimer = 15;
        closeBtn.innerText = `Tutup Iklan (${closeTimer})`;

        const timerInterval = setInterval(() => {
            closeTimer--;
            closeBtn.innerText = `Tutup Iklan (${closeTimer})`;
            if (closeTimer <= 0) {
                clearInterval(timerInterval);
                closeBtn.innerText = 'Tutup Iklan';
                closeBtn.disabled = false;
                closeBtn.classList.add('enabled');
            }
        }, 1000);

        adVideo.onended = () => {
            hideAdOverlay();
        };

        closeBtn.onclick = () => {
            if (!closeBtn.disabled) {
                hideAdOverlay();
            }
        };
    }

    function hideAdOverlay() {
        overlay.style.display = 'none';
        adVideo.pause();
        video.play();
    }
});
