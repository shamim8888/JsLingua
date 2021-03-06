(function(window){
  var Lang = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Lang = require("../lang.js");
    module.exports = JaLang;
  } else {
    Lang = window.Lang;
    window.JaLang = JaLang;
  }
  
  function JaLang() {
    Lang.call(this, "Japanese");

    this.addCharSet("Hiragana", 0x3040, 0x309F);
    this.addCharSet("Katakana", 0x30A0, 0x30FF);
    this.addCharSet("Kanji", 0x4E00, 0x9FBF);
    this.addCharSet("Punctuation", 0x3000, 0x303F);

    this.addTransform("hiraganaToKatakana", 0x0060, "Hiragana");
    this.addTransform("katakanaToHiragana", -0x0060, "Katakana");
  }

  JaLang.prototype = new Lang("Japanese");
  JaLang.prototype.constructor = JaLang;


  var lookup = {
      0: "零", 1:"一", 2:"二", 3:"三", 4:"四", 5:"五",
      6:"六", 7:"七", 8:"八", 9:"九", 10:"十",
      100:"百", 1000:"千", 10000:"万",
      100000000:"億", 1000000000000:"兆"
  }

  var bigNbr = [
      1000000000000, 100000000,
      10000, 1000, 100, 10
  ]

JaLang.prototype.pronounceNumber = toJapaneseLetters;
  /**
  * Transform from Arabic numbers to Japanese letters
  * @method toJapaneseLetters
  * @param {Number} num the integer number
  * @return {String} Japanese writing of numbers
  */
  function toJapaneseLetters (num) {

      if (isNaN(num))
          return "";

      var neg = false;
      if(num < 0){
          neg = true;
          num = - num;
      }

      if (num < 10)
          return lookup[num];

      //search for the max index
      var i = 0;
      var max = 1;
      var div;
      for (i = 0; i < bigNbr.length; i++){
          max = bigNbr[i]
          div = ~~(num/max);
          if (div > 0)
              break;
      }
      var rem = ~~(num % max);
      var result = "";
      if (div > 0)
          if (div > 1 || max > 1000)
              result += toJapaneseLetters(div);
      result += lookup[max];
      if(rem > 0)
          result += toJapaneseLetters(rem);

      if(neg)
          result = "マイナス" + result;

      return result;

  }

  return JaLang;

}(this));
