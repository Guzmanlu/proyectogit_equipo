window.addEventListener("load", () => {
    const audios = document.querySelectorAll('audio');
    const mainHeader = document.querySelector('main header h2');
    const canciones = Array.from(document.querySelectorAll('ol li a'), a => a.textContent);

    audios.forEach((audio, index) => {
        audio.addEventListener('play', () => {
            audios.forEach((otroAudio, otroIndex) => {
                if (otroIndex !== index) {
                    otroAudio.pause();
                }
            });

            mainHeader.textContent = `🎵 Ahora suena: ${canciones[index]} 🎵`;
        });

        audio.addEventListener('pause', () => {
            const algunoReproduciendo = Array.from(audios).some(a => !a.paused);
            if (!algunoReproduciendo) {
                mainHeader.textContent = 'Escoge tu canción favorita y disfruta de una experiencia relajante';
            }
        });
    });
});