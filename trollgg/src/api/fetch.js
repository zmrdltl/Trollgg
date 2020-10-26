const HEADER_APPJSON = "application/json";
const HEADER_WWWENCODED = "application/x-www-form-urlencoded;charset=UTF-8";

export const bodyEncoder = (data) => {
  if (data === undefined) data = null;
  var formBody = [];
  for (var property in data) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  return formBody;
};

export const getServerForMatchList = async (url, data) => {
  if (data === undefined) data = null;
  try {
    url = url + bodyEncoder(data);
    console.log("url!! :", url);
    //const proxyurl = "https://cors-anywhere.herokuapp.com/"; //cors policy proxy server로 우회
    const res = await fetch(url) // https://cors-anywhere.herokuapp.com/https://example.com
      .then((res) => res.json())
      .catch(() =>
        console.log("Can't access " + url + " response. Blocked by browser?")
      );
    console.log("web server response from rest api server!", res);
    return res;
  } catch (e) {
    console.log("get" + e);
  }
};

//local용 getServer
export const getServer = async (url, data) => {
  if (data === undefined) data = null;
  try {
    url = url + encodeURI(data);
    console.log("url!! :", url);
    //const proxyurl = "https://cors-anywhere.herokuapp.com/"; //cors policy proxy server로 우회
    const res = await fetch(url) // https://cors-anywhere.herokuapp.com/https://example.com
      .then((res) => res.json())
      .catch(() =>
        console.log("Can't access " + url + " response. Blocked by browser?")
      );
    console.log("web server response from rest api server!", res);
    return res;
  } catch (e) {
    console.log("get" + e);
  }
};
