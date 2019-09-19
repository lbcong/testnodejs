var urlParam = new URLSearchParams(location.search);
var params = {
    category: 0,
    brand: 0,
    color: 0,
    min: 0,
    max: 100,
    limit: 9,
    page: 1,
    sort: 'name',
    search: '',
};
var checkboxes = ['category', 'brand', 'color'];
for (let key in params) {
    if (!urlParam.has(key)) {
        urlParam.append(key, params[key]);
    }
}

$(document).ready(function () {
        for (let key in params) {
            var control = $(`#${key}${urlParam.get(key)}`);
            $(control).prop("checked", true);
        }
        for (let key in checkboxes) {
            var control = $(`#${key}${urlParam.get(key)}`);
            $(control).prop("checked", true);
        }
        $('#sort').val(urlParam.get('sort'));
        $('#limit').val(urlParam.get('limit'));
        $('#pagination ul').addClass('pagination');
        $('#pagination li').addClass('page-item');
        $('#pagination li a').addClass('page-link');
        var originPage = urlParam.get('page');
        $('#pagination li a').each(function (index, item) {
            var page = $(item).attr('href').split("=")[1];
            urlParam.set('page', page);
            var url = `/products?${urlParam.toString()}`;
            $(item).attr('href',url);
        });
        urlParam.set('page', originPage);
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