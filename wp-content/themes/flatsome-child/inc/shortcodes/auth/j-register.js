/*
 * aff_id
 * */
const urlParams = new URLSearchParams(window.location.search);
const aValue = urlParams.get("a");
let aff_id = "soibet";
if (aValue) {
  localStorage.setItem("aff_id", aValue);
  aff_id = aValue;
} else if (localStorage.getItem("aff_id")) {
  aff_id = localStorage.getItem("aff_id");
}
jQuery(document).ready(function ($) {
  if (aff_id) {
    let affIdMetaTag = $('meta[name="affId"]');
    if (affIdMetaTag.length === 0) {
      $("head").append('<meta name="affId" content="">');
      affIdMetaTag = $('meta[name="affId"]');
    }
    affIdMetaTag.attr("content", aff_id);
    if ($("form#loginForm").length) {
      $("form#loginForm").append(
        '<input type="hidden" name="aff_id" value="' + aff_id + '">'
      );
    }
    if ($("form#registerForm").length) {
      $("form#registerForm").append(
        '<input type="hidden" name="aff_id" value="' + aff_id + '">'
      );
    }
  }
});

/*
 * Register Form
 * */
jQuery(document).ready(function ($) {
  $(".j-register-form .show-pass").on("click", function (e) {
      const inputEl = $(this).closest(".form-group").find("input");
      $(this).hasClass("fa-eye-slash")
      ? ($(this).removeClass("fa-eye-slash"), $(this).addClass("fa-eye"), inputEl.attr("type", "password"))
      : ($(this).removeClass("fa-eye"), $(this).addClass("fa-eye-slash"), inputEl.attr("type", "text"));
  });
  $.validator.addMethod(
      "regex",
      function (n, e, t) {
      var r = new RegExp(t);
      return this.optional(e) || r.test(n);
      },
      ""
  ),
  onRegisterFrmSubmit();
});
var onRegisterFrmSubmit = function () {
jQuery.validator.addMethod(
  "phoneVN",
  function (phone_number, element) {
    phone_number = phone_number.replace(/\s+/g, "");
    return (
      this.optional(element) ||
      (phone_number.length >= 10 && phone_number.match(/^\+?[0-9]+$/))
    );
  },
  "Số điện thoại không hợp lệ."
);
jQuery("#registerForm").validate({
  rules: {
    phone: {
      required: true,
      phoneVN: true,
    },
    username: {
      required: !0,
      regex: /^[A-Za-z0-9]*$/g,
      minlength: 6,
      maxlength: 30,
    },
    password: {
      required: !0,
      minlength: 8,
      maxlength: 32,
      regex: /^[A-Za-z0-9-À-ỹ`~!@#$%^&*()\-_+={}\[\]|\\;:,<.>/?]{8,32}$/gim,
    },
    repeat_pwd: {
      required: !0,
      equalTo: "#pwd",
    },
  },
  messages: {
    phone: {
      required: "Vui lòng nhập số điện thoại.",
      phoneVN: "Số điện thoại không hợp lệ.",
    },
    username: {
      required: "โปรดป้อนชื่อผู้ใช้",
      regex: "Username รวมไปถึง a-z , 0-9",
      minlength: "Username ควรมีตัวอักษร 6-30 ตัว",
      maxlength: "Username ควรมีตัวอักษร 6-30 ตัว",
    },
    password: {
      required: "โปรดป้อนรหัสผ่าน",
      minlength: "Password ควรมีตัวอักษรอย่างน้อย 8 ตัว",
      regex: "รหัสผ่านต้องมีความยาวไม่เกิน 32 ตัว",
    },
    repeat_pwd: {
      required: "โปรดป้อนรหัสผ่าน",
      equalTo: "Please enter exactly your password",
    },
  },
  errorElement: "div",
  errorPlacement: function (n, e) {
    n.addClass("errors"),
      "checkbox" === e.prop("type")
        ? n.insertAfter(e.parent("label"))
        : n.insertAfter(e);
  },
  highlight: function (n, e, t) {},
  unhighlight: function (n, e, t) {},
  showErrors: function (n, e) {
    this.defaultShowErrors();
  },
  submitHandler: function (n) {
    return onRegister(), !1;
  },
});
};
var conf = {
wg: "soibet.net",
};

function httpGet(theUrl)
{
  let xmlhttp;
  
  if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  xmlhttp.onreadystatechange=function() {
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
          return xmlhttp.responseText;
      }
  }
  xmlhttp.open("GET", theUrl, false);
  xmlhttp.send();
  
  return xmlhttp.response;
}

var onRegister = function () {
var $ = jQuery;

var formData = {};
$("#registerForm")
  .find("input, select")
  .each(function (index, element) {
    formData[$(element).attr("name")] = $(element).val();
  });

$.ajax({
  url: "/wp-json/wp/v2/user-register",
  type: "POST",
  contentType: "application/json",
  data: JSON.stringify(formData),
  beforeSend: function (xhr) {
    xhr.setRequestHeader(
      "X-CSRF-Token",
      $('meta[name="csrf-token"]').attr("content")
    );
  },
  dataType: "json",
  success: function (e, t) {
    // Tracking DataLayer
    if (typeof dataLayer !== "undefined") {
      dataLayer.push({ event: "formSubmission", formName: "Form_Register" });
      dataLayer.push({ event: "formRegister", formName: "Form_Register" });
    }
    if (typeof _mgq !== "undefined") _mgq.push(["MgSensorInvoke", "DangKy"]);
    if (typeof fbq !== "undefined") fbq("track", "CompleteRegistration");
  
    // Remove value on field when request success and navigation to back
    $("#registerForm").find('input[name="username"]').val("");
    $("#registerForm").find('input[name="password"]').val("");
    window.location.href = `https://soibet.net/api/v2/lp/login?token=${e.data.token}&redirect=https://soibet.net`;
    
    // Remove loading state
    document.querySelector(".mfp-close").click();
  },
  error: function (e, t, n) {
    const localizedMessage = httpGet('https://soibet.net/api/v2/localizedMessage');
    $("#alert-modal").append(
      `<button type="button" class="mfp-close"></button>`
    );
    $("#alert-modal h4").html("ประกาศ");
  
    // console.log('error', e?.responseJSON?.message);
    // console.log('localizedMessage', localizedMessage);

    let message = e?.responseJSON?.message;
    const localizedMessageData = JSON.parse(localizedMessage)?.data;
    if(localizedMessageData) {
      for(key in localizedMessageData) {
        if(key.indexOf(message)!=-1) {
          message = localizedMessageData[key]?.th;
          break;
        }
      }
    }
    
    $("#alert-modal p").html(message);
    $('[href="#alert-modal"]').click();
  },
});
};