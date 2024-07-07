var KHelper = {
    _formatString: function (str) {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
     
        return str;
    },
};

jQuery(document).ready(function ($) {
    var KApp = {
        init: function () {
            this.add_readmore_button();
        },

        // Will add readmore button to all the wrapper class .k-readmore-box automatically
        add_readmore_button: function () {
            var hidden_block_view = function(element, your_height = 150) {
                var wrap = element;
                var current_height = wrap.height();
                if (current_height > your_height) {
                    wrap.css('height', your_height + 'px');
                    wrap.append(function () {
                        return '<div class="devvn_readmore_flatsome"><span title="Xem thêm" href="javascript:void(0);">Xem thêm</span></div>';
                    });
                    $('body').on('click','.devvn_readmore_flatsome', function () {
                        wrap.removeAttr('style');
                        $('body .devvn_readmore_flatsome').remove();
                    });
                }
            };

            if ($('.k-readmore-box').length > 0) {
                hidden_block_view($('.k-readmore-box'), 300);                     
            }
        },

    }

    KApp.init();
});