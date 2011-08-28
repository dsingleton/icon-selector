
$(document).ready(function() {

    // #1 Build icon list
    var list = $('ol.icons'),
        path = '';
    $.each(icon_data, function(i, icon) {
        path = 'icons/' + icon
        list.append('<li><a title="' + icon.replace('_', ' ') + '"href="' + path + '"><img src="' + path + '"></a></li>');
    });

	// All the icons, we'll be using this a lot
	var icons = $('ol.icons li a');
	
    // Add hover  previews (doesn't work on filtered out icons)
    icons.hover(function() {
            $(this).css('opacity') > .5 &&  $('#preview').attr('src', this.href);
        },
        function() {
            // $('#preview').attr('src', '#');
        }
    );
	
	// #2 Filtering search (with delay)
	var search_timer = false;

	$('#search').keyup(function() {

		// Clear timed events if we've have another key press
		if (search_timer) {
			window.clearTimeout(search_timer);
		}

		var filter = this.value;
		search_timer = window.setTimeout(function () {
			// If we match the filter word anywhere then full opacity, 
			// otherwise greyed out
			icons.each(function() {
				var opacity = (this.title.indexOf(filter) >= 0) ? 1 : 0.1;
				$(this).css('opacity', opacity);
			});
		}, 300);
		return false;
	});
	
	var preview = $('#preview');
    $('ol.icons a').hover(
        function(event) {
            var elem = $(event.target);
            
            if (elem.css('opacity') < .5) {
                return;
            }
            
            //get the position of the placeholder element
            var pos = elem.offset();  
            var previewWidth = preview.width();
            var offset = (previewWidth + 2)  / 4;
            
            
            //show the menu directly over the placeholder
            preview.css({
                'left': pos.left - offset + "px",
                'top': pos.top - offset + "px"
            });
            
            preview.show()
        },
        function(event) {
        }
    );
});