var urlParam = new URLSearchParams(location.search);
var params = {
    category: 0,
    brand: 0,
    color: 0,
    min: 0,
    max: 100
};
for (let key in params) {
    if (!urlParam.has(key)) {
        urlParam.append(key, params[key]);
    }
}

$(document).ready(function () {
        for (let key in params) {
            var x = key;
            var y =urlParam.get(key);
            var control = $(`#${key}${urlParam.get(key)}`);
            $(control).prop("checked",true);
        }
    }
);

function selectParam(key, value, reset = false) {
    if (reset) {
        for (let key in params) {
            urlParam.set(key, params[key]);
        }
    }
    urlParam.set(key, value);
    url = `/products?${urlParam.toString()}`
    location.href = url;
}