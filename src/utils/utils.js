import moment from "moment";
const getCookie = function (cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
};
const getLocalStorageData = function (storageName) {
  let localToken = window.localStorage.getItem(storageName);
  return localToken === null ? false : localToken;
};

let AUTH_USER = function () {
  return getLocalStorageData("token")
    ? { Authorization: "Bearer " + getLocalStorageData("token") }
    : getLocalStorageData("token");
};

let validateEmail = function (email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

function calculate_age(dob) {
  let doB = new Date(dob);
  var diff_ms = Date.now() - doB.getTime();
  var age_dt = new Date(diff_ms);
  // console.log(age_dt.getUTCFullYear() - 1970);
  return Math.abs(age_dt.getUTCFullYear() - 1970);
}
function createMarkup(content) {
  return { __html: content };
}
function convertDate(date) {
  return moment(date).format("MMMM Do YYYY");
}
export {
  convertDate,
  getCookie,
  getLocalStorageData,
  AUTH_USER,
  validateEmail,
  calculate_age,
  createMarkup,
};
