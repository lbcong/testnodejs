// lay param tren url
var urlParam = new URLSearchParams(location.search);
// tao mang param
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
// tao mang checkbox
var checkboxes = ['category', 'brand', 'color'];
// them param vao param tren url
for (let key in params) {
    if (!urlParam.has(key)) {
        urlParam.append(key, params[key]);
    }
}

$(document).ready(function () {
        // kiem tra param nao duoc check
        for (let key in params) {
            var control = $(`#${key}${urlParam.get(key)}`);
            $(control).prop("checked", true);
        }
        // kiem tra checkbox nao duoc check
        for (let key of checkboxes) {
            var control = $(`#${key}${urlParam.get(key)}`);
            $(control).prop("checked", true);
        }
        // hien thi sort va phan trang
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
            $(item).attr('href', url);
        });
        urlParam.set('page', originPage);

        // cart
        $('.add-to-cart').on('click', function () {
            let id = $(this).data('id');
            let quantity = $('#sst') ? $('#sst').val() : 1;
            $.ajax({
                url: '/carts',
                type: 'POST',
                data: {id, quantity},
                success: function (rs) {
                    $('#cart-badge').html(rs.totalQuantity);
                }
            });
        });

        $('#closebtn').hide();
        // rating
        let rating = $('#rating').val();
        showStars(rating);

        $('#starList i').on('click', function () {

            let rating = getRating(this);
            $('#rating').val(rating);
            showStars(rating);

        });

        $('#starList i').on('mouseover', function () {
            let rating = getRating(this);
            showStars(rating);

        })
        $('#starList i').on('mouseout', function () {
            let rating = $('#rating').val();
            showStars(rating);

        })
    }
);

function getRating(star) {
    let stars = $('#starList i');
    let i = 0;
    for (i = 0; i < 5; i++) {
        if ($(stars[i]).get(0) == star) {
            return (i + 1);
        }
    }
    return i;
}

function showStars(rating) {
    let stars = $('#starList i');

    for (let i = 0; i < 5; i++) {
        $(stars[i]).removeClass('disabled');
    }
    for (let i = rating; i < 5; i++) {
        $(stars[i]).addClass('disabled');
    }
    let starNames = ['Please select rating', 'Wost', 'Bad', 'Ok', 'Good', 'Outstanding'];
    $('#starName').html(starNames[rating]);
}

function showReply(parentCommentId, fullname) {
    $('#closebtn').show();
    $('#reply').html('reply: ' + fullname);
    $('#parentCommentId').val(parentCommentId);
}

function removeReply() {
    $('#closebtn').hide();
    $('#reply').html('');
    $('#parentCommentId').val('');
}

// bat su kien them param vao url
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

function clearCart() {
    if (confirm('do you want clear cart ?'))
        $.ajax({
            url: '/carts/all',
            type: 'DELETE',
            success: function () {
                $('#cart-badge').html('0');
                $(`#cart-body`).html("<div class='alert alert-info text-center'>your cart is empty</div>");
            }
        })

}

function updateCart(id, quantity) {
    if (quantity == 0) {
        // remove
        $.ajax({
            url: '/carts',
            type: 'DELETE',
            data: {id, quantity},
            success: function (rs) {
                $('#cart-badge').html(rs.totalQuantity);
                $('#totalPrice').html('$' + rs.totalPrice);
                if (rs.totalQuantity > 0) {
                    $(`#item-id${id}`).remove();
                } else {
                    $(`#cart-body`).html("<div class='alert alert-info text-center'>your cart is empty</div>");
                }
            }
        });
    } else {
        //update
        $.ajax({
            url: '/carts',
            type: 'PUT',
            data: {id, quantity},
            success: function (rs) {
                $('#cart-badge').html(rs.totalQuantity);
                $('#totalPrice').html('$' + rs.totalPrice);
                $(`#price${id}`).html('$' + rs.item.price);
            }
        });
    }

}