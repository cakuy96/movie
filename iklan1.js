document.addEventListener("DOMContentLoaded", function () {
            const videoPlayer = document.getElementById("videoPlayer");
            const adOverlay = document.getElementById("adOverlay");
            const adVideo = document.getElementById("adVideo");
            const closeAdBtn = document.getElementById("closeAdBtn");

            const intervalIklan = 900; // 10 menit = 600 detik
            let iklanKe = 1;
            let waktuIklanSelanjutnya = intervalIklan;

            videoPlayer.addEventListener("timeupdate", function () {
                if (videoPlayer.currentTime >= waktuIklanSelanjutnya) {
                    // Tampilkan iklan
                    videoPlayer.pause();
                    adOverlay.style.display = "flex";
                    adVideo.currentTime = 0;
                    adVideo.play();

                    // Disable tombol awal
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

                    // Hitung waktu iklan berikutnya
                    iklanKe++;
                    waktuIklanSelanjutnya = intervalIklan * iklanKe;
                }
            });

            // Jika iklan selesai, lanjutkan video
            adVideo.addEventListener("ended", () => {
                adOverlay.style.display = "none";
                videoPlayer.play();
            });

            // Jika tombol tutup diklik setelah countdown
            closeAdBtn.addEventListener("click", () => {
                adOverlay.style.display = "none";
                adVideo.pause();
                videoPlayer.play();
            });
        });
