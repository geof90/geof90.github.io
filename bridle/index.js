var replacements = {
  "jesus": "JC",
  "christ": "C",
  "church": "club",
  "father": "dad",
  "lord": "L",
  "bible": "book",
  "holy spirit": "HS",
  "god": "dad",
  "gospel": "gpl",
  "missionary": "worker",
  "mission": "mssn",
  "ministry": "work",
  "heaven": "hvn",
  "pray": "pr",
  "spirit": "spt",
  "salvation": "slvtn",
  "yahweh": "yw",
  "genesis": "gnss",
  "exodus": "exds",
  "leviticus": "lvtcs",
  "deuteronomy": "dtrnmy",
  "chronicles": "chrncls",
  "ezra": "ezr",
  "nehemiah": "nhmh",
  "psalms": "pslms",
  "proverbs": "pvrbs",
  "ecclesiastes": "ecc",
  "solomon": "slmn",
  "isaiah": "isa",
  "ezekiel": "ezkl",
  "hosea": "hsa",
  "obadiah": "obdh",
  "nahum": "nhm",
  "habakkuk": "hbkk",
  "zephaniah": "zphnh",
  "haggai": "hgg",
  "zechariah": "zchrh",
  "malachi": "mlchi",
  "romans": "rmns",
  "corinthian": "crnthn",
  "galatian": "gltn",
  "ephesian": "eph",
  "phillippian": "phlpn",
  "collossian": "clsn",
  "thessalonian": "thsln",
  "philemon": "phlmn",
  "hebrew": "hbr",
  "revelation": "rvltn",
  "pastor": "ptr",
  "baptist": "bptst"
};


var myElement = document.getElementById('original');
if (window.addEventListener) {
  // Normal browsers
  myElement.addEventListener('DOMSubtreeModified', contentChanged, false);
} else if(window.attachEvent) {
  // IE
  myElement.attachEvent('DOMSubtreeModified', contentChanged);
}

function contentChanged() {
  setTimeout(() => {

    var textbox = document.getElementById("original");
    var resultbox = document.getElementById("result");
    var content = textbox.innerHTML;
    for (var key in replacements) {
      var index = -1;
      var newIndex = index;
      while ((newIndex = content.toLowerCase().indexOf(key, index + 1)) >= 0) {
        var toReplace = replacements[key];
        var originalWord = content.substring(newIndex, newIndex + key.length);
        if (originalWord.toUpperCase() == originalWord) {
          console.log(originalWord);
          console.log("upper");
          toReplace = toReplace.toUpperCase();
        } else if (originalWord.charAt(0) == originalWord.toUpperCase().charAt(0)) {
          console.log(originalWord);
          console.log("camel");
          toReplace = toReplace.toUpperCase().charAt(0) + toReplace.substring(1);
        }
  
        content = content.substring(0, newIndex) + 
                  toReplace +
                  content.substring(newIndex + key.length);
        newIndex = newIndex + toReplace.length;
        index = newIndex;
      }
    }
  
    resultbox.innerHTML = content;
  }, 100);
}
