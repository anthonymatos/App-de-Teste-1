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

    // Executa o App
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

}

// Mostra / oculta menu
function toggleMenu(){
    
    if($('nav').attr('class') == 'menuOn'){ // Se o menu está visível
        $('nav').removeClass('menuOn'); // Remove a classe que exibe o menu
        $('#menuModal').fadeOut('fast'); // Oculta o fundo do menu
    } else { // Se o menu está oculto
        $('#menuModal').fadeIn('fast'); // Exibir o fundo
        $('nav').addClass('menuOn'); // Adicionando a classe que exibe o menu
    }


}

// Chama a aplicação quando for carregada
app.start();