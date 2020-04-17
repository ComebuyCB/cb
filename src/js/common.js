/* -------- 一般 -------- */
    // ==================================
    // 因安卓webView無法重新整理，特殊處理
    // ==================================
    function window_location_reload() {
        let url = window.location.href;
        let regex = new RegExp('#');
        if (regex.test(url)){
            let regex2 = new RegExp('\/#|\%2F#');
            if (regex2.test(url)){
                url = url.replace( regex2 ,'#')
                window.location.href = url;
            }else{
                url = url.replace( regex ,'/#')
                window.location.href = url;
            }
        }else{
            window.location.reload();
        }
    }

    // =============
    // 回傳是否為裝置
    // =============
    function isMobile(){
        let mobiles = [
            "midp", "j2me", "avant", "docomo", "novarra", "palmos", "palmsource", "240x320", "opwv", "chtml", "pda", "windows ce", "mmp/", "blackberry", "mib/", "symbian", "wireless",
            "nokia", "hand", "mobi", "phone", "cdm", "up.b", "audio", "sie-", "sec-", "samsung", "htc", "mot-", "mitsu", "sagem", "sony", "alcatel", "lg", "eric", "vx", "NEC",
            "philips", "mmm", "xx", "panasonic", "sharp", "wap", "sch", "rover", "pocket", "benq", "java", "pt", "pg", "vox", "amoi", "bird", "compal", "kg", "voda", "sany",
            "kdd", "dbt", "sendo", "sgh", "gradi", "jb", "dddi", "moto", "iphone", "android", "iPod", "incognito", "webmate", "dream", "cupcake", "webos", "s8000", "bada", "googlebot-mobile"
        ]
        let ua = navigator.userAgent.toLowerCase();
        let isM = false;
        for (var i = 0; i < mobiles.length; i++) {
            if (ua.indexOf(mobiles[i]) > 0) {
                isM = true;
                return isM;
            }
        }
        return isM;
    }

    // =====================================
    // 陣列中尋找字串，對應的字串組回陣列返回
    // =====================================
    function arrSearch_containInput(input, arrWords, maxOutput) {
        /**
         * 陣列尋找字串，輸入字返回對應的字串
         * @param {string} input 輸入字串
         * @param {array -> string} arrWords 要搜索的資料
         * @param {number} maxOutput 最多輸出結果
         * @returns {array} 輸出結果
         */
        let arr = [];
        if ( input != '' ){
            arrWords.forEach( function( elem ){
                if ( maxOutput && arr.length >= maxOutput ){
                    return;
                }
                var lcaseInput = input.toString().toLowerCase();
                var lcaseWord = elem.toString().toLowerCase();
                if( lcaseWord.indexOf(lcaseInput) > -1 ){
                    arr.push(elem);
                }
            })
        }
        return arr;
    }


    // ========================
    // 使目標底下的img自適應大小
    // ========================
    function editor_field_img_resize( target ){
        /**
         * 使target底下的img自適應大小
         * @param {string} target 目標target
         */
        let imgs = $(target).find('img');
        $.each( imgs, function( idx, ele){
            if ( $(ele).width() >= 680 ){
                $(ele).addClass('w-100 h-auto');
            }
        })
        let video = $(target).find('video');
        $.each( video, function( idx, ele){
            if ( $(ele).width() >= 680 ){
                $(ele).addClass('w-100 h-auto');
            }
        })
    }


    // ============================
    // 檔案點選圖片後，立即顯示圖片
    // ============================
    // function uploadToShowImage(self, target, img) {
    //     /**
    //      * input type file to upload image will show image on target
    //      * @param {string} self input this
    //      * @param {string} target which image to show?
    //      * @param {boolen} img <img> or background-image ? true:<img>
    //      * @example <input type="file" onchange="uploadToShowImage(this, '#img', true)"><img id="img" src="#" style="display:none">
    //      */
    //     if (self.files && self.files[0]) {
    //         var reader = new FileReader();

    //         reader.onload = function(e) {
    //             if (img){
    //                 $(target).attr('src', e.target.result).show();
    //             }else{
    //                 $(target).css('background-image', 'url(' + e.target.result + ')' );
    //             }
    //         }
    //         reader.readAsDataURL(self.files[0]);
    //     }else{
    //         if (img){
    //             $(target).hide();
    //         }else{
    //             $(target).css('background-image', '');
    //         }
    //     }
    //     $(self).trigger('blur'); //只為了jquery validate能及時給錯誤訊息
    // }

    
    // ================================
    // 處理圖片壓縮 ( 需載入exif.js套件)
    // ================================
    function dealImage( inputurl, option, callback, img_index ) {
        /**
         * 圖片壓縮，預設同比例壓縮 ( 需載入exif.js套件)
         * @param {Object} inputurl 圖片路徑( base64 / blob )等...
         * @param {Object||bool} option 設定壓縮的寬、高、品質。|| true:默認壓縮大小 / false:不壓縮
         * @param {Object} callback 回撥函式有一個引數，base64的字串資料
         * @param {Object} img_index (選用) 返回callback時，也回傳img_index值
         */

        //壓縮設定: maxWidth: number(最大寬度), maxHeight: number(最大高度), quality: 0-1(品質)。
        console.log(inputurl)
        if ( option === true ){
            option = {
                maxWidth: 1024,
                maxHeight: 1024,
                quality: 1
            }
        }

        let img = new Image();
        img.src = inputurl;
        img.onload = function(){
            let self = this;
            // 預設按比例壓縮
            let w = self.width;
            let h = self.height;
            if ( option.maxWidth && w > option.maxWidth ){
                let scale = w / option.maxWidth;
                w = option.maxWidth;
                h = h / scale;
            }
            if ( option.maxHeight && h > option.maxWidth ){
                let scale = h / option.maxHeight;
                h = option.maxHeight;
                w = w / scale;
            }

            // 生成canvas
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');

            canvas.width = w;
            canvas.height = h;

            // 手機照片旋轉
            let Orientation = 1;
            EXIF.getData(self, function() {
                Orientation = EXIF.getTag(this, 'Orientation');
            });

            if(Orientation && Orientation != 1){
                switch(Orientation){
                    case 6:     // 旋转90度
                        canvas.width = h;
                        canvas.height = w;
                        ctx.rotate(Math.PI / 2);
                        ctx.drawImage(this, 0, -h, w, h);
                        break;
                    case 3:     // 旋转180度
                        ctx.rotate(Math.PI);
                        ctx.drawImage(this, -w, -h, w, h);
                        break;
                    case 8:     // 旋转-90度
                        canvas.width = h;
                        canvas.height = w;
                        ctx.rotate(3 * Math.PI / 2);
                        ctx.drawImage(this, -w, 0, w, h);
                        break;
                    default:
                        ctx.drawImage(this, 0, 0, w, h);
                }
            }else{
                ctx.drawImage(this, 0, 0, w, h);
            }

            let quality = ( option.quality && option.quality > 0 && option.quality < 1 ) ? option.quality : 1;
            let base64 = canvas.toDataURL('image/jpeg', quality);
            // 回撥函式返回base64的值
            callback( base64, img_index);
        }
    }

    // function b64toFile( base64, oriName ){
    //     let block = base64.split(";"); // Split the base64 string in data and contentType
    //     let contentType = block[0].split(":")[1]; // In this case "image/xxx"
    //     let realData = block[1].split(",")[1];// In this case "iVBORw0KGg...."
    //
    //     let blob = b64toBlob(realData, contentType);// Convert to blob
    //     let file = new File( [blob], oriName, {type: contentType});
    //     return file;
    // }

    // function b64toBlob(b64Data, contentType, sliceSize) {
    //     /* (可當作套件使用) */
    //     contentType = contentType || '';
    //     sliceSize = sliceSize || 512;
    //     let byteCharacters = atob(b64Data);
    //     let byteArrays = [];
    //     for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    //         let slice = byteCharacters.slice(offset, offset + sliceSize);
    //         let byteNumbers = new Array(slice.length);
    //         for (let i = 0; i < slice.length; i++) {
    //             byteNumbers[i] = slice.charCodeAt(i);
    //         }
    //         let byteArray = new Uint8Array(byteNumbers);
    //         byteArrays.push(byteArray);
    //     }
    //     let blob = new Blob(byteArrays, {type: contentType});
    //     return blob;
    // }
