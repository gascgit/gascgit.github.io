
// - - - - - - - - - - OPTIONS - - - - - - - - - - - - - - //
fadeInScroll = false;   // LAZY LOAD ELEMENTS ON SCROLL / IN VIEW
fullPanels = false;     // MAKE ALL PANELS HEIGHT OF WINDOW
vAlignNavbar = true;    // VERTICAL ALIGN TOP MENU
navBarHighlight = true; // HIGHLIGHT MENU ITEM WHEN ITS SECTION IS IN VIEW
logoScrollH = false;    // SIZE LOGO ON SCROLL
regOnLoad = false;       // REGISTER POPUP ON LOAD
bodyFade = false;       // BODY HIDE ON RESIZE AND LOAD
preLoader = true;       // ADD PRELOADER
preLoadBG = "#78787A";     // PRELOADER BACKGROUND COLOUR
// - - - - - - - - - - - - - - - - - - - - //
// 
// - - - - - - - - - - PRELOADER START - - - - - - - - - - - - - - //
if (bodyFade) {
    $("body").css("opacity", 0);
    $(window).load(function () {
        if (bodyFade) {
            $("body").animate({opacity: 1}, 500);
        }
    });
}
// - - - - - - - - - - - - - - - - - - - - //
// 
// - - - - - - - - - - PRELOADER START - - - - - - - - - - - - - - //
function preLoadStart() {
    winW = $(window).width();
    winH = $(window).height();
    $("body").append('<div id="preLoader" style="position:fixed; top:0; left:0; width:' + winW + 'px; height:' + winH + 'px; background:' + preLoadBG + '; z-index:9999999"><img src="img/loading.gif" style="position:absolute; top:50%; left:50%; width:60px; height:60px; margin-left:-30px; margin-top:-30px"/></div>');
}

function preLoadEnd() {
    $("#preLoader").fadeOut(500);
}

if (preLoader) { // IF PRELOADER IS ON
    preLoadStart();
}
// - - - - - - - - - - PRELOADER END - - - - - - - - - - - - - - //


