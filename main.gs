var LINE_ACCESS_TOKEN =
  "g1WJ3olo01nuGDQqKa4ulXcAifuJ4P3qK7zKOg+U0IVep+ftTmGalvcernoMvW1ptgqFDQ5POXEW6eAMi/e71ZjOenF+BoD8Iy1vUectIAFHW8Mag+rmcx/d35mruh7+0Fg1wCDznnaZdQzq8dBRvwdB04t89/1O/w1cDnyilFU=";

var ss = SpreadsheetApp.openById(
  "1tafq5bMxB8vAis2L6OrC-gZlTftv8x8atSUYzCVWXlA"
);

function doPost(e) {
  if (typeof e === "undefined") {
    return;
  } else {
    var json = JSON.parse(e.postData.contents);
    var sheetName = selectSheet(json);
    replyFromSheet(json, sheetName);
  }
}
