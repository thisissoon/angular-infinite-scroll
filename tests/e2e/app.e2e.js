"use strict";
/**
 * This module runs e2e test by setting up a module to make our
 * backend assertions e.g. mock the responses from our api before
 * lauching our actual application.
 * @main   sn.infiniteScroll.e2e
 * @module sn.infiniteScroll.e2e
 * @author SOON_
 */
angular.module("sn.infiniteScroll.e2e", ["sn.infiniteScroll", "ngMockE2E"])
    .run([
        "$httpBackend",
        function ($httpBackend) {

            $httpBackend.whenGET(/partials\/.*/).passThrough();

        }
    ]);
