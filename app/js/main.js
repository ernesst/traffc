'use strict';

var CordovaInit = function () {

    var onDeviceReady = function () {
        receivedEvent('auto');
    };

    var receivedEvent = function (mode) {
        console.debug('Start event received ..');
        console.debug('Mode is ' + mode);

        console.debug('load config ...');
        $.get('js/config/map.style.json', function (configData) {

            angular.module('traffc').config(['configLoaderProvider', function ($config) {
                $config.config(configData);
            }]);

            console.debug('... bootstrapping application setup.');
            angular.bootstrap($('body'), ['traffc']);
        });

        if ( mode === 'auto') {
            $('body').addClass(device.platform.toLowerCase());
        }

        /* jshint ignore:start */
        resizeBootstrapMap();
        /* jshint ignore:end */
    };

    this.bindEvents = function () {
        document.addEventListener('deviceready', onDeviceReady, false);
    };

    //If cordova is present, wait for it to initialize, otherwise just try to
    //bootstrap the application.
    if (window.cordova !== undefined) {
        console.debug('Cordova found, wating for device.');
        this.bindEvents();
    } else {
        console.debug('Cordova not found, booting application');
        receivedEvent('manual');
    }
};

angular.element(document).ready(function () {
    console.debug('Bootstrapping!');
    new CordovaInit();
});