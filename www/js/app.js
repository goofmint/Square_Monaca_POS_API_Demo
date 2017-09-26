// カスタムURLスキーマ
var schema = 'YOUR_CUSTOM_SCHEMA://';
// Square APIのアプリケーションID
var client_id = 'YOUR_SQUARE_APPLICATION_ID';

// カスタムURLスキーマからアプリを開いた際に呼ばれる関数です
function handleOpenURL(url) {
  setTimeout(function() {
    var param = JSON.parse(decodeURIComponent(url.replace(schema, '').replace('?data=', '')));
    $('#result').html(`
      <ons-list-item>結果ID : ${param.status}</ons-list-item>
      <ons-list-item>トランザクションID : ${param.transaction_id}</ons-list-item>
      <ons-list-item>クライアントトランザクションID : ${param.client_transaction_id}</ons-list-item>
    `);
  }, 0);
}

ons.ready(function() {
  $('#square').on('click', function(e) {
    // 決済時のパラメータです
    var dataParameter = {
      // 決済額です。amountが数値、currency_codeが通貨単位になります。
      // 今回は100円です。
      "amount_money": {
        "amount" : "100",
        "currency_code" : "JPY"
      },
      // コールバックを受け取るURLです。カスタムURLスキーマをそのまま呼び出します。
      "callback_url" : schema,
      // SquareのAPIで指定されるアプリケーションIDを指定します。
      "client_id" : client_id,
      // バージョンは1.3固定です。
      "version": "1.3",
      // 取引のメモです。任意の文字です。
      "notes": "notes for the transaction",
      // オプションです
      "options" : {
        // 決済種別です。今回はクレジットカード、現金、その他を指定しています。
        "supported_tender_types" : [
          "CREDIT_CARD",
          "CASH",
          "OTHER",
        ]
      }
    };
    // レジアプリを呼び出すURLです
    var url = "square-commerce-v1://payment/create?data=" + encodeURIComponent(JSON.stringify(dataParameter));
    // URLを開きます
    location.href = url;
  });
});

