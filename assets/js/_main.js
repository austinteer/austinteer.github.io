$(document).ready(function() {
    var heroImage = $(".hero");
    var navToScroll = $('#nav-scroll');
    var menuToggle = $('#menu-toggle');
    var menuToHide = $('#nav-hide');

    $(window).on("scroll", function() {
        var $this = $(this).scrollTop();
        var j = ($this / 3);
        var l = (j - 50);
        var h = (.00025 * $this) + 1;

        navToScroll.css({
            transform: 'translateY(' + l + '%)'
        });
        heroImage.css({
            transform: 'scale(' + h + ')'
        });
    });


    menuToggle.click(function() {
        menuToHide.slideToggle({
            duration: 300,
            easing: 'linear'
        });
        navToScroll.toggleClass('move-up', 'ease', function() {});
    });

    $('#loader').fadeOut('1000');
});