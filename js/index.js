/* SCRIPTS PRINCIPAIS DO TEMA */

// Inicializando Google Firebase
/***********************************************/
/* TROQUE AS LINHAS ABAIXO PELAS CONFIGURAÇÕES */
/*         DO SEU PRÓPRIO FIREBASE!!!          */
/***********************************************/
var firebaseConfig = {
    apiKey: "AIzaSyBjIu9sqy2ljlMiHX9tDJuRREBcasUILDM",
    authDomain: "app-teste-botafogo.firebaseapp.com",
    databaseURL: "https://app-teste-botafogo.firebaseio.com",
    projectId: "app-teste-botafogo",
    storageBucket: "",
    messagingSenderId: "1015262688033",
    appId: "1:1015262688033:web:5da88144dc8fc668e44460"
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);

// Inicializa Firestore
var db = firebase.firestore();

// Inicializa provedor de login
var provider = new firebase.auth.GoogleAuthProvider();

/* Preparação do App */
var app = {

    // Inicializa o App
    start : function(){
        console.log(' - Iniciando App...');

        // Inicializa jQuery
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

    // console.log($firebase.db);

    // Remove splash screen
    setTimeout(function(){
        $('#splash').fadeOut();
    }, 500);

    // Monitorando o botão 'menu'
    $(document).on('click', '#menu', toggleMenu);

    // Monitorando fundo do 'menu'
    $(document).on('click', '#menuModal', menuOff);

    // Monitorando rotas (cliques em links)
    // ATENÇÃO! A função de callback 'routing' depende de 'routing.js'
    $(document).on('click', 'a', routing);

    // Monitorando botões login
    $(document).on('click', 'a[href="#login"]', userLogin);

    // Monitorando botões logout
    $(document).on('click', 'a[href="#logout"]', userLogout);

    // Usuário logado ou não
    firebase.auth().getRedirectResult()
    .then(function(result) {

        // Dados do usuário logado
        var user = result.user;

        // Exibe foto na barra superior
        $('#userPhoto').html(`<img src="${user.photoURL}" alt="${user.displayName}">`);

        // Exibe perfil no menu principal
        $('#userProfile').html(`<img src="${user.photoURL}" alt="${user.displayName}"><span>${user.displayName}</span>`);
        $('#userProfileBox').show('fast');

        // Troca botões login para logout
        $('#btnLoginout').attr('href', '#logout');
        $('#btnLoginout').html('<i class="fas fa-fw fa-sign-out-alt"></i> Logout / Sair');

      }).catch(function(error) {
        console.log('Oooops! ', error);
      });
}

// Mostra / oculta menu principal
function toggleMenu(){
    if($('nav').attr('class') == 'menuOn'){ // Se o menu está visível
        menuOff(); // Oculta o menu
    } else { // Se o menu está oculto
        menuOn(); // Exibe o menu
    }
    return false;
}

// Mostra menu
function menuOn(){
    $('#wrapMenu').show(0, function(){ // Mostra menu
        $('#menu').addClass('rotateBtn'); // Aplica rotação no botão
        $('#menuModal').fadeIn('slow'); // Exibir o fundo
        $('nav').addClass('menuOn'); // Desliza menu para dentro da viewport 
    });
}

// Oculta Menu
function menuOff(){
    $('#menu').removeClass('rotateBtn'); // Remove rotação do botão
    $('nav').removeClass('menuOn'); // Desliza menu para fora da viewport
    $('#menuModal').fadeOut('slow'); // Oculta o fundo do menu
    setTimeout(function(){ // Dispara timer
        $('#wrapMenu').hide(0); // Oculta menu
    }, 700); // Após 700 milissegundos
}

// Função padrão para 'sanitizar' os valores dos campos de formulário
function sanitiza(texto) { 
	// Limpa espaços antes e depois da string
	texto = texto.trim();

	// Limpa espaços duplicados dentro da string
	while(texto.indexOf('  ') != -1) // 'TRUE' enquanto ocorrerem espaços duplos
		texto = texto.replace('  ', ' '); // Troca espaços duplos por simples

	// Altera caracteres indesejados (usando expressão regular) pelo 'HTML entitie' equivalente
	texto = texto.replace(/&/g, '&amp;'); /* Caractere '&' */
	texto = texto.replace(/</g, '&lt;'); /* Caractere '<' */
	texto = texto.replace(/>/g, '&gt;'); /* Caractere '>' */
	texto = texto.replace(/"/g, '&quot;'); /* Caractere '"' */

	// Retorna string 'limpa'
	return texto;
}

// Função para validar somente letras em campos de formulários (usando expressão regular e match())
function soLetras(texto) { 
    if(texto.match(/[^a-zà-ú ]/gi))
        return false;
    return true;
}

// Função para validar um endereço de e-mail(usando expressão regular e match())
function isMail(texto) { 
    if(texto.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]{2,}$/))
        return true;
	return false;
}

// Obtém a data local formata como 'YYYY-MM-DD HH:II:SS'
function agora(){
    agora = new Date();
    y = agora.getFullYear();
    m = agora.getMonth() + 1;
    if(m < 10) m = '0'+m;
    d = agora.getDate();
    if(d < 10) d = '0'+d;
    h = agora.getHours();
    if(h < 10) h = '0'+h;
    i = agora.getMinutes();
    if(i < 10) i = '0'+i;
    s = agora.getSeconds();
    if(s < 10) s = '0'+s;
    return `${y}-${m}-${d} ${h}:${i}:${s}`;
}

// Login de usuário
function userLogin(){
    firebase.auth().signInWithRedirect(provider);
}

// Logout de usuário
function userLogout(){
    firebase.auth().signOut()
    .then(function() {

        // Exibe foto anônimo na barra superior
        $('#userPhoto').html(`<img src="img/nouser.png" alt="Logue-se">`);
        $('#userProfileBox').hide('fast');

        // Troca botões logout para login
        $('#btnLoginout').attr('href', '#login');
        $('#btnLoginout').html('<i class="fas fa-fw fa-sign-in-alt"></i> Login / Entrar');

    })
    .catch(function(error) {
        console.log('erro ao deslogar usuário');
    });
}

// Executa o App
app.start();