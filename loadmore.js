(function ($) {

    $.fn.kp_load_more = function (options) {

        return $(this).each(function (e) {

            var $this = $(this);
            var elements = typeof options.elements === 'undefined' ? false : options.elements;
            var per_page = typeof options.per_page === 'undefined' ? 3 : options.per_page - 1;
            var load_data = typeof options.load_data === 'undefined' ? 3 : options.load_data - 1;
            var json_url = typeof options.json_url === 'undefined' ? '' : options.json_url;
            var shopify = typeof options.shopify === 'undefined' ? false : options.shopify;

            $($this).after('<button id="btn" class="load-btn btn large" data-page="1">View More</button>');

            $.ajax({
                method: 'GET',
                url: json_url,
                dataType: 'JSON',
                success: function (d, msg) {
                    var data = d.products;
                    console.log(data);
                    $(data).each(function (index) {
                        $this.append('<' + elements + ' class="product ' + index + '"><figure><a href="#"><img src="'+ this.images[0].src + '>"</a><figcaption><h6><a href="/products/' + this.handle + '">' + this.title + '</a></h6><p>$' + this.variants[0].price + '</p></figcaption></figure>' + '</' + elements + '>');
                        if (index === per_page) {
                            return false;
                        }
                    });
                },
                error: function (msg) {
                    alert(msg.statusText);
                }
            });
            var next_item = '';
            $(document).on('click', '.load-btn', function () {
                next_page = parseInt($(this).attr('data-page'));
                $(this).attr('data-page', next_page + 1);
                next_item = per_page + 1;
                if (next_page != 1) {
                    next_item = break_item + 1;
                }
                break_item = next_item + load_data;
                console.log(next_item + ' == ' + load_data + '==' + next_page + '==' + break_item);
                $.ajax({
                    method: 'GET',
                    url: json_url,
                    dataType: 'JSON',
                    success: function (d, msg) {
                        var data = d.products;
                        for (i = next_item; i < data.length; i++) {

                            $this.append('<' + elements + ' class="product ' + i + '"><figure><a href="#"><img src="'+ data[i].images[0].src + '>"</a><figcaption><h6><a href="/products/' + data[i].handle + '">' + data[i].title + '</a></h6><p>$' + data[i].variants[0].price + '</p></figcaption></figure>' + '</' + elements + '>');
                            if (i == (data.length - 1)) {
                                $('#btn').hide();
                                console.log('hide');
                            }
                            if (i == (break_item)) {
                                return false;
                            }

                        }
                    },
                    error: function (msg) {
                        alert(msg.statusText);
                    }
                });

                //return false;
            });
        });// end loop

    };//end slider

}(jQuery));