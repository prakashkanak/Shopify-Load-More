(function ($) {

    $.fn.kp_load_more = function (options) {

        return $(this).each(function (e) {

            var $this = $(this);
            var elements = typeof options.elements === 'undefined' ? false : options.elements;
            var per_page = typeof options.per_page === 'undefined' ? 3 : options.per_page;
            var json_url = typeof options.json_url === 'undefined' ? '' : options.json_url;
            var shopify = typeof options.shopify === 'undefined' ? false : options.shopify;
            
            $($this).after( '<button id="btn" class="load-btn">Load More..</button>' );
            
            var load_data = per_page;
            $.ajax({
                method: 'GET',
                url: json_url,
                dataType: 'JSON',
                success: function (d, msg) {
                    var data = d.products;
                    $(data).each(function (index) {
                        $this.append('<'+elements+' class="pro_item">Product Title : ' + this.title + '</'+elements+'>');
                        if (index === per_page) {
                            return false;
                        }
                    });
                },
                error: function (msg) {
                    alert(msg.statusText);
                }
            });

            $(document).on('click', '.load-btn', function () {
                load_data = load_data + per_page + 1;
                $.ajax({
                    method: 'GET',
                    url: json_url,
                    dataType: 'JSON',
                    success: function (d, msg) {
                        var data = d.products;
                        for (i = (load_data - per_page); i < data.length; i++) {
                            $this.append('<'+elements+' class="pro_item">Product Title : ' + data[i].title + ' == ' + i + '</'+elements+'>');
                            if (i == (load_data))
                                return false;
                        }

                    },
                    error: function (msg) {
                        alert(msg.statusText);
                    }
                });
                return false;
            });
        });// end loop

    };//end slider

}(jQuery));