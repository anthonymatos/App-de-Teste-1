/* SCRIPTS PRINCIPAIS DO TEMA */

/* Preparação do App */
var app = {

    // Inicializa o App
    start : function(){
        console.log(' - Iniciando App...');
        $(document).ready(app.config);
    },

    // Carrega e aplica as configurações do App
    config : function(){
        console.log(' - Configurando App...');
        // Configurando...
        app.run();
    },

    // Carrega o App, preparando-o para rodar
    run : function(){
        console.log(' - Executando App...');
        runApp();
    }
};

// Tratamento de eventos - Construtor do App
function runApp(){
    console.log(' - Tratando eventos...');

    // Monitorando o botão 'menu'
    $(document).on('click', '#menu', toggleMenu);

    // Monitorando fundo do 'menu'
    $(document).on('click', '#menuModal', toggleMenu);

    // Monitorando rotas (cliques em links)
    // ATENÇÃO! A função de callback 'routing' depende de 'routing.js'
    $(document).on('click', 'a', routing);
}

// Mostra / oculta menu principal
function toggleMenu(){
    if($('nav').attr('class') == 'menuOn'){ // Se o menu está visível
        $('#menu').removeClass('rotateBtn'); // Remove rotação do botão
        $('nav').removeClass('menuOn'); // Desliza menu para fora da viewport
        $('#menuModal').fadeOut('slow'); // Oculta o fundo do menu
        setTimeout(function(){ // Dispara timer
            $('#wrapMenu').hide(0); // Oculta menu
        }, 700); // Após 700 milissegundos
    } else { // Se o menu está oculto
        $('#wrapMenu').show(0, function(){ // Mostra menu
            $('#menu').addClass('rotateBtn'); // Aplica rotação no botão
            $('#menuModal').fadeIn('slow'); // Exibir o fundo
            $('nav').addClass('menuOn'); // Desliza menu para dentro da viewport 
        });
    }
}

// Executa o App
app.start();