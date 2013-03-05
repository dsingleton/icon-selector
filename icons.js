$(document).ready(function() {
    
    var icon_list = $('ol.icons');
    var preview = $('#preview');
    
    // #1 Generate icon links
    $.each(icon_data, function(i, icon) {
        icon_list.append('<li><a title="' + icon.replace('_', ' ') + '"href="icons/' + icon + '"> \
                          <img src="icons/' + icon + '"></a></li>');
    });
    
	var icon_links = $('ol.icons li a');
	
    // #3 Hover preview
    icon_links.mouseenter(function(event) {
        var elem = $(event.target).parent();
        if (elem.css('opacity') > .5) {  
            preview.offset({
                'left': elem.offset().left - 24,
                'top': elem.offset().top - 24
            }).html(elem.clone()).show();
        }
    });
    
    icon_list.mouseleave(function() {
       preview.hide(); 
    });
    
    // #2 Filtering search 
	$('#search').keyup(function() {
		apply_filter(this.value);
		preview.hide();
	});

    var apply_filter = function(value) {
        window.location.hash = value;
        icon_links.each(function() {
            var opacity = (this.title.indexOf(value) >= 0) ? 1 : 0.1;
            $(this).css('opacity', opacity);
        });
    };
    apply_filter(window.location.hash.substring(1));
});
