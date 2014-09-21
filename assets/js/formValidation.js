/**
 * Created by JSims on 9/1/2014.
 */
$(document).ready(function(){
    $('input').eq(0).focus();
    function getScannedData() {
        console.log(this);
        var el = {
            id: this.id,
            collection: $(this).data('collection'),
            collectionAttribute: $(this).data('collection-attribute')
        };
        console.log(el);
        $.ajax({
            url: 'http://dli-asset-checkout.herokuapp.com/' + el.collection + '/find/?' + el.collectionAttribute + '=' + $('#' + el.id).val()
        }).done(function(data){
            console.log(data);
            console.log(el);
            if(data.length > 0){
                var label;
                if(data[0].type){
                    label = data[0].type + ' ' + data[0].name;
                } else {
                    label = data[0].name;
                }
                $('#' + el.id + '-label').removeClass();
                $('#' + el.id + '-label').addClass('label label-success');
                $('#' + el.id + '-label').text(label);
                $('#' + el.id + '-name').val(label);
            } else {
                $('#' + el.id + '-label').removeClass();
                $('#' + el.id + '-label').addClass('label label-danger');
                $('#' + el.id + '-label').text("Not Found");
            }
        })


    }

    $('.scan-app-input-fields').on('blur', getScannedData);

    $(document).delegate('#textbox', 'keydown', function(e) {
        var keyCode = e.keyCode || e.which;

        if (keyCode == 9) {
            e.preventDefault();
            var start = $(this).get(0).selectionStart;
            var end = $(this).get(0).selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            $(this).val($(this).val().substring(0, start)
                + "\t"
                + $(this).val().substring(end));

            // put caret at right position again
            $(this).get(0).selectionStart =
                $(this).get(0).selectionEnd = start + 1;
        }
    });

});