/* -------- /一般 -------- */


/* -------- 加入 其他套件 -------- */
    // ======================================
    // 使目標底下的img套用fancybox的瀏覽方式。
    // ======================================
    function editor_field_img_with_fancybox( target, ignoreId = [] ){
        /**
         * 讓某目標底下的img全部套用，img變可用fancybox的瀏覽方式。
         * @param {string} target 套用到此目標 EX: '.editor_field'
         * @param {array} ignoreId 排除例外的id (同目標的tag) EX: ['tab2','tab8']
         */
        $.each( $(target), function(idx,ele){
            // 排除例外的tag
            let skip = false;
            if (ignoreId.length > 0){
                let tagId = $(ele).attr('id');
                for(let i=0; i<ignoreId.length; i++ ){
                    if ( tagId == ignoreId[i] ){
                        skip = true;
                    }
                }
            }
            if (skip){ return;}

            // 找尋img的src，並將他們加入fancybox所需的'data-fancybox'、'href'
            let imgs = $(ele).find('img');

            $.each( imgs, function( imgs_idx, imgs_ele){
                let img_alt = $(imgs_ele).attr('alt');
                if (img_alt && img_alt.toLowerCase() === "x"){
                    return true;
                }
                $(imgs_ele).attr( 'data-fancybox','group-' + (idx+1) );
                let img_src = $(imgs_ele).attr('src');
                $(imgs_ele).attr('href',img_src);
            })
        })
    }

    // ==============
    // fancybox預設值
    // ==============
    function setting_fancybox(group){
        group = group ? '='+group : '';
        $('[data-fancybox'+group+']').fancybox({
            buttons: ['close'],
            arrows: false,
        });
    }

    // ================================================
    // 客製化上傳圖片 ( 需載入Bootstrap File Input套件)
    // ================================================
    // function upload_dialog(obj){
    //     /**
    //      * 按下後會跳出上傳多張圖片的FM
    //      * @param {string} obj.title FM title;
    //      * @param {string} obj.action form action;
    //      * @param {string} obj.csrf;
    //      * @param {number} obj.maxPhoto 限制最多上傳幾張圖片, 默認10張;
    //      * @param {function} obj.func_ok;
    //      */
    //     let maxPhoto = obj.maxPhoto ? obj.maxPhoto : 10;
    //     let msg = `
    //         <form id="upload_form" action="${obj.action}" method="post" enctype="multipart/form-data">
    //             ${obj.csrf}
    //             <div class="file-loading">
    //                 <input id="photos" name="photos[]" multiple type="file">
    //             </div>
    //         </form>
    //         <div id="kartik-file-errors"></div>
    //     `
    //     confirm_modal( obj.title, msg, obj.func_ok, obj.func_cancel );

    //     $("#photos").fileinput({
    //         showPreview: true,
    //         showUpload: false,
    //         showRemove: false,
    //         showUploadStats: false,
    //         showCaption: false,
    //         dropZoneTitle: '尚未有任何圖片...',
    //         elErrorContainer: '#kartik-file-errors',
    //         allowedFileExtensions: ["jpeg", "jpg", "png", "bmp"],
    //         msgInvalidFileExtension: '檔案規格限制："{extensions}"為副檔名的檔案',
    //         maxFileSize: 1024*5 ,
    //         msgSizeTooLarge: "圖片大小不得超過 {maxSize}KB",
    //         maxFileCount: maxPhoto,
    //         msgFilesTooMany: '上傳圖片數量過多, 僅提供圖片上傳{m}張',
    //         layoutTemplates:{
    //             actions: '',
    //             btnBrowse: '<button tabindex="500" class="btn btn-success btn_sm btn-file mb-10"{status}><i class="fa fa-upload"></i> 上傳圖片</button>',
    //         },
    //     });
    // }
    
    // ==============
    // 客製化img 驗證
    // ==============
    function jquery_validate_img(){
        $.validator.addMethod("img_type", function(value, element, param) {
            if (value){
                return value.toLowerCase().match(new RegExp("^.+\.(" + param + ")$"));
            }else{
                return true;
            }
        }, "檔案規格限制：<wbr>{0} <wbr>為副檔名的檔案</div>");

        $.validator.addMethod('img_size', function (value, element, param) {
            return this.optional(element) || (element.files[0].size / 1024 <= param)
        }, "圖片大小不得超過{0}KB");
    }

    // ====================
    // jquery.validate 驗證
    // ====================
    function jquery_validate_regex( name="regex" ){
        $.validator.addMethod(name, function(value, element, param) {
            if (value){
                return value.match(new RegExp("^" + param + "$"));
            }else{
                return true;
            }
        });
    }
