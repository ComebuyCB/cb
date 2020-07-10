/**
 * 目錄：
 * 1.時間
 * 2.搜尋
 * 3.click事件
 */


/*** 1.時間 ***/

/**
 * return UTC Date => yyyyMMdd
 * @param {number} timestamp
 * @param {string} gapChar ex: "/" -> return yyyy/MM/dd
 * @returns {string} "yyyyMMdd"
 */
function getUTCDate(timestamp, gapChar) {
  const g = gapChar === null || gapChar === undefined ? "" : gapChar;
  const newDate = new Date(timestamp);
  const Y = newDate.getUTCFullYear();
  const M = newDate.getUTCMonth() + 1;
  const D = newDate.getUTCDate();

  const txt = `${Y}${g}${M < 10 ? "0" : ""}${M}${g}${D < 10 ? "0" : ""}${D}`;
  return txt;
}

/**
 * return UTC Time => hhmmss
 * @param {number} timestamp
 * @param {string} gapChar ex: ":" -> return hh:mm:ss
 * @returns {string} "hhmmss"
 */
function getUTCTime(timestamp, gapChar) {
  const g = gapChar === null || gapChar === undefined ? ":" : gapChar;
  const newDate = new Date(timestamp);
  const H = newDate.getUTCHours();
  const M = newDate.getUTCMinutes();
  const S = newDate.getUTCSeconds();

  const txt = `${H < 10 ? "0" : ""}${H}${g}${M < 10 ? "0" : ""}${M}${g}${
    S < 10 ? "0" : ""}${S}`;
  return txt;
}





/**
 * @param  {string} dateStr
 * @returns {string} yyyymmdd or "" if failed
 */
function toyyyymmdd(dateStr) {
  const date = new Date(dateStr);
  if (!isDateValid(date)) {
    return "";
  }
  const year = date.getFullYear();
  const month = pad("00", date.getMonth() + 1, true);
  const day = pad("00", date.getDate(), true);
  return `${year}${month}${day}`;
}
/**
 * @param  {string} dateStr
 * @returns {string} yyyymmddhhmmss or "" if failed
 */
function toyyyymmddhhmmss(dateStr) {
  const date = new Date(dateStr);
  if (!isDateValid(date)) {
    return "";
  }
  const yymmdd = toyyyymmdd(dateStr);
  const hour = pad("00", date.getHours(), true);
  const minute = pad("00", date.getMinutes(), true);
  const second = pad("00", date.getSeconds(), true);
  return `${yymmdd}${hour}${minute}${second}`;
}
function pad(pad, str, padLeft) {
  if (typeof str === "undefined") {
    return pad;
  }
  if (padLeft) {
    return (pad + str).slice(-pad.length);
  } else {
    return (str + pad).substring(0, pad.length);
  }
}





/*** 2.搜尋 ***/

/**
 * search characters in array, output all found characters in array.
 * //ex: arrSearch( "he" , [ "Hello" , "hi" , "He" ] , false ) => return [ "He" ]
 * //ex: arrSearch( "he" , [ "Hello" , "hi" , "He" ] , true ) => return [ "Hello", "He" ]
 * //ex: arrSearch( "he" , [ "Hello" , "hi" , "He" ] , true , true ) => return [ "hi" ]
 * @param {string} input input character
 * @param {array} arrWords array which be searched => [ value , value , ... ]
 * @param {boolen} findChar false: search characters in the word. / true: search whole the word.
 * @param {boolen} toDel false: return array what I search. / true: return array without what I input.
 * @returns {array} contain/without all matched input words.
 */
function arrSearch(input, arrWords, findWholeWord, toDel) {
  if (input == "" || input == undefined){ return arrWords;}
  findWholeWord = !findWholeWord ? false : findChar;
  toDel = !toDel ? false : toDel;
  const arr = [];
  arrWords.forEach(elem => {
    const lcaseInput = input.toLowerCase();
    const lcaseWord = elem.toLowerCase();

    // findWholeWord = false;
    if (!findWholeWord) {
      // toDel = true;
      if (toDel && lcaseWord.indexOf(input) === -1) {
        arr.push(elem);
      }
      // toDel = false;
      else if (!toDel && lcaseWord.indexOf(input) > -1) {
        arr.push(elem);
      } else {
        /* do nothing */
      }
    }

    // findWholeWord = true;
    else {
      // toDel = true;
      if (toDel && lcaseInput != lcaseWord) {
        arr.push(elem);
      }
      // toDel = false;
      else if (!toDel && lcaseInput == lcaseWord) {
        arr.push(elem);
      } else {
        /* do nothing */
      }
    }
  });
  return arr;
}


