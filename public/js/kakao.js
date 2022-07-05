Kakao.init("cd664b3f2a4245dd7ce8d9275a02b836");
Kakao.isInitialized();

document.getElementById("logout").style.display = "none";

function kakaoLogin() {
  Kakao.Auth.login({
    success: function (response) {
      Kakao.API.request({
        url: "/v2/user/me",
        success: function (response) {
          console.log(response);
          document.getElementById("user").innerHTML =
            response.kakao_account.profile.nickname + "님";
          document.getElementById("user").style.display = "block";
          document.getElementById("login").style.display = "none";
          document.getElementById("logout").style.display = "block";
          alert(
            response.kakao_account.profile.nickname + "님 로그인 되었습니다."
          );
        },
      });
    },
  });
}
function kakaoLogout() {
  if (Kakao.Auth.getAccessToken()) {
    Kakao.API.request({
      url: "/v1/user/unlink",
      success: function (response) {
        console.log(response);
        document.getElementById("user").style.display = "none";
        document.getElementById("login").style.display = "block";
        document.getElementById("logout").style.display = "none";
        alert("로그아웃 되었습니다.");
      },
    });
    Kakao.Auth.setAccessToken(undefined);
  }
}
