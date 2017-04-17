$(document).ready(function(){
    function alignModal(){
            var modalDialog = $(this).find(".modal-dialog");

            // Applying the top margin on modal dialog to align it vertically on the top
            modalDialog.css("margin-top", Math.max(0, ($(window).height() - modalDialog.height()) / 10));
        }
        // Align modal when it is displayed
        $(".modal").on("shown.bs.modal", alignModal);

        // Align modal when user resize the window
        $(window).on("resize", function(){
        $(".modal:visible").each(alignModal);
    });

    $(".search").keyup(function () {
        var searchTerm = $(".search").val();
        var listItem = $('.results tbody').children('tr');
        var searchSplit = searchTerm.replace(/ /g, "'):containsi('")

        $.extend($.expr[':'], {
            'containsi': function(elem, i, match, array) {
                return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
            }
        });

        $(".results tbody tr").not(
            ":containsi('" + searchSplit + "')").each(function(e) {
                $(this).attr('visible','false');
        });

        $(".results tbody tr:containsi('" + searchSplit + "')").each(function(e) {
          $(this).attr('visible','true');
        });

        var uniCount = $('.results tbody tr[visible="true"]').length;
        $('.counter').text(uniCount + ' item');

        if(uniCount == '0') {
            $('.no-result').show();
        }
        else {
            $('.no-result').hide();
        }
    });

    $("#uniCheckAll").click(function () {
        $('.uniCheck:visible').prop('checked', $(this).prop('checked'));
    });

    $("#uniCheckOne").click(function () {
        console.log('hello');
        $('.uniCheckAll').prop('checked', false);
    });
});

