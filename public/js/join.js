//joinform_check 함수로 유효성 검사
function joinform_check() {

    var uid = document.getElementById("uid");
    var pwd = document.getElementById("pwd");
    var repwd = document.getElementById("repwd");
    var uname = document.getElementById("uname");
    var mobile = document.getElementById("mobile");
    var email_id = document.getElementById("email_id");
    var agree = document.getElementById("agree");

 
    // 생년월일 유효성 검사
  
    if (uid.value == "") {
      alert("아이디를 입력하세요.");
      uid.focus(); 
      return false;
    };
  
    if (pwd.value == "") {
      alert("비밀번호를 입력하세요.");
      pwd.focus();
      return false;
    };
  
    var pwdCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  
    if (!pwdCheck.test(pwd.value)) {
      alert("비밀번호는 영문자+숫자+특수문자 조합으로 8~25자리 사용해야 합니다.");
      pwd.focus();
      return false;
    };
  
    if (repwd.value !== pwd.value) {
      alert("비밀번호가 일치하지 않습니다.");
      repwd.focus();
      return false;
    };
  
    if (uname.value == "") {
      alert("이름을 입력하세요.");
      uname.focus();
      return false;
    };
    
    var reg = /^[0-9]+/g; 
  
    if (!reg.test(mobile.value)) {
      alert("전화번호는 숫자만 입력할 수 있습니다.");
      mobile.focus();
      return false;
    }
  
    if (email_id.value == "") {
      alert("이메일 주소를 입력하세요.");
      email_id.focus();
      return false;
    }
  
    if (!agree.checked) {
      alert("약관 동의를 체크하세요.");
      agree.focus();
      return false;
    }
  
    document.join_form.submit(); 
  }
  
  function id_check() {
    window.open("", "", "width=600, height=200, left=200, top=100");
  }
  
  function change_email() {
    var email_add = document.getElementById("email_add");
    var email_sel = document.getElementById("email_sel");
  
    var idx = email_sel.options.selectedIndex;
    var val = email_sel.options[idx].value;
  
    email_add.value = val;
  }
  
  function search_address() {
    window.open("", "b", "width=600, height=300, left=200, top=100");
  }