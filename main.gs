var LINE_ACCESS_TOKEN = ACCESS_TOKEN;

var ss = SpreadsheetApp.openById("SPRED_NAME");

function doPost(e) {
  if (typeof e === "undefined") {
    return;
  } else {
    var json = JSON.parse(e.postData.contents);
    var sheetName = selectSheet(json);
    replyFromSheet(json, sheetName);
  }
}
