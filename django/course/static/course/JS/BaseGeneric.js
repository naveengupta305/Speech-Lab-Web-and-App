
function AddTaFormfun() {
    let selectedBranch = document.getElementById("TA_BRANCH").value;
    let x = document.getElementById(selectedBranch + "TA");
    document.getElementById("BTechTA").style.display = "none";
    document.getElementById("MTechTA").style.display = "none";
    document.getElementById("PhDTA").style.display = "none";
    if (x.style.display === "none") {
        x.style.display = "block";
    }
    console.log(5);
}

var headerHtml = $("#material-header-holder .ui-datepicker-material-header");

var changeMaterialHeader = function (header, date) {
    var year = date.format("YYYY");
    var month = date.format("MMM");
    var dayNum = date.format("D");
    var isoDay = date.isoWeekday();

    var weekday = new Array(7);
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    weekday[7] = "Sunday";

    $(".ui-datepicker-material-day", header).text(weekday[isoDay]);
    $(".ui-datepicker-material-year", header).text(year);
    $(".ui-datepicker-material-month", header).text(month);
    $(".ui-datepicker-material-day-num", header).text(dayNum);
};

$.datepicker._selectDateOverload = $.datepicker._selectDate;
$.datepicker._selectDate = function (id, dateStr) {
    var target = $(id);
    var inst = this._getInst(target[0]);
    inst.inline = true;
    $.datepicker._selectDateOverload(id, dateStr);
    inst.inline = false;
    this._updateDatepicker(inst);

    headerHtml.remove();
    $(".ui-datepicker").prepend(headerHtml);
};

$("input[data-type='date']").on("focus", function () {
    //var date;
    //if (this.value == "") {
    //  date = moment();
    //} else {
    //  date = moment(this.value, 'MM/DD/YYYY');
    //}

    $(".ui-datepicker").prepend(headerHtml);
    //$(this).datepicker._selectDate(this, date);
});

$("input[data-type='date']").datepicker({
    showButtonPanel: true,
    closeText: "OK",
    dateFormat: "dd/mm/yy",
    onSelect: function (date, inst) {
        changeMaterialHeader(headerHtml, moment(date, "DD/MM/YYYY"));
    }
});

changeMaterialHeader(headerHtml, moment());
var i = $("trying").datepicker("show");

(function () {

    $(".controller").click(function () {
        id = $(this).attr("id");

        $(".controller-container").find(".is_current").removeClass("is_current");
        $(this).addClass("is_current");
        $(".card").attr('class', 'card card--' + id);
        $("html").attr('class', 'bg--' + id);

    });

})();


// CARDS JAVASCRIPT

