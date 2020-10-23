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

export const getServer = async (url, data) => {
  if (data === undefined) data = null;
  try {
    url = url + "?" + bodyEncoder(data);
    const proxyurl = "https://cors-anywhere.herokuapp.com/"; //cors policy proxy server로 우회
    const res = fetch(proxyurl + url, {
      method: "GET",
      headers: {
        Accept: HEADER_APPJSON,
        "Content-Type": HEADER_WWWENCODED,
      },
    }) // https://cors-anywhere.herokuapp.com/https://example.com
      .then((response) => response.text())
      .catch(() =>
        console.log("Can’t access " + url + " response. Blocked by browser?")
      );
    if (res.ok) return res;
    return null;
  } catch (e) {
    console.log("get" + e);
  }
};
