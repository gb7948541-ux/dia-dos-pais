// ========================================
// HOMENAGEM DE DIA DOS PAIS ❤️
// De: nós três
// ========================================

const cenas = [
    {
        imagem: "assets/assets/foto1.jpg",
        texto: "Pai... hoje não é apenas um dia para dizer: Feliz Dia dos Pais."
    },

    {
        imagem: "assets/assets/foto2.jpg",
        texto: "É um dia para lembrar o quanto você é importante para nós."
    },

    {
        imagem: "assets/assets/foto3.jpg",
        texto: "Por tudo que você fez, por tudo que ensinou e por todos os momentos que vivemos juntos."
    },

    {
        imagem: "assets/assets/foto4.jpg",
        texto: "Talvez nem sempre a gente consiga falar..."
    },

    {
        imagem: "assets/assets/foto5.jpg",
        texto: "Mas existe algo que nunca muda: nós somos muito gratos por ter você. ❤️"
    }
];

// ========================================
// ELEMENTOS
// ========================================

const inicio = document.getElementById("inicio");
const video = document.getElementById("video");
const final = document.getElementById("final");

const foto = document.getElementById("foto");
const texto = document.getElementById("texto");

const indicadores = document.getElementById("indicadores");

const musica = document.getElementById("musica");

const btnComecar = document.getElementById("btnComecar");

// ========================================
// CONFIGURAÇÕES
// ========================================

let cenaAtual = 0;

const tempoCena = 6000;

let timer;

// ========================================
// INDICADORES
// ========================================

function criarIndicadores() {

    indicadores.innerHTML = "";

    cenas.forEach((_, index) => {

        const indicador = document.createElement("div");

        indicador.classList.add("indicador");

        if (index === 0) {
            indicador.classList.add("ativo");
        }

        indicadores.appendChild(indicador);

    });
}

// ========================================
// MOSTRAR CENA
// ========================================

function mostrarCena(index) {

    if (index >= cenas.length) {
        terminarVideo();
        return;
    }

    const cena = cenas[index];

    // Remove as animações anteriores
    foto.classList.remove("mostrar");
    texto.classList.remove("mostrar");

    // Pequeno intervalo entre as cenas
    setTimeout(() => {

        foto.src = cena.imagem;
        texto.textContent = cena.texto;

        foto.classList.add("mostrar");

        // Texto entra depois da foto
        setTimeout(() => {
            texto.classList.add("mostrar");
        }, 700);

    }, 400);

    // Atualiza os indicadores
    const todosIndicadores =
        document.querySelectorAll(".indicador");

    todosIndicadores.forEach((item, i) => {

        item.classList.toggle(
            "ativo",
            i === index
        );

    });

    // Agenda próxima cena
    clearTimeout(timer);

    timer = setTimeout(() => {

        cenaAtual++;

        mostrarCena(cenaAtual);

    }, tempoCena);
}

// ========================================
// BOTÃO COMEÇAR
// ========================================

btnComecar.addEventListener("click", () => {

    // Evita clicar duas vezes
    btnComecar.disabled = true;

    // Esconde a abertura
    inicio.style.opacity = "0";

    setTimeout(() => {

        inicio.style.display = "none";

        video.classList.add("ativo");

    }, 1000);

    // ====================================
    // MÚSICA
    // ====================================

    musica.volume = 1;

    musica.currentTime = 0;

    musica.play()
        .then(() => {

            console.log("🎵 Música iniciada!");

        })
        .catch((erro) => {

            console.log(
                "Erro ao iniciar música:",
                erro
            );

        });

    // ====================================
    // INICIA INDICADORES
    // ====================================

    criarIndicadores();

    // ====================================
    // PRIMEIRA CENA
    // ====================================

    cenaAtual = 0;

    mostrarCena(cenaAtual);

});

// ========================================
// FINAL
// ========================================

function terminarVideo() {

    clearTimeout(timer);

    video.classList.remove("ativo");

    setTimeout(() => {

        final.classList.add("mostrar");

    }, 1200);
}
