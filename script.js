const popup = document.querySelector("#popup");

const photoSlides = [
    {
        image: "fotos/foto-1.jpg",
        phrase: "Lollapalooza"
    },
    {
        image: "fotos/foto-2.jpg",
        phrase: "Riviera"
    },
    {
        image: "fotos/foto-3.jpg",
        phrase: "Formatura"
    },
    {
        image: "fotos/foto-4.jpg",
        phrase: "SubAstor"
    }
];

let currentPhoto = 0;

function closePopup() {
    popup.classList.add("hidden");
    popup.innerHTML = "";
}

function app(name) {
    popup.classList.remove("hidden");

    const contents = {
        mensagens: `
            <button class="close" onclick="closePopup()">×</button>
            <h2>Uma mensagem 💬</h2>
            <p>Feliz aniversário, Isa! 💛</p>
            <p>Espero que você aproveite muito o seu aniversário aí na Itália. Estou ansiosa para comemorar com você por aqui também!</p>
        `,

        fotos: `
            <button class="close" onclick="closePopup()">×</button>
            <h2>Fotos 📷</h2>

            <div class="photo-viewer">
                <button class="arrow left" onclick="changePhoto(-1)">‹</button>

                ${photoSlides.map((photo, index) => `
                    <div class="photo-card ${index === 0 ? "active" : ""}">
                        <img src="${photo.image}" alt="Foto ${index + 1}">
                        <div class="photo-caption">${photo.phrase}</div>
                    </div>
                `).join("")}

                <button class="arrow right" onclick="changePhoto(1)">›</button>
            </div>

            <div class="dots">
                ${photoSlides.map((_, index) =>
                    `<span class="dot ${index === 0 ? "active" : ""}"></span>`
                ).join("")}
            </div>
            <div class="note">
                <p> Por muitos mais momentos com você 🩷 </p>
            </div>
        `,

        musica: `
            <button class="close" onclick="closePopup()">×</button>
            <h2>Música 🎵</h2>
            <p></p>


            <iframe
                class="youtube"
                src="https://www.youtube.com/embed/KZeI9I875Ig"
                title="música"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>

        `,

        memorias: `
            <button class="close" onclick="closePopup()">×</button>
            <h2>Calendário 🎂</h2>
            <p>Hoje é seu aniversario! muito guarana muitos doces para você</p>

            <img
                class="birthday-photo"
                src="fotos/aniversario.jpg"
                alt="Foto do aniversário de outro ano">

            <p>Que esse novo ano venha cheio de coisas boas !!✨</p>
            <audio id="birthday-audio" autoplay>
                    <source src="musicas/aniversario.mp3" type="audio/mpeg">
                </audio>

        `,

        carta: `
            <button class="close" onclick="closePopup()">×</button>
            <h2>Uma carta 💌</h2>
            <p>Isinha, só tenho o que te agradecer pela nossa amizade por todos esses anos! É um privilégio ter crescido com você! Estar com você faz tudo ficar melhor!</p>
            <p>Que essa nova fase da sua vida seja cheia de coisas boas, sonhos realizados, conquistas, risadas e momentos inesquecíveis. Que você continue sendo essa pessoa incrível que eu tenho a sorte de conhecer há tantos anos.</p>
            <p>Te desejo toda a felicidade do mundo. Que seu novo ano seja lindo, leve e muito especial, assim como você merece. Feliz aniversário! 💖✨</p>
            `,

        presente: `
            <button class="close" onclick="closePopup()">×</button>
            <h2>Seu presente 🎁</h2>
            <p>Animada para te dar quando você chegar!...</p>
        `
    };

    popup.innerHTML = contents[name];

    if (name === "memorias") {
        const audio = document.querySelector("#birthday-audio");

        if (audio) {
            audio.play().catch(error => {
                console.log("O navegador bloqueou o autoplay:", error);
            });
        }
    }
    if (name === "fotos") {
        currentPhoto = 0;
    }
}

function changePhoto(direction) {
    const cards = document.querySelectorAll(".photo-card");
    const dots = document.querySelectorAll(".dot");

    if (!cards.length) return;

    cards[currentPhoto].classList.remove("active");
    dots[currentPhoto].classList.remove("active");

    currentPhoto = (currentPhoto + direction + cards.length) % cards.length;

    cards[currentPhoto].classList.add("active");
    dots[currentPhoto].classList.add("active");
}
