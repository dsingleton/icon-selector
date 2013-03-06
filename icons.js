$(document).ready(function() {
    
    var icon_list = $('ol.icons'),
        preview = $('#preview'),
        search_input = $('#search'),
        initial_hash = window.location.hash.substring(1);
    
    // #1 Generate icon links
    $.each(icon_data, function(i, icon) {
        icon_list.append('<li><a title="' + icon.replace('_', ' ') + '"href="icons/' + icon + '"> \
                          <img src="icons/' + icon + '"></a></li>');
    });
    
	var icon_links = $('ol.icons li a');
	
    
    icon_links.mouseenter(function(event) {
        var elem = $(event.target).parent();
        if (!elem.hasClass('no-match')) {  
            preview.offset({
                'left': elem.offset().left - 24,
                'top': elem.offset().top - 24
            }).html(elem.clone()).show();
        }
    });
    
    icon_list.mouseleave(function() {
       preview.hide(); 
    });
    
    
	search_input.keyup(function() {
		apply_filter(this.value);
		preview.hide();
	});

    var apply_filter = function(value) {
        window.location.hash = value;
        icon_links.each(function() {
            $(this).toggleClass('no-match', (this.title.indexOf(value) == -1));
        });
    };
    
    apply_filter(initial_hash)
    search_input.val(initial_hash);
});
