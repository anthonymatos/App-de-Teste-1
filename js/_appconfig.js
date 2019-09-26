/* CONFIGURAÇÕES DO APLICATIVO */

// Consigurações da conexão com o Google Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBjIu9sqy2ljlMiHX9tDJuRREBcasUILDM",
    authDomain: "app-teste-botafogo.firebaseapp.com",
    databaseURL: "https://app-teste-botafogo.firebaseio.com",
    projectId: "app-teste-botafogo",
    storageBucket: "app-teste-botafogo.appspot.com",
    messagingSenderId: "1015262688033",
    appId: "1:1015262688033:web:5da88144dc8fc668e44460"
}

// Nome da 'key' que armasena as configurações locais
var localStorageKeyName = 'config';

// Configuração inicial do App
var initialConfig = {
    tema : 'light' // Tema inicial (light | dark)
}