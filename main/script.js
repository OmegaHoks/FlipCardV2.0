// Array de cartas posibles (valores numéricos)
const cartas = [
    { nombre: "as_corazones", valor: 1 },
    { nombre: "2_corazones", valor: 2 },
    { nombre: "3_corazones", valor: 3 },
    { nombre: "4_corazones", valor: 4 },
    { nombre: "5_corazones", valor: 5 },
    { nombre: "6_corazones", valor: 6 },
    { nombre: "7_corazones", valor: 7 },
    { nombre: "8_corazones", valor: 8 },
    { nombre: "9_corazones", valor: 9 },
    { nombre: "10_corazones", valor: 10 },
    { nombre: "j_corazones", valor: 11 },
    { nombre: "q_corazones", valor: 12 },
    { nombre: "k_corazones", valor: 13 }
];

let temporizadorId;

// Función para repartir las cartas
function repartirCartas() {
    const jugadores = 2; // Número de jugadores
    const cartasRepartidas = [];

    // Generar 2 cartas aleatorias para cada jugador
    for (let i = 0; i < jugadores; i++) {
        const carta1 = cartas[Math.floor(Math.random() * cartas.length)];
        const carta2 = cartas[Math.floor(Math.random() * cartas.length)];
        cartasRepartidas.push([carta1, carta2]);
    }

    // Mostrar las cartas expuestas y ocultas (ocultas con temporizador)
    mostrarCartas(cartasRepartidas);

    // Iniciar el temporizador visible
    let tiempoRestante = 5;
    const temporizadorElement = document.getElementById("temporizador");
    temporizadorId = setInterval(() => {
        temporizadorElement.innerText = tiempoRestante;
        tiempoRestante--;
        if (tiempoRestante < 0) {
            clearInterval(temporizadorId);
            revelarCartasOcultas(cartasRepartidas);
        }
    }, 1000);
}

// Función para mostrar las cartas (inicialmente solo las expuestas)
function mostrarCartas(cartasRepartidas) {
    const contenedor = document.getElementById("cartas");
    contenedor.innerHTML = ""; // Limpiar cartas anteriores
    let resultadoTexto = "";

    // Crear y mostrar las cartas expuestas
    cartasRepartidas.forEach((cartasJugador, index) => {
        // Carta expuesta
        const cartaExpuesta = cartasJugador[0];
        const cartaDivExpuesta = document.createElement("div");
        cartaDivExpuesta.classList.add("carta");
        cartaDivExpuesta.style.backgroundImage = `url('imagenes/${cartaExpuesta.nombre}.png')`;

        // Carta oculta (inicialmente gris)
        const cartaOculta = cartasJugador[1];
        const cartaDivOculta = document.createElement("div");
        cartaDivOculta.classList.add("carta", "carta-oculta");

        contenedor.appendChild(cartaDivExpuesta);
        contenedor.appendChild(cartaDivOculta);

        // Aquí no mostramos la suma aún
        resultadoTexto += `Jugador ${index + 1}: esperando cartas...<br>`;
    }

    // Mostrar el resultado inicial sin contar las cartas ocultas
    ,document.getElementById("resultado").innerHTML = resultadoTexto);
}

// Función para revelar las cartas ocultas después de 5 segundos
function revelarCartasOcultas(cartasRepartidas) {
    const contenedor = document.getElementById("cartas");
    const resultadoTexto = [];

    // Mostrar las cartas ocultas y calcular el resultado final
    cartasRepartidas.forEach((cartasJugador, index) => {
        // Revelar carta oculta
        const cartaExpuesta = cartasJugador[0];
        const cartaOculta = cartasJugador[1];
        const cartaDivExpuesta = contenedor.children[index * 2];
        const cartaDivOculta = contenedor.children[index * 2 + 1];

        // Cambiar el fondo de la carta oculta a la imagen real
        cartaDivOculta.style.backgroundImage = `url('imagenes/${cartaOculta.nombre}.png')`;

        // Calcular la suma final
        const sumaCartas = cartaExpuesta.valor + cartaOculta.valor;
        resultadoTexto.push(`Jugador ${index + 1}: ${sumaCartas} puntos`);
    });

    // Comparar las sumas para determinar al ganador
    const sumaJugador1 = cartasRepartidas[0][0].valor + cartasRepartidas[0][1].valor;
    const sumaJugador2 = cartasRepartidas[1][0].valor + cartasRepartidas[1][1].valor;

    let ganador = "";
    if (sumaJugador1 > sumaJugador2) {
        ganador = "Jugador 1 gana!";
    } else if (sumaJugador1 < sumaJugador2) {
        ganador = "Jugador 2 gana!";
    } else {
        ganador = "¡Es un empate!";
    }

    // Mostrar el resultado final
    resultadoTexto.push(ganador);
    document.getElementById("resultado").innerHTML = resultadoTexto.join("<br>");
}