/**
 * search characters in array, output all found characters in array.
 * @param {number|string} input input character
 * @param {array} arrWords array which be searched => [ value , value , ... ]
 * @param {boolen} findWholeWord false: search characters in the word. / true: search whole the word.
 * @returns {array} contain all matched input words.
 * @example 
 * arrSearch_containInput( "" , [ "She" , "hi" , "He" ] , false ) // return [ "She" , "hi" , "He" ]
 * arrSearch_containInput( "he" , [ "She" , "hi" , "He" ] , false ) // return [ "She", "He" ]
 * arrSearch_containInput( "he" , [ "She" , "hi" , "He" ] , true ) // return [ "He" ]
 * 
 */
function arrSearch_containInput(input, arrWords, findWholeWord) {
  if (input == "" || input == undefined){ return arrWords;}
  findWholeWord = !findWholeWord ? false : findWholeWord;
  var arr = [];
  arrWords.forEach( function( elem ){
    var lcaseInput = input.toString().toLowerCase();
    var lcaseWord = elem.toString().toLowerCase();
    if( (findWholeWord && lcaseInput == lcaseWord) || (!findWholeWord && lcaseWord.indexOf(input) > -1) ){
      arr.push(elem);
    }
  })
  return arr;
}


/**
 * search characters in array, output all found characters without in array.
 * @param {string} input input character
 * @param {array} arrWords array which be searched => [ value , value , ... ]
 * @param {boolen} findWholeWord false: search characters in the word. / true: search whole the word.
 * @returns {array} without all matched input words.
 * @example
 * arrSearch_withoutInput( "" , [ "She" , "hi" , "He" ] , false ) // return [ "She" , "hi" , "He" ]
 * arrSearch_withoutInput( "he" , [ "She" , "hi" , "He" ] , false ) // return [ "hi" ]
 * arrSearch_withoutInput( "he" , [ "She" , "hi" , "He" ] , true ) // return [ "She" , "hi" ]
 */
function arrSearch_withoutInput(input, arrWords, findWholeWord) {
  if (input == "" || input == undefined){ return arrWords;}
  findWholeWord = !findWholeWord ? false : findWholeWord;
  var arr = [];
  arrWords.forEach( function( elem ){
    var lcaseInput = input.toString().toLowerCase();
    var lcaseWord = elem.toString().toLowerCase();
    if( (findWholeWord && lcaseInput != lcaseWord) || (!findWholeWord && lcaseWord.indexOf(input) === -1) ){
      arr.push(elem);
    }
  })
  return arr;
}



/*** 3.click事件 ***/

/**
 * (jquery) 按下目標以外的東西，會使此目標隱藏。
 * @param {string} whichHide 需被隱藏的目標(jquery)， // 例如: #id、div.class、input[name = "abc"] 等等...
 * @param {string} exception 例外，按下不會使 whichHide 隱藏(jquery)。 // 例如: 同上
 * @description 點下目標以外地方後，隱藏目標。
 */
function clickOtherPlaceToHideTarget(whichHide, exception){
  document.addEventListener("mousedown", function(e){
    for (let i=0; i<$(whichHide).length; i++){ //找自己
      if( e.target == $(whichHide)[i] ){ //按下的目標是自己，直接結束。
        return;
      }
    }
    for (let i=0; i<$(exception).length; i++){ //找例外
      if( e.target == $(exception)[i] ){ //按下的目標是例外，直接結束。
        return;
      }
    }

    if( $(e.target).parents(whichHide).length > 0 ){ //按下的目標是父層，直接結束。
      return;
    }

    $(whichHide).hide(); //都不是，隱藏目標。
  })
}
