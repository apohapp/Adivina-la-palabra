// --- MODELO DEL JUEGO (Datos) ---
const GameModel = {
    peer: null, conn: null,
    miRol: 0, miNombre: "Jugador", nombreRival: "Rival",
    numPalabras: 1, turnoActual: 1,
    
    misPalabras: [], progresoRival: [],
    
    // Stats (Para la vista)
    stats: { score: 1250, level: 10, lives: 3, coins: 50 }
};

// --- CONFIGURACIONES ---
const MAX_ERR_LETRA = 10; const MAX_ERR_PALABRA = 3;

// --- VISTA (Manejo del DOM basado en el diseño) ---
const GameView = {
    inputs: { nombre: () => document.getElementById('input-nombre') },
    ui: {
        score: () => document.getElementById('ui-score'),
        level: () => document.getElementById('ui-level'),
        lives: () => document.getElementById('ui-lives'),
        coins: () => document.getElementById('ui-coins')
    },
    
    actualizarStats: (stats) => {
        GameView.ui.score().innerText = stats.score;
        GameView.ui.level().innerText = stats.level;
        GameView.ui.coins().innerText = stats.coins;
        GameView.ui.lives().innerText = "❤️".repeat(stats.lives);
    },
    
    dibujarRayasMultipalabra: (progreso) => {
        // Lógica para crear tarjetas coloridas para cada palabra del rival
        let html = '';
        progreso.forEach((p, i) => {
            let colorClase = (i % 2 === 0) ? 'blue' : 'pink';
            html += `
            <div class="tarjeta-palabra tarjeta-pwa ${colorClase}">
                <div class="display-palabra">${p.adivinadas.join(' ')}</div>
                <div id="teclado-p${i}" class="contenedor-rayas"></div>
            </div>`;
        });
        document.getElementById('zona-palabras-rival').innerHTML = html;
        // ... Lógica para poblar los teclados ...
    }
};

// --- CONTROLADOR (Lógica Multijugador y Juego) ---
const GameController = {
    // ... Lógica Multijugador reciclada de las versiones anteriores ...
    
    hacerIntento: (indexPalabra, letra) => {
        // Lógica para verificar acierto o error en una palabra específica del rival
        // ... (Reciclado de versiones anteriores) ...
        reproducirSonido('acierto');
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } }); // Confetti de la imagen
        // ...
        
        // Auto-Guardado después de cada turno
        GameController.autoGuardarPartida();
    },
    
    // --- LÓGICA DE RECONECCIÓN ---
    recuperarPartida: () => {
        let guardado = localStorage.getItem('funGuess_guardado');
        if(guardado) {
            GameModel.restaurarEstado(JSON.parse(guardado));
            // Iniciar PeerJS con la ID anterior
        }
    }
};

// --- SISTEMA DE SONIDOS SUTILES ---
function reproducirSonido(tipo) {
    // Sintetizador de audio interno...
}

// Inicialización
GameView.actualizarStats(GameModel.stats);