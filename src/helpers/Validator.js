let disposableEmailArray = [
  "0815.ru",
  "0815.ru0clickemail.com",
  "0815.ry",
  "0815.su",
  "0845.ru",
  "0clickemail.com",
  "0-mail.com",
  "0wnd.net",
  "0wnd.org",
  "yopmail.com",
];
class Validators {
  static validEmail(email) {
    var reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return reg.test(email) && !disposableEmailArray.includes(email.split("@")[1]);
  }
  static validName(name) {
    var reg = /^[A-Z]+$/i;
    return reg.test(name);
  }
}
export default Validators;
