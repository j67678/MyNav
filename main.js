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
        $('body').append('<div class="panel" id="window' + windowCount + '">' +
                '<div class="panel-heading"><img class="favicon" src="'+ icon.image +'" onerror="this.src=\'images/error.png\';" />' + 
                '<span class="title">' + icon.name + ' [' + icon.url + ']</span><img class="close-window" onmouseover="this.src=\'images/close_hover.png\';"' +
                'onmouseout="this.src=\'images/close.png\';" src="images/close.png" /></div>' +
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
        }).css({"top": 50 + offset, "left": 200 + offset, "width": 800, "height": 600});;
        
        $("#window" + windowCount + " .close-window").on("click", function() {
            $(this).parent().parent().remove();
        });

    });
});
