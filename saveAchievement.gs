function saveAchievement(text, sh) {
  var dateList = sh.getRange("E2:F32").getDisplayValues();
  var today = new Date();
  var dateFormatted =
    today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();

  for (var i = 0; i < dateList.length; i++) {
    if (dateFormatted == dateList[i][0] && dateList[i][1] == "0") {
      sh.getRange(i + 2, 6).setValue("1");
      return "お疲れ様でした。達成を記録しました🔥";
    } else if (dateFormatted == dateList[i][0] && dateList[i][1] == "1")
      return "本日の目標は既に達成済みです🙆‍♂️";
  }
}
