function jsScreen(v){

if (v=="a"){
	/* 正常情況，換行請用\n  */
    var s = "";
    s += "document.\n";
    s += " 網頁可見區域寬(body.clientWidth)："+ document.body.clientWidth +"\n";
    s += " 網頁可見區域高(body.clientHeight)："+ document.body.clientHeight +"\n";
    s += " 網頁可見區域寬(body.offsetWidth)："+ document.body.offsetWidth + " (包括邊線和捲軸的寬)\n";
    s += " 網頁可見區域高(body.offsetHeight)："+ document.body.offsetHeight + " (包括邊線的寬)\n";
    s += " 網頁正文全文寬(body.scrollWidth)："+ document.body.scrollWidth +"\n";
    s += " 網頁正文全文高(body.scrollHeight)："+ document.body.scrollHeight +"\n";
    s += " 網頁被卷去的高(ff)(body.scrollTop)："+ document.body.scrollTop +"\n";
    s += " 網頁被卷去的高(ie)(documentElement.scrollTop)："+ document.documentElement.scrollTop +"\n";
    s += " 網頁被卷去的左(body.scrollLeft)："+ document.body.scrollLeft +"\n";
    s += "window.\n";
    s += " 網頁正文部分上(screenTop)："+ window.screenTop +"\n";
    s += " 網頁正文部分左(screenLeft)："+ window.screenLeft +"\n";
    s += " 螢幕解析度的高(screen.height)："+ window.screen.height +"\n";
    s += " 螢幕解析度的寬(screen.width)："+ window.screen.width +"\n";
    s += " 螢幕可用工作區高度(screen.availHeight)："+ window.screen.availHeight +"\n";
    s += " 螢幕可用工作區寬度(screen.availWidth)："+ window.screen.availWidth +"\n";
    s += " 你的螢幕設置是(screen.colorDepth)："+ window.screen.colorDepth +" 位彩色\n";
    s += " 你的螢幕設置(screen.deviceXDPI)："+ window.screen.deviceXDPI +" 像素/英寸\n";
    s += " 你的螢幕是(screen.deviceXDPI)："+ window.screen.pixelDepth +" 吋"
	s += " URL(location.href)： "+ window.location.href +"\n";
	s += " Domain Name(location.hostname)： "+ window.location.hostname +"\n";
	s += " Path & Filename(location.pathname)： "+ window.location.pathname +"\n";
	s += " Protocol(location.protocol)： "+ window.location.protocol +"\n";
	s += " Loads A New Document(location.assign)： "+ window.location.assign +"\n";
	alert(s);
	
}else if(v=="c"){
	/* 載入jquery.comfirm時，換行請用<br>  */
	var t= "";
    t += "***document.***<br>";
    t += " 網頁可見區域寬(body.clientWidth)："+ document.body.clientWidth +"<br>";
    t += " 網頁可見區域高(body.clientHeight)："+ document.body.clientHeight +"<br>";
    t += " 網頁可見區域寬(body.offsetWidth)："+ document.body.offsetWidth + " (包括邊線和捲軸的寬)<br>";
    t += " 網頁可見區域高(body.offsetHeight)："+ document.body.offsetHeight + " (包括邊線的寬)<br>";
    t += " 網頁正文全文寬(body.scrollWidth)："+ document.body.scrollWidth +"<br>";
    t += " 網頁正文全文高(body.scrollHeight)："+ document.body.scrollHeight +"<br>";
    t += " 網頁被卷去的高(ff)(body.scrollTop)："+ document.body.scrollTop +"<br>";
    t += " 網頁被卷去的高(ie)(documentElement.scrollTop)："+ document.documentElement.scrollTop +"<br>";
    t += " 網頁被卷去的左(body.scrollLeft)："+ document.body.scrollLeft +"<br>";
    t += "***window.***<br>";
    t += " 網頁正文部分上(screenTop)："+ window.screenTop +"<br>";
    t += " 網頁正文部分左(screenLeft)："+ window.screenLeft +"<br>";
    t += " 螢幕解析度的高(screen.height)："+ window.screen.height +"<br>";
    t += " 螢幕解析度的寬(screen.width)："+ window.screen.width +"<br>";
    t += " 螢幕可用工作區高度(screen.availHeight)："+ window.screen.availHeight +"<br>";
    t += " 螢幕可用工作區寬度(screen.availWidth)："+ window.screen.availWidth +"<br>";
    t += " 你的螢幕設置是(screen.colorDepth)："+ window.screen.colorDepth +" 位彩色<br>";
    t += " 你的螢幕設置(screen.deviceXDPI)："+ window.screen.deviceXDPI +" 像素/英寸<br>";
    t += " 你的螢幕是(screen.deviceXDPI)："+ window.screen.pixelDepth +" 吋<br>";
    t += "***window.location.***<br>";
	t += " URL(href)： "+ window.location.href +"<br>";
	t += " Protocol(protocol)： "+ window.location.protocol +"<br>";	
	t += " Domain Name(hostname)： "+ window.location.hostname +"<br>";
	t += " Path & Filename(pathname)： "+ window.location.pathname +"<br>";
	t += " Loads A New Document(assign)： "+ window.location.assign +"<br>";
	console.log(document);	
	console.log(window);
	/* 參考: https://craftpip.github.io/jquery-confirm */
	$.dialog({
		title:'JS螢幕顯示用法',
		content: t,
		draggable: true,
		columnClass: 'col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12',
		boxWidth: '80%',
		theme: 'dark',
	})
}
}

//	僅能輸入數字
function ValidNum(e, VAL)
{
    if (!/^\d+[.]?[1-9]?$/.test(VAL))
    {
        e.value = /\d+[.]?[1-9]?/.exec(e.value);
    }
    return e.value;
}


//	超過X個字以...取代，若裡面有html code則忽略。
function dadada(id,len){
	if($("#"+id).text().length>len){
	    var text = $("#"+id).text().substring(0,len)+"...";
        $("#"+id).text(text);
    };
}
/*	範例:<div id="a">Hello World!!</div>
		<script>dadada("a",7)<／script>
	結果: Hello W...
*/

window.addEventListener("resize",fullHeight)
$("#fullHeight").css("height", window.screen.height )
function fullHeight(){
	$("#fullHeight").css("height", window.screen.height )
	console.log("height:"+window.screen.height+"px")
}


