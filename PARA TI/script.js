/* =========================================================
   ELEMENTOS
========================================================= */

const btnComenzar =
    document.getElementById("btnComenzar");

const musica =
    document.getElementById("musica");

const btnCarta =
    document.getElementById("btnCarta");

const modalCarta =
    document.getElementById("modalCarta");

const cerrarCarta =
    document.getElementById("cerrarCarta");

const canvas =
    document.getElementById("canvasEspacio");

const ctx =
    canvas.getContext("2d");


/* =========================================================
   VARIABLES DEL CANVAS
========================================================= */

let ancho;

let alto;

let particulas = [];


/* =========================================================
   AJUSTAR CANVAS
========================================================= */

function ajustarCanvas() {

    ancho =
        canvas.width =
        window.innerWidth;

    alto =
        canvas.height =
        window.innerHeight;

}


/* =========================================================
   CREAR PARTICULAS
========================================================= */

function crearParticulas() {

    particulas = [];

    const cantidad =
        Math.min(
            900,
            Math.floor(
                window.innerWidth * 0.7
            )
        );


    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const angulo =
            Math.random() *
            Math.PI *
            2;


        const radio =
            Math.pow(
                Math.random(),
                .65
            ) *
            Math.min(
                window.innerWidth,
                window.innerHeight
            ) *
            .48;


        particulas.push({

            x:
                window.innerWidth / 2 +
                Math.cos(angulo) *
                radio,

            y:
                window.innerHeight * .58 +
                Math.sin(angulo) *
                radio *
                .28,

            radio:
                Math.random() *
                1.6 +
                .2,

            opacidad:
                Math.random() *
                .8 +
                .15,

            velocidad:
                Math.random() *
                .4 +
                .08,

            fase:
                Math.random() *
                Math.PI *
                2

        });

    }

}


/* =========================================================
   ANIMAR PARTICULAS
========================================================= */

function animarParticulas(tiempo) {

    ctx.clearRect(
        0,
        0,
        ancho,
        alto
    );


    const centroX =
        ancho / 2;


    const centroY =
        alto * .58;


    for (
        const p of particulas
    ) {

        const dx =
            p.x - centroX;


        const dy =
            p.y - centroY;


        const distancia =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        const angulo =
            tiempo *
            0.00004 *
            p.velocidad;


        const cos =
            Math.cos(angulo);


        const sin =
            Math.sin(angulo);


        const nuevoX =
            dx * cos -
            dy * sin;


        const nuevoY =
            dx * sin +
            dy * cos;


        p.x =
            centroX +
            nuevoX;


        p.y =
            centroY +
            nuevoY;


        const opacidad =
            Math.max(
                .04,

                p.opacidad *
                (
                    1 -
                    Math.min(
                        distancia /
                        (ancho * .7),
                        .8
                    )
                )
            );


        ctx.beginPath();


        ctx.arc(
            p.x,
            p.y,
            p.radio,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `rgba(
                80,
                225,
                255,
                ${opacidad}
            )`;


        ctx.shadowBlur =
            p.radio > 1
                ? 7
                : 2;


        ctx.shadowColor =
            "#00cfff";


        ctx.fill();

    }


    requestAnimationFrame(
        animarParticulas
    );

}


/* =========================================================
   COMENZAR
========================================================= */

btnComenzar.addEventListener(
    "click",
    function () {

        document.body.classList.add(
            "iniciado"
        );


        /*
         * La música se inicia aquí porque
         * el usuario acaba de pulsar el botón.
         */

        musica.volume = 0.35;


        musica.play()
            .catch(
                function () {

                    console.log(
                        "El navegador bloqueó la música."
                    );

                }
            );

    }
);


/* =========================================================
   ABRIR CARTA
========================================================= */

btnCarta.addEventListener(
    "click",
    function () {

        modalCarta.classList.add(
            "mostrar"
        );

    }
);


/* =========================================================
   CERRAR CARTA
========================================================= */

cerrarCarta.addEventListener(
    "click",
    function () {

        modalCarta.classList.remove(
            "mostrar"
        );

    }
);


/* =========================================================
   CERRAR AL TOCAR AFUERA
========================================================= */

modalCarta.addEventListener(
    "click",
    function (evento) {

        if (
            evento.target === modalCarta
        ) {

            modalCarta.classList.remove(
                "mostrar"
            );

        }

    }
);


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    function (evento) {

        if (
            evento.key === "Escape"
        ) {

            modalCarta.classList.remove(
                "mostrar"
            );

        }

    }
);


/* =========================================================
   CAMBIO DE TAMAÑO
========================================================= */

window.addEventListener(
    "resize",
    function () {

        ajustarCanvas();

        crearParticulas();

    }
);


/* =========================================================
   INICIALIZAR
========================================================= */

ajustarCanvas();

crearParticulas();

requestAnimationFrame(
    animarParticulas
);