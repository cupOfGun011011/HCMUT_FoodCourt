'use strict';
(function ($) {

  /*-------------------
  hidden menu item
  --------------------- */
  $(document).ready(function () {
  $("#btn_wallet").click(function () {
    $("#notice").addClass("hidden-menu-item");
    $("#wallet").removeClass("hidden-menu-item");
    $("#history").addClass("hidden-menu-item");

    $("#btn_notice").removeClass("menu-item-action");
    $("#btn_wallet").addClass("menu-item-action");
    $("#btn_history").removeClass("menu-item-action");
  });
  $("#btn_history").click(function () {
    $("#notice").addClass("hidden-menu-item");
    $("#wallet").addClass("hidden-menu-item");
    $("#history").removeClass("hidden-menu-item");

    $("#btn_notice").removeClass("menu-item-action");
    $("#btn_wallet").removeClass("menu-item-action");
    $("#btn_history").addClass("menu-item-action");
  });
  $("#btn_notice").click(function () {
    $("#notice").removeClass("hidden-menu-item");
    $("#wallet").addClass("hidden-menu-item");
    $("#history").addClass("hidden-menu-item");

    $("#btn_notice").addClass("menu-item-action");
    $("#btn_wallet").removeClass("menu-item-action");
    $("#btn_history").removeClass("menu-item-action");
  });

  });

  /*------------------
      Background Set
  --------------------*/
  $('.set-bg').each(function () {
      var bg = $(this).data('setbg');
      $(this).css('background-image', 'url(' + bg + ')');
  });
  /*------------------
      Background Set
  --------------------*/
  $('.set-avt').each(function () {
      var bg = $(this).data('set-avt');
      $(this).css('background-image', 'url(' + bg + ')');
  });

})(jQuery);