/* -------- /加入 其他套件 -------- */


/* -------- 畫面調整 -------- */
    // ====================
    // auth頁面 畫面高度調整
    // ====================
    function fix_login_layouts(){
        $('#login_outer_container').css( 'min-height','auto');
        let hh = $('html').height();
        let ch = $('#login_outer_container').height();

        $('#login_outer_container').css( 'min-height', ch > hh ? ch : hh );
        $('.auth_footer').css( 'position', ch > hh ? 'relative' : 'fixed' );
    }

    // ==============
    // 調整FM內容高度
    // ==============
    function fix_FM_layouts(){
        let hh = $('html').height();
        $('.FM-content').css( 'max-height' , hh - 300 );
        $('.FM-content').attr( 'commonjs-remark', '參考fix_FM_layouts' )
    }

    // ==============
    // 調整header高度
    // ==============
    function fix_header_layouts(){
        let hh = $('.header').innerHeight();
        $('header').css( 'height' , hh );
        $('header').attr( 'commonjs-remark', '參考fix_header_layouts' )
    }

    // =======================
    // scroll時,調整header位置
    // =======================
    function scroll_toggle_header(){
        let hh = $('.header').innerHeight();
        let before_s = $(window).scrollTop();
        $(window).on('scroll',function(){
            let after_s = $(window).scrollTop();
            if (after_s > before_s){
                $('.header').css('position','relative');
            }else{
                $('.header').css('position','fixed');
            }
            before_s = after_s;
        });
    }

    // ==================
    // 擋下submit按鈕數秒
    // ==================
    function type_submit_onsubmit(){
        $('[type=submit]').attr('disabled','disabled');
        let t = setTimeout( function(){
            $('[type=submit]').removeAttr('disabled');
            clearTimeout(t);
        }, 1000 );
    }
