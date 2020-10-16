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
const getLocalStorageData = function(storageName){
  let localToken = window.localStorage.getItem(storageName);
  return localToken === null ? false : localToken; 
}

let AUTH_USER = function () {
  return getLocalStorageData('token')
    ? { Authorization: "Bearer " + getLocalStorageData("token") }
    : getLocalStorageData("token");
};
export { getCookie, getLocalStorageData, AUTH_USER };
