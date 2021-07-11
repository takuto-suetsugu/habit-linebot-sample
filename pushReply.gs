function pushReply(replyTextList, messageLength, data) {
  var replyUrl = "https://api.line.me/v2/bot/message/reply";
  var reply_token = data.events[0].replyToken;
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
