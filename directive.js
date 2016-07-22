import angular from "angular";
import * as _ from "lodash";

const directivesModule = angular.module("MyDirectives", [])
.directive("scrollWatcher", ["$window", "$document", scrollWatcher]);

function scrollWatcher($document) {
    return {
        restrict: "A",
        scope: {
            scrollCallback: "&",
            scrollPage: "@"
        },
        link: function (scope, element) {
            //here we check the for the attribute scrollPage and set the element accordingly
            const el = scope.$eval(scope.scrollPage) ? angular.element($document) : element;

            //here we delay evaluating the scrolling events until they have stopped
            const dbnce = _.debounce(function (e) {
                //send event that scrolling stopped
                scope.$apply(function () {
                    //execute the provided callback
                    scope.scrollCallback({ $event: e, isEndEvent: true, isScrollingEvent: false });
                });

                //register first scroll interceptor. Since scrolling has stopped we now need to register a start scrolling event binding
                el.bind("scroll", firstScrollFunc);
            }, 200);

            const firstScrollFunc = function (e) {
                //so we have detected the scrolling needs to start. Since this is a one time event between starts/stops we need to
                //unregister the start scrolling event
                el.unbind("scroll", firstScrollFunc);
                scope.$apply(function () {
                    //execute the provided callback
                    scope.scrollCallback({ $event: e, isEndEvent: false, isScrollingEvent: true });
                    //We do this Incase angular removes dom parts causing the scroll bar to disappear.we need to trigger the end event again 
                    dbnce();
                });
            };

            //on first load of directive register the start and stop events
            el.bind("scroll", firstScrollFunc);
            el.bind("scroll", dbnce);

            scope.$on("$destroy", function handleDestroyEvent() {
                //when switching pages remove event
                el.unbind("scroll", dbnce);
                el.unbind("scroll", firstScrollFunc);
            });
        }
    };
}