// Ripple function
(function () {
    "use strict";

    var colour = "#FF1744";
    var opacity = 0.1;
    var ripple_within_elements = ['input', 'button', 'a'];
    var ripple_without_diameter = 0;

    var overlays = {
        items: [],
        get: function () {
            var $element;
            for (var i = 0; i < overlays.items.length; i++) {
                $element = overlays.items[i];
                if ($element.transition_phase === false) {
                    $element.transition_phase = 0;
                    return $element;
                }
            }
            $element = document.createElement("div");
            $element.style.position = "absolute";
            $element.style.opacity = opacity;
            //$element.style.outline = "10px solid red";
            $element.style.pointerEvents = "none";
            $element.style.background = "-webkit-radial-gradient(" + colour + " 64%, rgba(0,0,0,0) 65%) no-repeat";
            $element.style.background = "radial-gradient(" + colour + " 64%, rgba(0,0,0,0) 65%) no-repeat";
            $element.style.transform = "translateZ(0)";
            $element.transition_phase = 0;
            $element.rid = overlays.items.length;
            $element.next_transition = overlays.next_transition_generator($element);
            document.body.appendChild($element);
            overlays.items.push($element);
            return $element;
        },
        next_transition_generator: function ($element) {
            return function () {
                $element.transition_phase++;
                switch ($element.transition_phase) {
                    case 1:
                        $element.style[transition] = "all 500ms cubic-bezier(0.165, 0.840, 0.440, 1.000)";
                        $element.style.backgroundSize = $element.ripple_backgroundSize;
                        $element.style.backgroundPosition = $element.ripple_backgroundPosition;
                        setTimeout($element.next_transition, 0.2 * 1000); //now I know transitionend is better but it fires multiple times when multiple properties are animated, so this is simpler code and (imo) worth tiny delays
                        break;
                    case 2:
                        $element.style[transition] = "opacity 0.15s ease-in-out";
                        $element.style.opacity = 0;
                        setTimeout($element.next_transition, 0.15 * 1000);
                        break;
                    case 3:
                        overlays.recycle($element);
                        break;
                }
            };
        },
        recycle: function ($element) {
            $element.style.display = "none";
            $element.style[transition] = "none";
            if ($element.timer) clearTimeout($element.timer);
            $element.transition_phase = false;
        }
    };

    var transition = function () {
        var i,
            el = document.createElement('div'),
            transitions = {
                'WebkitTransition': 'webkitTransition',
                'transition': 'transition',
                'OTransition': 'otransition',
                'MozTransition': 'transition'
            };
        for (i in transitions) {
            if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
                return transitions[i];
            }
        }
    }();

    var click = function (event) {
        var $element = overlays.get(),
            touch,
            x,
            y;

        touch = event.touches ? event.touches[0] : event;

        $element.style[transition] = "none";
        $element.style.backgroundSize = "3px 3px";
        $element.style.opacity = opacity;
        if (ripple_within_elements.indexOf(touch.target.nodeName.toLowerCase()) > -1) {
            x = touch.offsetX;
            y = touch.offsetY;

            var dimensions = touch.target.getBoundingClientRect();
            if (!x || !y) {
                x = (touch.clientX || touch.x) - dimensions.left;
                y = (touch.clientY || touch.y) - dimensions.top;
            }
            $element.style.backgroundPosition = x + "px " + y + "px";
            $element.style.width = dimensions.width + "px";
            $element.style.height = dimensions.height + "px";
            $element.style.left = (dimensions.left) + "px";
            $element.style.top = (dimensions.top + document.body.scrollTop + document.documentElement.scrollTop) + "px";
            var computed_style = window.getComputedStyle(event.target);
            for (var key in computed_style) {
                if (key.toString().indexOf("adius") > -1) {
                    if (computed_style[key]) {
                        $element.style[key] = computed_style[key];
                    }
                } else if (parseInt(key, 10).toString() === key && computed_style[key].indexOf("adius") > -1) {
                    $element.style[computed_style[key]] = computed_style[computed_style[key]];
                }
            }
            $element.style.backgroundPosition = x + "px " + y + "px";
            $element.ripple_backgroundPosition = (x - dimensions.width) + "px " + (y - dimensions.width) + "px";
            $element.ripple_backgroundSize = (dimensions.width * 2) + "px " + (dimensions.width * 2) + "px";
        } else { //click was outside of ripple element
            x = touch.clientX || touch.x || touch.pageX;
            y = touch.clientY || touch.y || touch.pageY;

            $element.style.borderRadius = "0px";
            $element.style.left = (x - ripple_without_diameter / 2) + "px";
            $element.style.top = (document.body.scrollTop + document.documentElement.scrollTop + y - ripple_without_diameter / 2) + "px";
            $element.ripple_backgroundSize = ripple_without_diameter + "px " + ripple_without_diameter + "px";
            $element.style.width = ripple_without_diameter + "px";
            $element.style.height = ripple_without_diameter + "px";
            $element.style.backgroundPosition = "center center";
            $element.ripple_backgroundPosition = "center center";
            $element.ripple_backgroundSize = ripple_without_diameter + "px " + ripple_without_diameter + "px";
        }
        $element.ripple_x = x;
        $element.ripple_y = y;
        $element.style.display = "block";
        setTimeout($element.next_transition, 20);
    };

    if ('ontouchstart' in window || 'onmsgesturechange' in window) {
        document.addEventListener("touchstart", click, false);
    } else {
        document.addEventListener("click", click, false);
    }
}());
