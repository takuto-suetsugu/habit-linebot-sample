function selectSheet(data) {
  var userId = data.events[0].source.userId;
  var sht = ss.getSheets();

  for (var i = 0; i < sht.length; i++) {
    if (ss.getSheets()[i].getRange("I2").getValue() == userId) {
      var sheetName = ss.getSheets()[i].getName();
      return sheetName;
    }
  }
  var copySheet = ss.getSheetByName("record_template");
  var newCopySheet = copySheet.copyTo(ss);
  var newSheetName = "record" + i;
  newCopySheet.setName(newSheetName);

  return newSheetName;
}
