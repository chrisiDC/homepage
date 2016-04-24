var m1_content, m2_content, m3_content, m1, m2, m3, contentShowing = false;

$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
            if (callback) callback();
        });
    },
    animateCssAlt: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).css("visibility","hidden");

            /* $(this).hide();
             $(this).removeClass('animated ' + animationName);*/
            if (callback) callback();
        });
    }
});

function onM1clicked() {
    contentShowing = true;
    var d1 = $.Deferred();
    var d2 = $.Deferred();
    $(".trigger").hide();
    m3.animateCss('fadeOut', function () {
        m3.hide();
        d2.resolve();
    });

    m2.animateCss('fadeOut', function () {
        m2.hide();
        d1.resolve();
    });

    $.when(d1, d2).done(function () {
        m1_content.show();
        m1_content.animateCss('fadeIn');
    });
}

function onM1closed() {
    if (contentShowing) {
        m1_content.animateCss('fadeOut', function () {
            $(".trigger").show();
            m1_content.hide();
            m2.show();
            m3.show();
            //$("#mainContainer").append(m2);
            //$("#mainContainer").append(m3);
        });

    }
    contentShowing = false;
}

function onM2clicked() {

    contentShowing = true;
    var d1 = $.Deferred();
    var d2 = $.Deferred();
    $(".trigger").hide();
    m1.animateCssAlt('fadeOut', function () {
        //m1.css("visibility","hidden");
        d2.resolve();
    });

    m3.animateCss('fadeOut', function () {
        m3.hide();
        d1.resolve();
    });

    $.when(d1, d2).done(function () {
        m2_content.show();
        m2_content.animateCss('fadeIn');
    });
}

function onM2closed() {
    if (contentShowing) {
        m2_content.animateCss('fadeOut', function () {
            $(".trigger").show();
            m2_content.hide();
            m1.css("visibility","visible");
            m1.removeClass('animated fadeOut');
            m3.show();
        });

    }
    contentShowing = false;
}

function onM3clicked() {
    contentShowing = true;
    var d1 = $.Deferred();
    var d2 = $.Deferred();
    $(".trigger").hide();
    //$("#dummy").show();
    m1.animateCss('fadeOut', function () {
        m1.hide();
        d2.resolve();
    });

    m2.animateCss('fadeOut', function () {
        m2.hide();
        d1.resolve();
    });


    $.when(d1, d2).done(function () {
        //$("#dummy").hide();
        m3_content.show();
        m3_content.animateCss('fadeIn');
    });

}


function onM3closed() {
    if (contentShowing) {
        m3_content.animateCss('fadeOut', function () {
            $(".trigger").show();
            m3_content.hide();
            m2.show();
            m1.show();
        });

    }
    contentShowing = false;
}


(function ($) {
    $(function () {
        m1_content = $("#m1_content");
        m2_content = $("#m2_content");
        m3_content = $("#m3_content");
        m1 = $("#m1");
        m2 = $("#m2");
        m3 = $("#m3");
        $('.button-collapse').sideNav();
        $('.collapsible').collapsible({
            accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });


        //$('#m1_content').hide();
        var grid = $('.grid').isotope({
            layoutMode: 'masonryHorizontal',
            itemSelector: '.grid-item',
            masonryHorizontal: {
                rowHeight: 100
            }
        });

        /* var grid = $('.grid').isotope({
         itemSelector: '.grid-item',
         /!*      stamp: '.stamp',*!/
         transitionDuration: 0,
         layoutMode: 'masonryHorizontal',
         masonryHorizontal: {
         rowHeight: 50
         }
         });*/

        //grid.isotope({ filter: '.isotope-webdev,.isotope-menuitem' });

        $('.filter-button-group').on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            grid.isotope({filter: filterValue});
        });


    }); // end of document ready
})(jQuery); // end of jQuery name space