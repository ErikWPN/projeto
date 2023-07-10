// instacia jquary e evita conflito
// jQuery( function ($){
$(document).ready(function(){

    $('.olw-carousel').owlCaroseul();

    let titulso = $('h4') // tag
    
    let items = $('.faeture-item') // class
    
    let destaques = $('#featured') //id

    console.log(titulso.first());
});


    // Configuração de produtos!

    //$('.featured-item a').addClass('btn btn-dark stretch-link');

    //$('.featured-item:firt h4').append('.<span class="badge bg-secondary">Novo</span>')



        $('featued-item:first h4').dblclick( function(){

            $(this).css({
                'color' : '#f00',
                'background' : '#ff0',
                'font-weight' : '100',
            });
    
    });
    /*
    * Manipulação de eventos
    */
    $('featured-item a').on('click', function(event){

        event.preventDefault();

        alert('Produto esgotado');

    });
    // console.log$($('h4').text());
    /*
    * Callback
    * Entendendo ações que começam ao termino de outra(sequencia!)
    */
        $('featured-item:nth(1)')
            .hide(2000, function(){
            // este é callback
            console.log($(rhis).find('h4').text()+ 'Esgotato')
        })
        .show(2000, function(){
            console.log($(rhis).find('h4').text()+ 'Em Estoque')
        });

        /*
        * Animação
        */
        const duracao = 1000 // equivalente a 1 segundo
        $('featured-item:nth(0)')
            .hide(duracao)
            .show(duracao)
            .fadeOut(duracao)
            .fadeIn(duracao)
            .toggle(duracao)
            .toggle(duracao)

        $('#form-submit').on('click', function(e){

            e.preventDefault()

            if($('#email').val() !=''){

                $('#email').animate({
                    opacity: "toggle",
                    top:"-50"
                }, 500, function(){
                    console.log($(this).val())
                })
            }

        });

        /* 
        * Ouvinte de eventos .nav-modal-open
        */
    $('.nav-modal-open').on('click', function(e){

            e.preventDefault()

            let elem = $(this).attr('rel')

            $('.modal-body').html($('#'+elem).html())
            $('.modal-header h5.modal-title').html($(this).text())

            let myModal = new bootstrap.Modal($('#modalId'))

            myModal.show()

    })

    

   /* 
    * Validação do formulario
    */


    function validate(elem){
        if(elem.val() == ''){
            console.log('O campo de'+ elem.attr('name') + 'é obrigatorio')

            elem.parent().find('.text-muted').show()

            elem.addClass('invalid')

            return false
        }else{
            elem.parent().find('.text-muted').hide()
            elem.removeClass('invalid')
        }
    }
    $('body').on('submit', '.modal-body .form', function(e){
        e.preventDefault()

        const inputName = $('#name')
        const inputEmail = $('#email')

        validate(inputName)
        validate(inputEmail)

        if(inputEmail.hasClass('invalid') || inputName.hasClass('invalid')){
            console.log('Verificar campos Obrigatorios')
            return false
        }else{
            $(this).submit()
        }
    })

    /*
    * JquaryMask
    */


    $('body').on('blur', '#nome', function(){
        validate($(this))
    })
    $('body').on('blur', '#e-mail', function(){
        validate($(this))
    })
    $('body').on('blur', '#date', function(){
        $(this).datepicker()
    })
    $('body').on('blur', '#date', function(){
        $(this).mask('00/00/0000')
    })
    $('body').on('blur', '#hora', function(){
        validate($(this))
        $(this).mask('00:00')
    })
    $('body').on('keyup', '#cep', function(){
        validate($(this))
        $(this).mask('00000-000')
    })
    $('body').on('keyup', '#cel', function(){
        validate($(this))
        $(this).mask('(00)00000-0000')
    })
    $('body').on('keyup', '#cpf', function(){
        validate($(this))
        $(this).mask('000.000.000-00')
    })