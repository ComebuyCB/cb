    // ==========
    // 設置cookie
    // ==========
    function setCookie( name, value, expire, valueType ) {
        /**
         * @param {string} name name
         * @param {string} value value
         * @param {bool/string} expire 預設:false:不設定; true:10年; String:2030-01-01T00:00:00;
         * @param {string} valueType 若value是物件時，下'json' 將把value值先轉成字串再存入cookie。
         */
        if ( valueType && valueType.toLowerCase() == "json" ){
            value = JSON.stringify(value);
        }
        let exp = new Date();
        let expStr = "";
        if (expire){ //如:2030-01-01T00:00:00
            if(expire === true){
                exp.setDate( 365*10 );
            }else{
                exp.setTime( expire.getTime() );
            }
            expStr = exp.toGMTString();
        }else{
            expStr = "Session";
        }
        document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + expStr + ';path=/';
    }


    // ==========
    // 取得cookie
    // ==========
    function getCookie( name, valueType ) {
        /**
         * @param {string} name name
         * @param {string} valueType 若value先前是物件轉字串時，下'json' 把value值還原成物件。
         * @returns {string} 回傳 value
         */
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null){
            if ( valueType && valueType.toLowerCase() == "json" ){
                return JSON.parse( decodeURIComponent(arr[2]) );
            }
            return decodeURIComponent(arr[2]);
        }
        return null;
    }


    // ==========
    // 刪除cookie
    // ==========
    function delCookie(name){
        let exp = new Date();
        let expStr = exp.toGMTString();
        document.cookie = name + '=;expires=' + expStr + ';path=/';
    }


    // ==============
    // 取得所有cookie
    // ==============
    function allCookie(){
        let cookieArray = document.cookie.split("; ");
        let obj = {};
        for (var i = 0; i < cookieArray.length; i++) {
            let thisCookie = cookieArray[i].split("=");
            let cName = unescape(thisCookie[0]);
            let cValue = unescape(thisCookie[1]);
            obj[cName] = cValue;
        }
        return obj;
    }


    function htmlEncode(value){
        // 建立一個暫存的div元素，並使用text()將內容存成html編碼文字後再用html()取出
        return $('<div/>').text(value).html();
    }


    function htmlDecode(value){
        return $('<div/>').html(value).text();
    }


    // ==============
    // 判斷值是否為空
    // ==============
    function isEmpty(input){
        /**
         * @param {any} input 傳入任何值 ( 適用Boolean、Null、Undifined、Number、String、Object、Array )
         * @return {bool} 判斷值為空時，回傳true，否則false。
         */
        if ( typeof input === 'boolean' ) {
            if ( input === false ) return true;
        }
        if ( input === null ) return true;
        if ( typeof input === 'undefined' ) return true;
        if ( typeof input === "number" ){
            if (input === 0) return true;
        }
        if ( typeof input === "string" ){
            if (input.length === 0) return true;
        }
        if ( typeof input === "object" ){
            if ( Array.isArray(input) ){
                if (input.length == 0) return true;
            }else{
                let arr = Object.keys(input);
                if (arr.length == 0) return true;
            }
        }
        return false;
    }
