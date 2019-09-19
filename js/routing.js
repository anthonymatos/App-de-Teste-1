/* TRATAMENTO DAS ROTAS DO APP */

// Tratamento das rotas
function routing(){
    
    // Destino da rota
    var href = $(this).attr('href');

    // Target da rota
    var target = $(this).attr('target');

    var pagina = 'pages/' + href.substr(1) + '.html';

    if(target == '_none')
        return false;
    else if(target == '_blank')
        return true;
    else {
        toggleMenu();
        //$('header').slideUp('fast');
        $.get(pagina, function(htmlResposta){
            $('main').html(htmlResposta);
        });
    }
    //console.log(pagina);

    // Retorna sem fazer nada
    return false
}