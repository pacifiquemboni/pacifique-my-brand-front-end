function sendmail() {
  let user = document.getElementById("signUserName").value;
  let email = document.getElementById("signEmail").value;
  let pass = document.getElementById("password2").value;
  // let people = document.getElementById("no._people").value;

  let msg =
    "Congratulations !!! Your room has been sucessfully Registered.This is the confirmation message regarding your Registration. Here is the details that you have entered<hr>";

  let body =
    msg +
    "<br>Name: " +
    user +
    "<br>Email: " +
    email +
    "<br>password : " +
   pass ;

  Email.send({
    SecureToken: "d5e03bae-c07d-457a-8070-ac349813703f",
    To: email,
    From: "pacifiquemboni@gmail.com",
    Subject: "ATC Brand Status",
    Body: body,
  }).then((message) => {
    if (message == "OK") {
      alert(
        "Your room has been booked successfully, check your e-mail for confirmation."
      );
    } else {
      console.error(message);
      alert("There is error at sending e-mail. ");
    }
  });
}
var Email = {
  send: function (a) {
    return new Promise(function (n, e) {
      (a.nocache = Math.floor(1e6 * Math.random() + 1)), (a.Action = "Send");
      var t = JSON.stringify(a);
      Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
        n(e);
      });
    });
  },
  ajaxPost: function (e, n, t) {
    var a = Email.createCORSRequest("POST", e);
    a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
      (a.onload = function () {
        var e = a.responseText;
        null != t && t(e);
      }),
      a.send(n);
  },
  ajax: function (e, n) {
    var t = Email.createCORSRequest("GET", e);
    (t.onload = function () {
      var e = t.responseText;
      null != n && n(e);
    }),
      t.send();
  },
  createCORSRequest: function (e, n) {
    var t = new XMLHttpRequest();
    return (
      "withCredentials" in t
        ? t.open(e, n, !0)
        : "undefined" != typeof XDomainRequest
        ? (t = new XDomainRequest()).open(e, n)
        : (t = null),
      t
    );
  },
};