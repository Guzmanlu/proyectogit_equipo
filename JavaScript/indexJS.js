window.addEventListener("load", () => {
    const audios = document.querySelectorAll('audio');
    const mainHeader = document.querySelector('main header h2');
    const canciones = Array.from(document.querySelectorAll('ol li a'), a => a.textContent);

    // 🎲 VARIABLE PARA CONTROLAR MODO ALEATORIO
    let modoAleatorio = false;

    // 🔘 CREAR BOTÓN DE MODO ALEATORIO
    const randomBtn = document.createElement('button');
    randomBtn.textContent = '🎲 Modo Aleatorio: OFF';
    randomBtn.style.marginLeft = '20px';
    randomBtn.style.padding = '5px 10px';
    randomBtn.style.cursor = 'pointer';
    randomBtn.style.color = 'black';
    randomBtn.style.backgroundColor = '#f0f0f0';
    randomBtn.style.border = '1px solid #ccc';
    randomBtn.style.borderRadius = '5px';

    document.querySelector('main header').appendChild(randomBtn);

    randomBtn.addEventListener('click', () => {
        modoAleatorio = !modoAleatorio;
        randomBtn.textContent = modoAleatorio ? '🎲 Modo Aleatorio: ON' : '🎲 Modo Aleatorio: OFF';
        randomBtn.style.backgroundColor = modoAleatorio ? '#4CAF50' : '#f0f0f0';
        randomBtn.style.color = modoAleatorio ? 'white' : 'black';
    });

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

        audio.addEventListener('ended', () => {
            if (modoAleatorio) {
                // 🎲 MODO ALEATORIO: canción al azar
                let indiceAleatorio;
                do {
                    indiceAleatorio = Math.floor(Math.random() * audios.length);
                } while (indiceAleatorio === index && audios.length > 1);

                audios[indiceAleatorio].play();
            } else {
            // 🔄 MODO NORMAL: siguiente canción en la lista
                let siguienteIndice = (index + 1) % audios.length;
                audios[siguienteIndice].play();
            }
        });
    });
});