$(document).ready(function () {
    $(window).load(function () {

        // - - - - - - - - - - VERTICAL ALIGN NAVBAR - - - - - - - - - - - - - - //
        function vAlignNav() {
            if (vAlignNavbar === "bottom") {
                $("#navbar-container").css("margin-top", "auto");
                if (!isXS()) {
                    navH = $("#navbar-container").height();
                    navContainerH = $(".navbar").height();
                    $("#navbar-container").css("margin-top", navContainerH - navH - 15 + "px");
                }
            } else if (vAlignNavbar) {
                $("#navbar-container").css("margin-top", "auto");
                if (!isXS()) {
                    navH = $("#navbar-container").height() / 2;
                    navContainerH = $(".navbar").height() / 2;
                    $("#navbar-container").css("margin-top", navContainerH - navH + "px");
                }
            }
        }
        // - - - - - - - - - - SET FULL HEIGHT PANELS - - - - - - - - - - - - - - //
        function fullPanel() {
            if (fullPanels) {
                $(".section").css("height", winSize(false) - $(".navbar-inverse").height() + "px");
            }
        }
        // - - - - - - - - - - - - - - - - - - - - //
        // 
        // - - - - - - - - - - RETURN WINDOW SIZE - - - - - - - - - - - - - - //
        function winSize(w, half) {
            divide = half ? 2 : 1;
            console.log(w + " ::: " + half);
            if (w) {
                return $(window).width() / divide;
            } else {
                return $(window).height() / divide;
            }
        }
        // - - - - - - - - - - - - - - - - - - - - //

        var winW = winSize(true);
        var firstFire = true;

        // - - - - - - - - - - INITIAL LOAD AND RESIZE - - - - - - - - - - - - - - //
        function isLoaded(inChk) {
            // - - - - - - - - - - PAUSE ON LOAD
            setTimeout(function () {
                // - - - - - - - - - - MAKE SURE WINDOW SIZE HAS ACTUALLY CHANGED (TABLET/PHONE KEYBOARD)
                if (inChk === true || winW !== winSize(true)) {
                    fullPanel();
                    sameHeight();
                    vAlignNav();
                    vAlign();                    
                    customize();
                    fadeIn();
                }
                if (firstFire) { // IF FIRST PAGE LOAD
                    if (preLoader) { // IF PRELOADER IS ON
                        setTimeout(function () {
                            preLoadEnd(); // TURN PRELOADER OFF
                        }, 1000);
                    }
                }
                winW = winSize(true);
                firstFire = false;
            }, 250);
        }
        isLoaded(firstFire);
        $(window).resize(function () {
            setTimeout(function () {
                if (winW !== winSize(true)) {
                    isLoaded(firstFire);
                }
            }, 250);
        });
        // - - - - - - - - - - - - - - - - - - - - //
        // 
        // - - - - - - - - - - FADE IN BODY ON LOAD - - - - - - - - - - //
        function fadeIn() {
            navH = $(".navbar-inverse").height();
            $("body").css("padding-top", navH + "px");
        }
        // 
        // - - - - - - - - - - IS MOBI ONLY - - - - - - - - - - //
        function isCell() {
            return (/Android|webOS|iPhone|iPod|BlackBerry|BB|IEMobile|Windows Phone|Silk|Opera Mini/i.test(navigator.userAgent)) ? true : false;
        }
        // - - - - - - - - - - - - - - - - - - - - //
        // 
        // - - - - - - - - - - IS MOBI OR TABLET - - - - - - - - - - //
        function isMobi() {
            return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) ? true : false;
        }
        // - - - - - - - - - - - - - - - - - - - - //
        // 
        // - - - - - - - - - - IS XS VISIBLE - - - - - - - - - - //
        function isXS() {
            return $("#is-xs").css("display") === "block" ? true : false;
        }
        // - - - - - - - - - - - - - - - - - - - - //
        // 
        // - - - - - - - - - - IS SM VISIBLE - - - - - - - - - - //
        function isSM() {
            return $("#is-sm").css("display") === "block" ? true : false;
        }
        // - - - - - - - - - - - - - - - - - - - - //
        // 
        // - - - - - - - - - - MAIN MENU SCROLLER - - - - -  - - - - - //
        $(".navit").click(function (event) {
            event.preventDefault();
            if (isXS()) {
                $(".navbar-collapse").animate({
                    height: "1px"
                }).removeClass("in");
            }

            thsNav = $(this).attr("href");

            if (thsNav !== 'body') {
                $(".panelbox").hide();
                $(thsNav).fadeIn();
            }
            if ($(thsNav).length) {
                $("body").bind('mousewheel DOMMouseScroll', function (e) {
                    return false;
                });
                getPad = $(".navbar-inverse").height(); // FIXED TOP HEADER
                //getPad = 0;
                scrollIt = setTimeout(function () {
                    $('html, body').animate({
                        scrollTop: $(thsNav).offset().top - getPad
                    }, 1500, function () {
                        $("body").unbind('mousewheel DOMMouseScroll');
                    });
                }, 500);
            }
        });
        // - - - - - - - - - - - - - - - - - - - - //
        // 
        // - - - - - - - - - - MAIN MENU CHANGE INDICATOR ON SCROLL - - - - - - - - - - //    
        var getLast = '';

        $(window).on('scroll', function () {
            if (logoScrollH) {
                if ($(document).scrollTop() > 0) {
                    if ($('#logo').data('size') == 'big') {
                        $('#logo').data('size', 'small');
                        $('#logo').stop().animate({
                            width: '80px',
                            'margin-top': 0
                        }, 600);
                    }
                } else {
                    if ($('#logo').data('size') == 'small') {
                        $('#logo').data('size', 'big');
                        $('#logo').stop().animate({
                            width: sloganH,
                            'margin-top': -15
                        }, 600);
                    }
                }
            }

            // - - - - - - - - - - HIGHLIGHT NAVBAR MENU ITEM - - - - - - - - - - //  
            if (navBarHighlight) {
                var scrollTop = $(this).scrollTop();
                $('.section').each(function () {
                    var topDistance = $(this).offset().top;
                    getprev = getLast;
                    firstSection = $(".section").eq(0).offset().top - ($(".navbar-inverse").height() + 1);
                    if ((topDistance - ($(".navbar-inverse").height() + 1)) < scrollTop) {
                        $(".navbar-form a").removeClass("actv");
                        getLast = $(this).attr("id");
                        $("#navbar-container [href=#" + getLast + "]").addClass("actv");
                        console.log("getlast: " + getLast);
                    } else if (scrollTop < firstSection) {
                        $(".navbar-form a").removeClass("actv");
                        $("#navbar-container [href=body]").addClass("actv");
                        console.log("getlast2: " + scrollTop + " : " + firstSection);
                    }
                });
            }
            // - - - - - - - - - - - - - - - - - - - - //
            // 
            // - - - - - - - - - - FADE IN SECTION ON SCROLL - - - - - - - - - - //  
            if (fadeInScroll) {
                $(".section").each(function (i) {
                    var bottom_of_object = $(this).offset().top + $(this).outerHeight() / 5;
                    var bottom_of_window = $(window).scrollTop() + $(window).height();
                    var elemTop = $(this).offset().top;
                    var elemBottom = elemTop + $(this).height();

                    if (bottom_of_window > bottom_of_object) {
                        $(this).animate({'opacity': '1'}, 400);
                    } else if (elemTop < elemBottom) {
                        $(this).stop(true, false).animate({'opacity': '0'}, 250);
                    }
                });
            }
            // - - - - - - - - - - - - - - - - - - - - //
        });
        // - - - - - - - - - - - - - - - - - - - - //
        // 
        // - - - - - - - - - - VERTICAL ALIGN ELEMENT TO PARENT - - - - - - - - - - //
        function vAlign(inParent) {
            setTimeout(function () {
                $(".valign").each(function () {
                    parentH = !inParent ? $(this).parent().height() / 2 : inParent;
                    thsH = $(this).height() / 2;
                    $(this).css("margin-top", parentH - thsH + "px");
                });
            }, 200);
        }
        // - - - - - - - - - - - - - - - - - - - - //
        // 
        // - - - - - - - - - - FANCYBOX - - - - - - - - - - //
        $(".fbox").fancybox({
            padding: 0
        });

        $(".fancybox").fancybox({
            padding: 0
        });

        // - - - - - - - - - - TRIGGER REGISTRATION ON LOAD - - - - - - - - - - //
        if (regOnLoad) {
            $.fancybox.open([
                {
                    href: '#registernowPop'
                }
            ], {
                padding: 0,
                maxWidth: 950
            });
        }
        // - - - - - - - - - - - - - - - - - - - - //
        // 
        // - - - - - - - - - - HASHTAG LISTENER ON LOAD (THANK YOU)- - - - - - - - - - //
        var hash = window.location.hash;
        if (hash === "#thankyou") {
            $("#registernow-pop .title2").html("THANK YOU FOR REGISTERING<br/>WITH SUMMERFIELDS");
            thankYou = "<div class='col-md-12 text-center'><p style='color:#756724'>Thank you for registering with Riverside Trail. Stay tuned for your first exclusive update coming soon.</p></div>";
            $("#registernow-pop #regform-container .row").html(thankYou);
            getPad = $(".navbar-header").height();

            $("#regbox-title").html("THANK YOU FOR REGISTERING<br/>WITH RIVERSIDE SUMMERFIELDS");
            $("#regbox-text").html("<p class='text-center'>Stay tuned for your first exclusive update coming soon.</p>");
            $('html, body').animate({
                scrollTop: $("#registernow-pop").offset().top
            }, 1500);
        }
        // - - - - - - - - - - - - - - - - - - - - //
        // 
        // - - - - - - - - - - FORM VALIDATION - - - - - - - - - - //
        $(".submitformBtn").click(function () {
            err = false;
            regID = $(this).attr("data-regformid");
            $(regID + " .req," + regID + " .selector").removeClass("input-err");
            $(".err-msg").hide();
            $(regID + " .req").each(function () {
                if (!$(this).val()) {
                    if ($(this).attr("data-target")) {
                        $($(this).attr("data-target")).addClass("input-err");
                        $(regID + " .err-msg").show();
                        err = true;
                    } else {
                        $(this).addClass("input-err");
                        $(regID + " .err-msg").show();
                        err = true;
                    }
                }
            });
            if (err) {
                return false;
            }
        });
        $("input[type=text], input[type=email]").bind("click focus", function () {
            $(".err-msg").hide();
            $(this).removeClass("input-err");
        });
        // - - - - - - - - - - - - - - - - - - - - //
        // 
        // - - - - - - - - - - ONLY NUMBERS IN PHONE FIELD - - - - - - - - - - //
        $(".numonly").keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                    // Allow: Ctrl+A, Command+A
                            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                            // Allow: home, end, left, right, down, up
                                    (e.keyCode >= 35 && e.keyCode <= 40)) {
                        // let it happen, don't do anything
                        return;
                    }
                    // Ensure that it is a number and stop the keypress
                    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                        e.preventDefault();
                    }
                });
        // - - - - - - - - - - - - - - - - - - - - //
        //
        // - - - - - - - - - - SAME HEIGHT ROW / COLUMN - - - - - - - - - - //
        // .sameH = Parent, .sameHRow = Child, .sameHVBot = Element (ie button) you want to centre and align to bottom
        function sameHeight() {
            $(".sameHRow").css("height", "auto");
            $(".valign").css("margin-top", "0");
            setTimeout(function () {
                if (!isXS() && !isSM()) {
                    $(".sameH").each(function () {
                        setH = 0;
                        setVBotH = 0;
                        $(".sameHRow", this).each(function () {
                            $(".sameHVBot", this).css({"position": "absolute"});
                            sameHVBotMargin = (($(".sameHVBot", this).outerWidth() / 2) * -1);
                            if ($(".sameHVBot", this).outerHeight() > setVBotH) {
                                setVBotH = $(".sameHVBot", this).outerHeight();
                            }
                            if ($(this).height() > setH) {
                                setH = $(this).height();
                            }
                            $(".sameHVBot", this).css({"margin-left": sameHVBotMargin + "px", "left": "50%", "bottom": "20px"});
                        });
                        $(".sameHRow", this).height(setH + setVBotH);
                    });
                } else {
                    $(".sameHVBot").css({"position": "relative", "margin": "0 auto", "left": "inherit", "bottom": "inherit"});
                }
            }, 100);
        }
        // - - - - - - - - - - - - - - - - - - - - //


        $("#amenity-list div[data-val]").click(function () {
            if ($(this).children().hasClass("glyphicon-plus")) {
                $(".plumin").addClass("glyphicon-plus").removeClass("glyphicon-minus");
                $(this).children(".plumin").removeClass("glyphicon-plus").addClass("glyphicon-minus");
                ths = $(this);
                $(".ameninfo").slideUp(250);
                $(this).next(".ameninfo").slideDown(250);
            } else if ($(this).children().hasClass("glyphicon-minus")) {
                $(this).children(".plumin").removeClass("glyphicon-minus").addClass("glyphicon-plus");
                $(".ameninfo").slideUp(250);
            }
        });
       

        $(".selector").click(function () {
            $(".priceoptions").slideToggle(250);
        });
        $(".selector1").click(function () {
            $(".brokeroptions").slideToggle(250);
        });
        $(".selector2").click(function () {
            $(".hearoptions").slideToggle(250);
        });
        $(".priceoptions div").click(function () {
            console.log($(this).attr("data-val"));
            $("#pricerange").val($(this).attr("data-val"));
            $(".selector").html($(this).html());
            $(".priceoptions").slideUp(250);
            $(".selector.input-err").removeClass("input-err");
        });

        $(".brokeroptions div").click(function () {
            console.log($(this).attr("data-val"));
            $("#brokertype").val($(this).attr("data-val"));
            $(".selector1").html($(this).html());
            $(".brokeroptions").slideUp(250);
            $(".selector1.input-err").removeClass("input-err");
            if ($(this).attr("data-val") === "yes") {
                document.getElementById('mohammad123').style.visibility = 'visible';
                document.getElementById('mohammad123').style.display = 'block';

            } else
            {
                document.getElementById('mohammad123').style.visibility = 'hidden';
                document.getElementById('mohammad123').style.display = 'none';

            }
        });
        $(".hearoptions div").click(function () {
            console.log($(this).attr("data-val"));
            $("#heartype").val($(this).attr("data-val"));
            $(".selector2").html($(this).html());
            $(".hearoptions").slideUp(250);
            $(".selector2.input-err").removeClass("input-err");
        });

        $(".controls div").click(function () {
            console.log($(this).attr("data-val"));
            if ($("checkboxes[]").checked === false) {
                $(".selector.input-err").addClass("input-err");
            } else {
                $(".selector.input-err").removeClass("input-err");
            }
        });
        // - - - - - - - - - - CUSTOMIZE SECTION - - - - - - - - - - //
        function customize() {
            $(".customize").css("bottom", custdif() + "px");
            if ($(".customize .glyphicon").hasClass("glyphicon-minus-sign")) {
                $(".customize .glyphicon").removeClass("glyphicon-minus-sign").addClass("glyphicon-plus-sign");
            }
        }

        function custdif() {
            return ($(".customize-head").outerHeight() - $(".customize").height());
        }

        $(".customize").click(function () {
            isOpen = $(".glyphicon", this).hasClass("glyphicon-plus-sign") ? 1 : 0;
            if (isOpen === 1) {
                $(".glyphicon", this).removeClass("glyphicon-plus-sign").addClass("glyphicon-minus-sign");
                $(this).animate({
                    bottom: 0
                }, 500);
            } else {
                $(".glyphicon", this).removeClass("glyphicon-minus-sign").addClass("glyphicon-plus-sign");
                $(this).animate({
                    bottom: custdif()
                }, 500);
            }
        });
        // - - - - - - - - - - - - - - - - - - - - //

        setTimeout(function () {
            $("#amenity-list div[data-val=0]").trigger("click");
            console.log("trig click");
        }, 1500);
    });
});    