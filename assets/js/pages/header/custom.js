$(document).ready(function () {

    var $window = $(window);
    /* Search Box */

    $('.wrapSearchBox input[type="text"]').on('input propertychange', function () {
        if ($(this).val().length > 0) {
            if ($(this).siblings('.form-control-clear').is(':hidden')) {
                $(this).siblings('.form-control-clear').show();
            }
        } else {
            if ($(this).siblings('.form-control-clear').is(':visible')) {
                $(this).siblings('.form-control-clear').hide();
            }

        }
    }).trigger('propertychange');

    $('.form-control-clear').click(function () {
        $(this).siblings('input[type="text"]').val('').trigger('propertychange').focus();
    });


    // Collapse Navbar 

    $window.resize(_.debounce(function () {

        if ($('#nav-sidebar').hasClass('show')) {
            closeSidebar();
        }

        if ($window.width() <= 992) {
            $('.flag-wrapper').appendTo('.sidebar-setting');
            $('.login-wrapper').appendTo('.sidebar-setting');
            $('#navbar-menu').appendTo('.sidebar-content');
        } else {
            $('.flag-wrapper').appendTo('#subHeader');
            $('.login-wrapper').appendTo('#subHeader');
            $('#navbar-menu').prependTo('.navbar-container');
        }
    }, 100)).resize();

    $('#nav-icon').click(function () {
        openSidebar();
    });

    $('#loginBtn , #loginBtn-modal').click(function () {
        closeSidebar();
        $('.overlay').show();
        $('#signupModal').removeClass('show');
        $('#loginModal').addClass('show');
    });

    $('#forgotPwdBtn').click(function(){
        closeSidebar();
        $('.overlay').show();
        $('#forgotPasswordModal').addClass('show');
    });

    $('#closeLoginModal , #closeSignupModal ,#closeForgotBox').click(function () {
        closeSidebar();
    });

    $('#signUpBtn').click(function () {
        $('#loginModal').removeClass('show');
        $('#signupModal').addClass('show');
    });

    $(document).click(function (e) {
        var sidebar = $("#nav-sidebar, #nav-icon , #loginBtn , #loginModal , #signupModal ,#loginBtn-modal ,#forgotPasswordModal");
        if (!sidebar.is(e.target) && sidebar.has(e.target).length === 0) {
            closeSidebar();
        }
    });

    $('#nav-icon').click(function () {
        $(this).toggleClass('show');
    });

    function closeSidebar() {
        $('#nav-icon').removeClass('show');
        $('#nav-sidebar').removeClass('show');
        $('#loginModal').removeClass('show');
        $('#signupModal').removeClass('show');
        $('#forgotPasswordModal').removeClass('show');
        $('.overlay').hide();
    }

    function openSidebar() {
        $('.overlay').show();
        $('#nav-sidebar').addClass('show');
    }
});