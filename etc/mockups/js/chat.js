$(document).ready(function() {
    var chatbox = document.getElementById('chatbox');
    window.scrollTo(0, chatbox.scrollHeight);

    function alignModal() {
        var modalDialog = $(this).find('.modal-dialog');
        modalDialog.css('margin-top', Math.max(0, ($(window).height() - modalDialog.height()) / 10));
    }

    $('.modal').on('shown.bs.modal', alignModal);
    $(window).on('resize', function() {
        $('.modal:visible').each(alignModal);
    });

    $('.modal-tab-menu a').click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass('active');
        $(this).addClass('active');
        var index = $(this).index();
        $('.modal-tab-content').removeClass('active');
        $('.modal-tab-content').eq(index).addClass('active');
    });

    $('.uniCheckAll').click(function () {
        $('.uniCheck').prop('checked', $(this).prop('checked'));
    });

    $('.uniCheckOne').click(function (e) {
        $('.uniCheckAll').prop('checked', false);
        if (!$(e.target).hasClass('uniCheck')) {
            $(this).find('input').prop('checked', !$(this).find('input').prop('checked'));
        }
    });

    $('#chat-footer').keyup(function(e) {
        if (e.keyCode == 13) {
            $('#btn-send').click();
        }
        else if (e.keyCode == 27) {
            $('#btn-next').click();
            location.reload();
        }
    });

    $('#btn-send').click(function() {
        var x = document.getElementById('text-input').value;
        document.getElementById('text-input').value = '';

        $('#chatbox ul').append('<li class="right clearfix"><span class="chat-img pull-right"><h4 data-toggle="tooltip" data-placement="left" title="National Technical University of Athens, Greece"><i class="fa fa-genderless" aria-hidden="true"></i></h4></span><div class="chat-body clearfix"><p class="chat-message" data-toggle="tooltip" data-placement="left" title="12 mins ago">' + x + '</p></div></li>');
        window.scrollTo(0, chatbox.scrollHeight);
    });
});
