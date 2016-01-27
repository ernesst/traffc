'use strict';


function resizeBootstrapMap() {
    console.debug('window resized');
    var $map = $('#map');
    var mapParentWidth = $('#map_canvas').width();
    $map.width(mapParentWidth);
    var minus = 52;

    if ($('body').hasClass('ios')) {
        minus += 20;
    }

    $map.height($(window).height() - minus);

}


function togFnClass(v) {
    return v ? 'addClass' : 'removeClass';
}

function reloadTiles() {
    //debug
    console.debug('reload layer.');
    var tiles = $('#map_canvas').find('img');
    for (var i = 0; i < tiles.length; i++) {
        var src = $(tiles[i]).attr('src');
        if (/\/vt\?pb=/.test(src)) {
            var newSrc = src.split('&ts')[0] + '&ts=' + (new Date()).getTime();
            $(tiles[i]).attr('src', newSrc);
        }
    }

    refreshSpiner();
}

function refreshSpiner() {
    // add animation to the refresh button
    $('#refresh-btn').addClass('spin').delay(1000)
        .queue(function () {
            $(this).removeClass('spin');
            $(this).dequeue();
        });
}

//todo refactor into angular
$(function () {

    $(window).resize(resizeBootstrapMap); // force responsivness

    $('[data-toggle="tooltip"]').tooltip();

    $(document).on('input', '.clearable', function () {
        $(this)[togFnClass(this.value)]('x');
    }).on('mousemove', '.x', function (e) {
        $(this)[togFnClass(this.offsetWidth - 18 < e.clientX - this.getBoundingClientRect().left)]('onX');
    }).on('touchstart click', '.onX, .x', function (ev) {
        ev.preventDefault();
        $(this).removeClass('x onX').val('').change();
        $(this).blur();
    });


    //resizeBootstrapMap();
    $('#refreshRate, #isRefreshable').on('change', function () {
        if ($('#isRefreshable').is(':checked')) {
            setInterval(reloadTiles, $('#refreshRate').val() * 1000);
        }
    });

});