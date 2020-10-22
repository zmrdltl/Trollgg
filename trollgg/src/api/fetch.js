const HEADER_APPJSON = "application/json";
const HEADER_WWWENCODED = "application/x-www-form-urlencoded;charset=UTF-8";

const bodyEncoder = (data) => {
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

const getServer = async (url, data) => {
  if (data === undefined) data = null;
  try {
    url = url + "?" + bodyEncoder(data);
    var res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: HEADER_APPJSON,
        "Content-Type": HEADER_WWWENCODED,
      },
    });
    if (res.ok) return res;
    console.log(await res.json());
    return null;
  } catch (e) {
    console.log("get" + e);
  }
};
