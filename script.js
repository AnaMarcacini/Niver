// =========================
// BOTÃO "ABRIR SURPRESA"
// =========================

const botaoAbrir = document.getElementById("botaoAbrir");

const inicio = document.getElementById("inicio");

const conteudo = document.getElementById("conteudo");

const musica = document.getElementById("musica");


botaoAbrir.addEventListener("click", function () {

    // Esconde a tela inicial
    inicio.style.display = "none";

    // Mostra o conteúdo
    conteudo.classList.remove("escondido");

    // Tenta iniciar a música
    musica.play().catch(() => {
        console.log("O navegador bloqueou o áudio.");
    });

    // Confetes
    criarConfetes();

    // Vai para o começo do conteúdo
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// =========================
// CARTA COM EFEITO DE DIGITAÇÃO
// =========================

const texto = `
Quero desejar a você um aniversário incrível.

Que esse novo ciclo traga muitos momentos felizes,
novas aventuras, sonhos realizados e pessoas especiais
ao seu lado.

Que você continue sendo essa pessoa única e especial.

E que nunca faltem motivos para comemorar,
sorrir e aproveitar cada momento da vida.

Feliz aniversário! ❤️
`;


const textoCarta = document.getElementById("textoCarta");

let indice = 0;


function escreverTexto() {

    if (indice < texto.length) {

        textoCarta.textContent += texto.charAt(indice);

        indice++;

        setTimeout(escreverTexto, 35);

    }

}


// Começa a escrever depois de um pequeno intervalo
setTimeout(escreverTexto, 1000);


// =========================
// BOTÃO DO PRESENTE
// =========================

const botaoSurpresa =
    document.getElementById("botaoSurpresa");

const surpresa =
    document.getElementById("surpresa");


botaoSurpresa.addEventListener("click", function () {

    surpresa.classList.remove("escondido");

    botaoSurpresa.style.display = "none";

    criarConfetes();

});


// =========================
// CONFETES
// =========================

function criarConfetes() {

    const quantidade = 80;

    for (let i = 0; i < quantidade; i++) {

        const confete = document.createElement("div");

        confete.textContent =
            ["🎉", "✨", "💖", "🎈", "⭐"]
            [Math.floor(Math.random() * 5)];

        confete.style.position = "fixed";

        confete.style.left =
            Math.random() * 100 + "vw";

        confete.style.top = "-30px";

        confete.style.fontSize =
            Math.random() * 20 + 15 + "px";

        confete.style.zIndex = "9999";

        confete.style.pointerEvents = "none";

        document.body.appendChild(confete);


        const duracao =
            Math.random() * 3 + 2;


        confete.animate(
            [
                {
                    transform: "translateY(0) rotate(0deg)",
                    opacity: 1
                },

                {
                    transform:
                        `translateY(110vh) rotate(720deg)`,
                    opacity: 0
                }
            ],
            {
                duration: duracao * 1000,

                easing: "ease-in"
            }
        );


        setTimeout(() => {

            confete.remove();

        }, duracao * 1000);

    }

}
