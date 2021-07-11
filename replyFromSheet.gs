function replyFromSheet(data, sheetName) {
  var sh = ss.getSheetByName(sheetName);
  var lastRow = sh.getLastRow();

  var wordList = sh.getRange(1, 1, lastRow, 2).getValues();

  var text = data.events[0].message.text;
  var userId = data.events[0].source.userId;

  var replyTextList = [];

  var previousText = sh.getRange("J2").getValue();
  if (previousText == sh.getRange("A2").getValue()) {
    sh.getRange("D2").setValue(text);
    replyTextList.push("目標を「" + text + "」に設定しました。");
  }
  if (text == "達成の報告") {
    replyTextList.push(saveAchievement(text, sh));
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

  pushReply(replyTextList, messageLength, data);
}
