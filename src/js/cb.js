    $(function(){
        $('body').append(`
            <footer class="_rows sticky pos-b">
                <a class="f-l btn btn-sm btn-dark" href="https://comebuycb.github.io/cb" target="_self">Home</a>
                <a class="f-r text-u" href="https://github.com/ComebuyCB/cb">https://github.com/ComebuyCB/cb</a>
            </footer>
        `)
    })
    
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


    // ===========================================================================
    // tab()用法範例:
    // <div js-tab-group="skiInfo">
    //     <button class="js-tab active" js-tab-target="#sb">單板</button>
    //     <button class="js-tab" js-tab-target="#ski">雙版</button>
    // </div>
    // <div js-tab-group="skiInfo">
    //     <div id="sb" class="js-tab-cont"> ~單板內容~ </div>
    //     <div id="ski" class="js-tab-cont"> ~雙板內容~ </div>
    // </div>
    // ===========================================================================
    function tab( eventType ){
        $('.js-tab-content').hide(); // 先將內容全部隱藏 (方便不用再寫display:none);

        // 將TAB上，class掛有active的，使它的目標內容show出
        $.each( $('.js-tab.active'), function(idx,val){
            let grp = $(val).closest('[js-tab-group]').eq(0).attr('js-tab-group'); // group名稱
            let tg = $(val).attr('js-tab-target'); // 目標內容名稱
            $('[js-tab-group='+grp+']').find(tg).addClass('active').show(); // 目標內容active & show()
        })

        eventType = eventType || 'click';
        // 當按下TAB後:
        $('.js-tab').on( eventType , function(){
            let grp = $(this).closest('[js-tab-group]').eq(0).attr('js-tab-group'); // group名稱
            let tg = $(this).attr('js-tab-target'); // 目標內容名稱
            
            $('[js-tab-group='+grp+']').children('.js-tab').removeClass('active'); // 群組內的TAB取消active (下一層)
            $('[js-tab-group='+grp+']').find(':not([js-tab-group])').find('.js-tab').removeClass('active'); // 群組內的TAB取消active (下下層後)
            $(this).addClass('active'); // 按下的TAB active

            $('[js-tab-group='+grp+']').children('.js-tab-content').removeClass('active').hide(); // 群組內的內容取消active & hide(); (下一層)
            $('[js-tab-group='+grp+']').find(':not([js-tab-group])').find('.js-tab-content').removeClass('active').hide(); // 群組內的內容取消active & hide(); (下下層後)
            $(tg).addClass('active').show(); // 目標內容active & show()
        });
    }


    // ====================================
    // 搜尋input的字，使目標秀出，非目標隱藏
    // ====================================
    function search_input( inputTag, compareTarget, container, hiddenTarget ){
        /**
         * 搜尋input的字 與container裡的compareTarget的字做比較，如果不同則使hiddenTarget隱藏。
         * @param {string} inputTag EX: this
         * @param {string} compareTarget EX: 'td'
         * @param {string} container EX: 'table'
         * @param {string} hiddenTarget EX: 'tr'
         */

        let input = $(inputTag).val();
        if (input == "" || input == undefined){
            $(hiddenTarget).show();
            return false;
        }

        let l_input = input.toString().toLowerCase();
        $(hiddenTarget).hide();

        $.each( $(container + ' ' + compareTarget ) ,function(idx,val){
            let l_text = $(val).text().toString().toLowerCase();
            if ( l_text.indexOf(l_input) > -1 ){
                $(val).closest(hiddenTarget).show();
            }
        })
    }