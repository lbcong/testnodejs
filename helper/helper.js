var helper = {};
helper.createStarList = (stars) => {
    string = `<ul class="list">
                                        <li><a href="#">5 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i
                                                class="fa fa-star"></i><i
                                                class="fa fa-star"></i><i class="fa fa-star"></i> ${stars[4]}</a></li>
                                        <li><a href="#">4 Star <i class="fa fa-star disabled"></i><i class="fa fa-star"></i><i
                                                class="fa fa-star"></i><i
                                                class="fa fa-star"></i><i class="fa fa-star"></i> ${stars[3]}</a></li>
                                        <li><a href="#">3 Star <i class="fa fa-star disabled"></i><i class="fa fa-star disabled"></i><i
                                                class="fa fa-star"></i><i
                                                class="fa fa-star"></i><i class="fa fa-star"></i> ${stars[2]}</a></li>
                                        <li><a href="#">2 Star <i class="fa fa-star disabled"></i><i class="fa fa-star disabled"></i><i
                                                class="fa fa-star disabled"></i><i
                                                class="fa fa-star"></i><i class="fa fa-star"></i> ${stars[1]}</a></li>
                                        <li><a href="#">1 Star <i class="fa fa-star disabled"></i><i class="fa fa-star disabled"></i><i
                                                class="fa fa-star disabled"></i><i
                                                class="fa fa-star disabled"></i><i class="fa fa-star"></i> ${stars[0]}</a></li>
                                    </ul>`;
    return string;
};

helper.createStarVote = (vote) => {
    string = ``;
    for (var i = 0; i < vote; i++) {
        string += '<i class="fa fa-star"></i>';
    }
    for (; i < 5; i++) {
        string += '<i class="fa fa-star disabled"></i>';
    }

    return string;
}
module.exports = helper;