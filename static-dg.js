/**
 * Fungsi untuk menampilkan popup download manual.
 * @param {string} link - Link download yang akan ditampilkan di input.
 */
function showManualDownloadPopup(link) {
    const popup = document.getElementById('manualDownloadPopup');
    const input = document.getElementById('manualDownloadLink');
    if (popup && input) {
      input.value = link;
      popup.style.display = 'block';
    }
  }
  
  /**
   * Fungsi untuk menyalin link ke clipboard.
   */
  function copyToClipboard() {
    const copyText = document.getElementById("manualDownloadLink");
    if (!copyText) return;
  
    copyText.select();
    copyText.setSelectionRange(0, 99999); // Untuk mobile
    document.execCommand("copy");
    alert("Link telah disalin!");
  }
  
  /**
   * Fungsi untuk mengganti iframe video dan mengatur tombol aktif.
   * @param {string} judul - Judul episode atau film.
   * @param {string} url - URL iframe video.
   * @param {HTMLElement} element - Tombol yang diklik.
   */
  function gantiIframe(judul, url, element) {
    const iframe = document.getElementById('frameEpisode');
    const titleEl = document.getElementById('judulEpisode');
  
    if (iframe && titleEl && element) {
      iframe.src = url;
      titleEl.innerText = judul;
  
      const allButtons = document.querySelectorAll('.episode-grid button');
      allButtons.forEach(btn => btn.classList.remove('active'));
      element.classList.add('active');
  
      if (typeof adLinks !== "undefined") {
        const ad = adLinks[Math.floor(Math.random() * adLinks.length)];
        window.open(ad, "_blank");
      }
    }
  }
  