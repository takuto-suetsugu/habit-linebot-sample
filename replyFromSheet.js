function replyFromSheet(data, sheetName) {
  var replyUrl = "https://api.line.me/v2/bot/message/reply";
  var sh = ss.getSheetByName(sheetName);
  var lastRow = sh.getLastRow();

  var wordList = sh.getRange(1, 1, lastRow, 2).getValues();
  var dateList = sh.getRange("E2:F32").getDisplayValues();

  var reply_token = data.events[0].replyToken;
  var text = data.events[0].message.text;
  var today = new Date();
  var dateFormatted =
    today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
  var userId = data.events[0].source.userId;

  var replyTextList = [];

  if (sh.getRange("J2").getValue() == sh.getRange("A2").getValue()) {
    sh.getRange("D2").setValue(text);
    replyTextList.push("目標を「" + text + "」に設定しました。");
  }
  if (text == "達成の報告") {
    for (var i = 0; i < dateList.length; i++) {
      if (dateFormatted == dateList[i][0] && dateList[i][1] == "0") {
        sh.getRange(i + 2, 6).setValue("1");
        replyTextList.push("お疲れ様でした。達成を記録しました🔥");
        break;
      } else if (dateFormatted == dateList[i][0] && dateList[i][1] == "1") {
        replyTextList.push("本日の目標は既に達成済みです🙆‍♂️");
        break;
      }
    }
  }

  for (i = 1; i < wordList.length; i++) {
    if (wordList[i][0] == text) {
      replyTextList.push(wordList[i][1]);
    }
  }
  if (replyTextList.length < 1) {
    replyTextList.push(
      "対応していない文字列が送信されたようです。「目標の設定」、「目標の確認」、「達成の報告」、「達成率の確認」のいずれかを送信してください。"
    );
  }

  if (replyTextList.length < 1) {
    return;
  } else if (replyTextList.length > 5) {
    var messageLength = 5;
  } else {
    var messageLength = replyTextList.length;
  }

  sh.getRange("I2").setValue(userId);
  sh.getRange("J2").setValue(text);

  var messageArray = [];

  for (var j = 0; j < messageLength; j++) {
    messageArray.push({ type: "text", text: replyTextList[j] });
  }

  var headers = {
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: "Bearer " + LINE_ACCESS_TOKEN,
  };

  var postData = {
    replyToken: reply_token,
    messages: messageArray,
  };

  var options = {
    method: "post",
    headers: headers,
    payload: JSON.stringify(postData),
  };

  UrlFetchApp.fetch(replyUrl, options);
}
