(function () {
            var banners = document.querySelectorAll("#rotator-banners .rotator-item");
            var index = -1;

            function showNext() {
                banners.forEach(b => b.style.display = 'none');
                let next;
                do {
                    next = Math.floor(Math.random() * banners.length);
                } while (next === index);
                index = next;
                banners[index].style.display = 'block';
            }

            showNext();
            setInterval(showNext, 15000); // Ganti tiap 60 detik
        })();
