var windowCount = 0;
$(document).ready(function() {
    icons.map(function(value, index, array) {
        $("#icons").append('<div data-index="' + index + '" class="icon">' +
                '<img src="' + value.image + '" onerror="this.src=\'images/error.png\';" /><br>' +
                '<span>' + value.name + '</span>' +
            '</div>' );
    });
    $("#icons .icon").dblclick(function() {
        var index = $(this).data('index');
        var icon = icons[index];
        if (icon.openInNewWindow) {
            window.open(icon.url);
            return;
        }
        windowCount++;
        var offset = (windowCount % 10) * 10;
        var left = 200;
        var top = 50;
        var height = $(window).height() - top;
        var width = $(window).width() - left;
        if (height >= 600) {
            height = 600;
        } else {
            top = 25;
            height = $(window).height() - top;
        }
        if (width >= 800) {
            width = 800;
        } else {
            left = 100;
            width = $(window).width() - left;
        }
        $('body').append('<div class="panel" id="window' + windowCount + '">' +
                '<div class="panel-heading"><img class="favicon" src="'+ icon.image +'" onerror="this.src=\'images/error.png\';" />' + 
                '<span class="title">' + icon.name + ' [' + icon.url + ']</span><a class="close-window"></a></div>' +
                '<iframe src="' + icon.url + '"></iframe>' + 
            '</div>');
        $("#window" + windowCount).draggable({
            handle: ".panel-heading",
            stop: function(evt, el) {
            }
        }).resizable({
            minHeight: 150,
            minWidth: 200,
            handles: "all",
            stop: function(evt, el) {
            }
        }).css({
            "top": top + offset,
            "left": left + offset,
            "width": width,
            "height": height
        }).on("mousedown", function() {
            $('div.panel').not(this).css('z-index', '100');
            $(this).css('z-index', '1000');
        });
        
        $("#window" + windowCount)
        
        $("#window" + windowCount + " .close-window").on("click", function() {
            windowCount--;
            $(this).parent().parent().remove();
        });

    });
});