/* -------- /畫面調整 -------- */


/* -------- 全站設定 settings -------- */
    $(window).on('resize',function(){
        fix_FM_layouts(); // 調整FM內容高度
    });

    $(function(){
        fix_FM_layouts(); // 調整FM內容高度
        fix_header_layouts(); // 調整header高度
    });

    // 當form submit時，擋下submit按鈕數秒
    $('form').unbind().on('submit',function(e){
        type_submit_onsubmit();
    })
/* -------- /全站設定 settings -------- */


/* -------- 導下一頁，紀錄cookie -------- */
    // =================================
    // 導下一頁，並將此頁的網址記入cookie
    // =================================
    function window_location_rmb_prepage(url){
        /**
         * 使下一頁用cookie記住這一頁的網址，之後使用window_location_href_prepage()即可跳回上一頁;
         * @param {string} url
         */
        url = '/#' + url; //ionic用
        let regex = new RegExp( window.location.origin );
        let nextPage = url.replace( regex,'' );

        let nowPage = window.location.href.replace( regex,'' );

        let ck_arr = JSON.parse( getCookie('prepage') );
        if (ck_arr && typeof(ck_arr) == 'object' && ck_arr.length > 0 ){
            let hasP = false;
            $.each( ck_arr, function(i,e){
                if ( e.nowPg == nextPage ){
                    e.prePg = nowPage;
                    hasP = true;
                    return false;
                }
            })
            if( hasP === false ){
                ck_arr.push( {'nowPg':nextPage, 'prePg':nowPage} )
            }
        }else{
            ck_arr = [ {'nowPg':nextPage, 'prePg':nowPage} ]
        }
        setCookie('prepage', JSON.stringify(ck_arr) );
        window.location = nextPage;
    }

    // ===============================================
    // 導下一頁，若cookie有紀錄網址，則優先使用cookie的
    // ===============================================
    function window_location_href_prepage(url){
        /**
         * 回上一頁，利用cookie找到設定上一頁的網址，需配合window_location_rmb_prepage()使用;
         * @param {string} url 預設上一頁為url，""值為history.back()，如果cookie有資料則最優先使用cookie。
         */
        url = '/#' + url; //ionic用
        let regex = new RegExp( window.location.origin );
        let nowPage = window.location.href.replace( regex,'' );

        let ck_arr = JSON.parse( getCookie('prepage') );
        let hasP = false;
        $.each( ck_arr, function(i,e){
            if ( e.nowPg === nowPage && e.prePg !== '' ){
                let prePage = e.prePg;
                    ck_arr.splice(i,1);
                    setCookie('prepage', JSON.stringify(ck_arr) );
                    hasP = true;
                    window.location = prePage;
                return false;
            }
        })

        if ( hasP === false ){
            if( url ){
                window.location = url;
            }else if( url === '' ){
                history.back();
            }else{
                alert('error: 開發者疏失，未設置url。')
            }
        }
    }

    // ===============================
    // 清除[導下一頁，紀錄網址的cookie]
    // ===============================
    function window_location_clear_prepage(){
        /**
         * 清除prepage;
         * @param {string} url 下一頁url。
         */
        delCookie('prepage');
    }

    // =============================
    // 測試用，看cookie[prepage]內容
    // =============================
    function asd(){
        console.log( JSON.parse( getCookie('prepage') ) )
    }

