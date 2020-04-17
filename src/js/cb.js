    


    // ============
    //	僅能輸入數字
    // ============
    function ValidNum( e, val ){
        if (!/^\d+[.]?[1-9]?$/.test(val)){
            e.value = /\d+[.]?[1-9]?/.exec(e.value);
        }
        return e.value;
    }

    // =================================
    // 超過n個字以...取代，會忽略htmlTag。
    // =================================
    function dadada(tg,len){
        /*	EX: <div id="a">Hello World!!</div>
                <script>dadada("#a",7)<／script>
            RE: Hello W...
        */
        $.each( $(tg), function(idx,val){
            if( $(val).text().length > len){
                let str = $(val).text().substring(0,len) + '...';
                $(val).text(str);
            };
        })
    }

    function tab(){
        $.each($('.js-tab.active'),function(idx,val){
            let tId = $(val).attr('js-tab-target');
            $(tId).addClass('active').show();
        })
        $('.js-tab').on('click', function(){
            let grp = $(this).closest('[js-tab-group]').eq(0).attr('js-tab-group');
            let tId = $(this).attr('js-tab-target');$('[js-tab-group='+grp+']').find('.js-tab').removeClass('active');
            $(this).addClass('active');
            $('[js-tab-group='+grp+']').find('.js-tab-content').removeClass('active').hide();
            $(tId).addClass('active').show();
        });
    }