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

		// Clear timed events if we've have another key press

		var filter = this.value;
		// If we match the filter word anywhere then full opacity, 
		// otherwise greyed out
		icon_links.each(function() {
			var opacity = (this.title.indexOf(filter) >= 0) ? 1 : 0.1;
			$(this).css('opacity', opacity);
		});
		// reset the preview, we may have filtered it out
		preview.hide();
	});
    
});