/* -------- /導下一頁，紀錄cookie -------- */

    // ======
    // 產生ID
    // ======
    function _uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function(c){
            var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);
        });
    }

    var gms = {
        // =========================
        // 避免click在一秒內觸發兩次
        // =========================
        preventRepeatClick: {
            // 用在htmlTag上的onclick
            html: function( target, func ){
                func();
                $(target).attr('onclick','');
                let t = setTimeout( function(){
                    gms.preventRepeatClick.js( target, func);
                    clearTimeout(t);
                }, 1000 );
            },
            // 用在javascript
            js: function( target, func ){
                $(target).one('click',function(e){
                    func();
                    let t = setTimeout( function(){
                        gms.preventRepeatClick.js( target, func);
                        clearTimeout(t);
                    }, 1000 );
                });
            }
        },

        // =================
        // 更多 [...] 的彈窗
        // =================
        commands: {
            container: function(){
                gms.commands.data = {};
                $('body').append(`
                    <div id="ui-gms-commands-div" class="command">
                        <div class="fixed-full" onclick="gms.commands.slideUp()" style="background-color: rgba(0, 0, 0, 0.5);"></div>
                        <div class="command-dialog" style="display: none;" ontouchmove="gms.commands.touchEvent.touchMove(this)" ontouchend="gms.commands.touchEvent.touchEnd(this)"></div>
                    </div>
                `)
            },
            touchEvent:{
                tmp:{
                    added: 0,
                    total: 0,
                },
                touchEnd: function(self){
                    let h = $(self).height();
                    let t = gms.commands.touchEvent.tmp.total;
                    if ( t > h / 2){
                        $(self).css('height', h-t );
                        gms.commands.slideUp();
                    }
                    gms.commands.touchEvent.tmp.added = 0;
                    gms.commands.touchEvent.tmp.total = 0;
                    $(self).css('transform','translate(0,0)');
                },
                touchMove: function(self){
                    let newY = event.touches[0].clientY;
                    let prevY = gms.commands.touchEvent.tmp.added;
                    let trans = gms.commands.touchEvent.tmp.total;
                    if (prevY > 0 ){
                        trans = trans + ( newY - prevY );
                        trans = trans < 0 ? 0 : trans;
                        $(self).css('transform','translate(0,'+trans+'px)');
                        gms.commands.touchEvent.tmp.total = trans;
                    }
                    gms.commands.touchEvent.tmp.added = newY;
                },
            },
            /**
             * @param {string} option.cmdStr ex: '取消'
             * @param {string} option.fontColor ex: '#ffffff'
             * @param {function} option.click ex: function(){ //do something... }
             */
            set: function(option){
                let uuid = _uuid();
                let cmdStr = option.cmdStr || '';
                let fontColor = 'color: ' + option.fontColor || '';
                let click = option.click || function(){};
                let close_after_click = option.close_after_click !== undefined ? false : true;
                $(".command .command-dialog").append(`
                    <div id="${uuid}" class="command-text" style="${fontColor}; ">
                        ${cmdStr}
                    </div>
                `);
                $('#'+uuid).off('click').on('click', function(){
                    click();
                    if (close_after_click){
                        gms.commands.close();
                    }
                });
            },
            data: { //可存放資料
            },
            show: function(){
                $(".command-dialog").stop().slideDown('fast');
            },
            close: function(){
                $('.command').remove();
            },
            slideUp: function(){
                $(".command-dialog").stop().slideUp('fast', function(){
                    $('.command').remove();
                });
            }
        }
    }


    // =================
    // footer 的亮燈判斷
    // =================
    function footerHighlight(){
        $('.footer-options').find('.icon').removeClass('active');
        $('.footer-options').find('.footer-txt').removeClass('active');

        //footer 預設亮燈判斷
        let regex = new RegExp( window.location.origin );
        let pathname = window.location.href.replace( regex,'' );

        if ( pathname.indexOf('/home') > -1 ){
            $('#footer_home').find('.icon').addClass('active');
            $('#footer_home').find('.footer-txt').addClass('active');
        }
        if ( pathname.indexOf('/weather') > -1 ){
            $('#footer_weather').find('.icon').addClass('active');
            $('#footer_weather').find('.footer-txt').addClass('active');
        }
        if ( pathname.indexOf('/lbs') > -1 ){
            $('#footer_lbs').find('.icon').addClass('active');
            $('#footer_lbs').find('.footer-txt').addClass('active');
        }
        if ( pathname.indexOf('/article') > -1 ){
            $('#footer_article').find('.icon').addClass('active');
            $('#footer_article').find('.footer-txt').addClass('active');
        }
        if ( pathname.indexOf('/feed') > -1 ){
            $('#footer_feed').find('.icon').addClass('active');
            $('#footer_feed').find('.footer-txt').addClass('active');
        }
        if ( ( pathname.indexOf('/user') > -1 && pathname.indexOf('/user/member_info') == -1 ) ||
            pathname.indexOf('/photo') > -1 ||
            pathname.indexOf('/mailbox') > -1 ||
            pathname === '/coach/add' ||
            pathname === '/coach/edit' ||
            pathname === '/coach/status' ||
            pathname === '/course/bookingList' ||
            pathname === '/course/course' ||
            pathname === '/course/bookingListForCoach'
            ){
            $('#footer_user').find('.icon').addClass('active');
            $('#footer_user').find('.footer-txt').addClass('active');
        }
    }

    // X
    function ng_scope(controller){
        return angular.element( $('[data-ng-controller="' + controller + '"]')[0] ).scope();
    }


    /**
     * 很多時候onclick會用this傳自己，但某些時候無法這麼做，因此寫了這function。
     * 取而代之利用自己當作目標，find填上找到這目標的標記，例如 '.im_target'，jquery就會去找到這個class
     * @param {string} find 取代this，但需要填入自己的標記find
     * @return {HtmlObject} 回傳目標tag，若找不到find則回傳false
     */
    function event_selfTarget(find){
        let tg = '';
        // 下層有東西
        if( $(event.target).children().parent(find).length > 0 ){
            tg = $(event.target);
            console.log(tg)
        }else if ( $(event.target).closest(find).length > 0 ){
            tg = $(event.target).closest(find);
            console.log(tg)
        }else if( $(event.target).children().length == 0 ){
            tg = $(event.target);
            console.log(tg)
        }else{
            return false
        }
        return tg;
    }

    /**
     * @return {bool} 找的到target則回傳true
     */
    function event_isToParents(evt,tg){
        $.each( $(tg), function(i,v){
            console.log( $(v) , $(evt.target), $(evt.target).closest(tg) )
            if( $(v) ==  $(evt.target) || $(v) == $(evt.target).closest(tg) ){

                return true;
            }
        })
        return false;

        // if ( $(event.target).closest(find).length > 0 ){
        //     tg = $(event.target).closest(find);
        //     console.log(tg)
        // }else if( $(event.target) == $(tg). ){
        //     tg = $(event.target);
        //     console.log(tg)
        // }else{
        //     return false
        // }
        // return tg;
    }


    // 提示訊息: 您尚未登入，是否跳轉至登入頁面?
    function confirm_login(){
        confirm_modal( lang.common_message.tips, lang.common_message.unlogin, function(){
            window.location.href='/#/auth/login';
            $('#FM2').hide();
        })
    }

    // 提示訊息: 此功能尚未開放。
    function alert_not_complete(){
        alert_modal( lang.common_message.tips, lang.common_message.feature_not_complete );
    }

    // 提示訊息: 伺服器發生異常: XXX errorText
    function alert_error(err){
        alert_modal( lang.common_message.fail, lang.common_message.server_error + ':' + err.status + ' ' + err.statusText, '', 2);
    }


    // 登出動作
    function logout(){
        $.ajax({
            url:'/logout',
            success: function(rsp){
                $.ajaxSetup({
                    headers: {
                        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
                    }
                });

                $.each( allCookie(), function(key,val){
                    if( key.indexOf('remember_web_') > -1 || key == '_user' ){
                        delCookie(key);
                    }
                })
                window.location.href='/#/auth/login';
            }
        })
    }


    // ==================
    // 清除所有setTimeout
    // ==================
    function clearAllTimeout(){
        var highestTimeoutId = setTimeout(";");
        for (var i = 0 ; i < highestTimeoutId ; i++) {
            clearTimeout(i);
        }
    }

    // ===================
    // 為forEach而做的陣列
    // ===================
    function range(start, end, step) {
        /**
         * EX: range(0, 10, 2) 即回傳 [0,2,4,6,8,10];
         */
        var range = [];
        var typeofStart = typeof start;
        var typeofEnd = typeof end;
        if (step === 0) {
            throw TypeError("Step cannot be zero.");
        }
        if (typeofStart == "undefined" || typeofEnd == "undefined") {
            throw TypeError("Must pass start and end arguments.");
        } else if (typeofStart != typeofEnd) {
            throw TypeError("Start and end arguments must be of same type.");
        }
        typeof step == "undefined" && (step = 1);
        if (end < start) {
            step = -step;
        }

        if (typeofStart == "number") {
            while (step > 0 ? end >= start : end <= start) {
                range.push(start);
                start += step;
            }
        } else if (typeofStart == "string") {
            if (start.length != 1 || end.length != 1) {
                throw TypeError("Only strings with one character are supported.");
            }
            start = start.charCodeAt(0);
            end = end.charCodeAt(0);
            while (step > 0 ? end >= start : end <= start) {
                range.push(String.fromCharCode(start));
                start += step;
            }
        } else {
            throw TypeError("Only string and number types are supported");
        }
        return range;
    }
