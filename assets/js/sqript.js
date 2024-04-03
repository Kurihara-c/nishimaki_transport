// ローディング画面ページ遷移で非表示
$(function () {
  var webStorage = function () {
    if (sessionStorage.getItem("access")) {
      /*
        2回目以降アクセス時の処理
      */
      $(".p-loading").addClass("is-active");
    } else {
      /*
        初回アクセス時の処理
      */
      sessionStorage.setItem("access", "true"); // sessionStorageにデータを保存
      $("p-loading__logo").addClass("is-active"); // loadingアニメーションを表示
      setTimeout(function () {
        // ローディングを数秒後に非表示にする
        $(".p-loading").addClass("is-active");
        $("p-loading__logo").removeClass("is-active");
      }, 3000); // ローディングを表示する時間
    }
  };
  webStorage();
});

// ヘッダースクロール時に背景色付与
$(function () {
  $(window).on("scroll", function () {
    if ($(".l-header").height() < $(this).scrollTop()) {
      $("#js-header").addClass("is-white");
      // $("#js-header").addClass("is-black");
    } else {
      $("#js-header").removeClass("is-white");
      // $("#js-header").removeClass("is-black");
    }
  });
});

// ログイン画面開閉(モーダルウィンドウ)
jQuery(".js-modal-open").on("click", function (e) {
  e.preventDefault();

  jQuery("#js-login-modal")[0].showModal();
});

jQuery(".js-modal-close").on("click", function (e) {
  e.preventDefault();

  jQuery("#js-login-modal")[0].close();
});

// ドロワーメニュー開閉
jQuery("#js-drawer-icon").on("click", function (e) {
  e.preventDefault();
  jQuery("#js-drawer-icon").toggleClass("is-checked");
  jQuery("#js-drawer-content").toggleClass("is-checked");
  jQuery("#js-drawer-overlay").toggleClass("is-checked");
});

jQuery('#js-drawer-content a[href^="#"]').on("click", function (e) {
  jQuery("#js-drawer-icon").removeClass("is-checked");
  jQuery("#js-drawer-content").removeClass("is-checked");
  jQuery("#js-drawer-overlay").removeClass("is-checked");
});

jQuery('a[href^="#"]').on("click", function (e) {
  const speed = 300;
  const id = jQuery(this).attr("href");
  const target = jQuery("#" == id ? "html" : id);
  const position = jQuery(target).offset().top;
  jQuery("html, body").animate(
    {
      scrollTop: position,
    },
    speed,
    "swing" // swing or linear
  );
});

// フォーム送信ボタン制御
$(document).ready(function () {
  const $submitBtn = $("#js-submit");
  $("#form input,#form textarea").on("change", function () {
    if (
      $('#form input[type="text"]').val() !== "" &&
      $('#form input[type="email"]').val() !== "" &&
      $('#form input[type="checkbox"]').val() !== "" &&
      $("#form #check").prop("checked") === true
    ) {
      $submitBtn.prop("disabled", false);
      $submitBtn.addClass("c-button--entry-active");
    } else {
      $submitBtn.prop("disabled", true);
      $submitBtn.removeClass("c-button--entry-active");
    }
  });
});

// マイページログインボタン制御
$(document).ready(function () {
  const $loginBtn = $("#js-login");
  $("#login-form input").on("change", function () {
    if ($('#login-form input[type="email"]').val() !== "" && $('#login-form input[type="password"]').val() !== "") {
      $loginBtn.prop("disabled", false);
      $loginBtn.addClass("c-button--login-active");
    } else {
      $loginBtn.prop("disabled", true);
      $loginBtn.removeClass("c-button--login-active");
    }
  });
});

// 送信完了メッセージ
$(document).ready(function () {
  $("#form").submit(function (event) {
    var formData = $("#form").serialize();
    $.ajax({
      url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfMKZvRik8Rq2j4AcZhH_oZ3SDno5BpmsQtg-a5OdCVg_KoVg/formResponse",
      data: formData,
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          $(".u-submit-message__end").slideDown();
          $(".c-button--entry").fadeOut();
          //window.location.href = "thanks.html";
        },
        200: function () {
          $(".u-submit-message__false").slideDown();
        },
      },
    });
    event.preventDefault();
  });
});
