"use strict";

describe("sn.infiniteScroll", function() {
    var element, isolateScope, $scope, $rootScope, $window;

    beforeEach(module("sn.infiniteScroll"));

    beforeEach(inject(function (_$rootScope_, $compile, $injector) {
        $rootScope = _$rootScope_;

        $scope = $rootScope.$new();
        $scope.loading = false;
        $scope.loadMore = jasmine.createSpy();

        $window = $injector.get("$window");

        element = "<div sn-infinite-scroll=\"loadMore()\" data-offset=\"100\" data-disabled=\"loading\"></div>";

        element = $compile(element)($scope);
        $scope.$digest();

        isolateScope = element.isolateScope();

    }));

    it("should attach options to scope", function(){
        expect(isolateScope.offset).toEqual(100);
        expect(isolateScope.disabled).toEqual(false);
    });

    it("should remove listeners on $destroy", function(){
        isolateScope.$broadcast("$destroy");
        element.triggerHandler("scroll");
        angular.element($window).triggerHandler("resize");
        expect($scope.loadMore).not.toHaveBeenCalled();
    });

    describe("onScroll", function(){

        it("should call trigger function", function(){
            element.triggerHandler("scroll");
            expect($scope.loadMore).toHaveBeenCalled();
        });

        it("should NOT call trigger function if disabled is true",  function(){
            isolateScope.disabled = true;
            element.triggerHandler("scroll");
            expect($scope.loadMore).not.toHaveBeenCalled();
        });

    });

});
