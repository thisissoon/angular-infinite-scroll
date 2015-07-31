/*! angular-sn-infinite-scroll - v0.1.0 - 2015-07-31 */
"use strict";
/*
 * @module   sn.infiniteScroll
 * @main     sn.infiniteScroll
 * @author   SOON_
 */
angular.module("sn.infiniteScroll", [

])
/**
 * Directive to trigger function when element reaches the bottom of its scroll
 * @example
 *   <div sn-infinite-scroll="loadMore()" data-container="ng-view" data-offset="-100" data-disabled="loading"></div>
 * @constructor
 * @class   snInfiniteScroll
 * @require $window
 * @require $document
 * @require $timeout
 */
.directive("snInfiniteScroll", [
    "$window",
    function ($window){
        return {
            restrict: "A",
            scope: {
                offset: "=?",
                snInfiniteScroll: "&",
                disabled: "=?"
            },
            link: function($scope, $element){

                /**
                 * Offset from bottom of scroll to call trigger function (px)
                 * @property {Number} offset
                 */
                $scope.offset = $scope.offset || 0;

                /**
                 * Determine if element has come to the end of its scroll and call the trigger function
                 * @function onScroll
                 */
                var onScroll = function onScroll(){

                    var elementScrollEnd = ( $element[0].scrollHeight - $element[0].scrollTop === $element[0].clientHeight );

                    if (elementScrollEnd && !$scope.disabled) {
                        $scope.snInfiniteScroll();
                    }
                };

                /**
                 * Cleanup event listeners
                 * @function removeListeners
                 */
                var removeListeners = function removeListeners(){
                    angular.element($element).off("scroll");
                    angular.element($window).off("resize");
                };

                $scope.$on("$destroy", removeListeners);

                // attach event listeners
                angular.element($element).on("scroll", onScroll);
                angular.element($window).on("resize", onScroll);

            }
        };
    }
]);
