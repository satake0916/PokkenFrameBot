// todo
// キャラ・技辞書の充実
// bot_idの変更
// 硬直差、フェイズチェンジ値などがないときに文面から省く
// j.Yは被ってるからそこをどう分岐させるか
// 強化状態などなどの技の分岐
// 2XXと打っても先に2Xで引っかかってしまう問題 -> 技リストを上から短い順に並べていくことで解決
//ホミ格の2段3段問題

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));
app.get('/', function(request, response) {
    response.send('This is Twitter-bot application.')
  });
  
  app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
  });

var twitter = require('twitter');

var bot = new twitter({
    consumer_key:           process.env.CONSUMER_KEY,
    consumer_secret:        process.env.CONSUMER_SECRET,
    access_token_key:       process.env.ACCESS_TOKEN_KEY,
    access_token_secret:    process.env.ACCESS_TOKEN_SECRET
});

var BOT_ID = 'pokkenframebot';

var character_map = {
    'ルカリオ':'Lucario',
    'ピカチュウ':'Pikachu',
    'カイリキー':'Machamp',
    'サーナイト':'Gardevoir',
    'マニューラ':'Weavile',
    'スイクン':'Suicune',
    'リザードン':'Charizard',
    'ゲンガー':'Gengar',
    'バシャーモ':'Blaziken',
    'マスクド・ピカチュウ':'Pikachu Libre',
    'マスピカ':'Pikachu Libre',
    'ジュカイン':'Sceptile',
    'シャンデラ':'Chandelure',
    'ミュウツー':'Mewtwo',
    'ダークミュウツー':'Shadow Mewtwo',
    'ガブリアス':'Garchomp',
    'テールナー':'Braixen',
    'ダークライ':'Darkrai',
    'ハッサム':'Scizor',
    'グレッグル':'Croagunk',
    'エンペルト':'Empoleon',
    'ジュナイパー':'Decidueye',
    'ギルガルド':'Aegislash',
    'カメックス':'Blastoise',

    'lucario':'Lucario',
    'pikachu':'Pikachu',
    'machamp':'Machamp',
    'gardevoir':'Gardevoir',
    'weavile':'Weavile',
    'suicune':'Suicune',
    'charizard':'Charizard',
    'gengar':'Gengar',
    'blaziken':'Blaziken',
    'libre':'Pikachu Libre',
    'pikachu Libre':'Pikachu Libre',
    'sceptile':'Sceptile',
    'chandelure':'Chandelure',
    'mewtwo':'Mewtwo',
    'shadow Mewtwo':'Shadow Mewtwo',
    'garchomp':'Garchomp',
    'braixen':'Braixen',
    'darkrai':'Darkrai',
    'scizor':'Scizor',
    'croagunk':'Croagunk',
    'empoleon':'Empoleon',
    'decidueye':'Decidueye',
    'aegislash':'Aegislash',
    'blastoise':'Blastoise',

    'Lucario':'Lucario',
    'Pikachu':'Pikachu',
    'Machamp':'Machamp',
    'Gardevoir':'Gardevoir',
    'Weavile':'Weavile',
    'Suicune':'Suicune',
    'Charizard':'Charizard',
    'Gengar':'Gengar',
    'Blaziken':'Blaziken',
    'Libre':'Pikachu Libre',
    'Pikachu Libre':'Pikachu Libre',
    'Sceptile':'Sceptile',
    'Chandelure':'Chandelure',
    'Mewtwo':'Mewtwo',
    'Shadow Mewtwo':'Shadow Mewtwo',
    'Garchomp':'Garchomp',
    'Braixen':'Braixen',
    'Darkrai':'Darkrai',
    'Scizor':'Scizor',
    'Croagunk':'Croagunk',
    'Empoleon':'Empoleon',
    'Decidueye':'Decidueye',
    'Aegislash':'Aegislash',
    'Blastoise':'Blastoise'
};

/*
var optical_map = {
    '強化':'EN',
    '共鳴':'SB',

    'ナイトメアシフト':'NM',
    'ビルドアップ':'EN',
    'ビルド':'EN',
    'シールドフォルム':'SF',
    'シールド':'SF',
}

var weapon_map = {
    '2A':'2A',

    '4A':'4A',

    '5A':'5A',
    '5AA':'5AA',
    '5AX':'5AX',
    '5AAA':'5AAA',
    '5AAX':'5AAX',
    'ため5A':'5[A]',
    '溜め5A':'5[A]',

    '6A':'6A',

    '8A':'8A',

    'JA':'j.A',
    '空中A':'j.A',
    '空A':'j.A',
    'ジャンプA':'j.A',


    '2Y':'2Y',

    '4Y':'4Y',

    '5Y':'5Y',
    '5Y':'5YY',

    '6Y':'6Y',
    '6YY':'6YY',
    '6YYY':'6YYY',
    '6YYX':'6YYX',
    '6YYYY':'6YYYY',

    '8Y':'8Y',

    '2X':'2X',

    '4X':'4X',

    '5X':'5X',

    '6X':'6X',

    '8X':'8X',

    '掴み':'Y+B',
    '投げ':'Y+B',
    '通投げ':'Y+B',

    '通ブロ':'X+A',
    '通常ブロック':'X+A',
    'ブロック':'X+A',

    '通ブロ最大':'[X+A]',
    'ブロック最大ため':'[X+A]',
    'ブロック最大溜め':'[X+A]',
    '最大ブロック':'[X+A]',
    'ためブロ':'[X+A]',


    'シュート':'nY',
    'フロントシュート':'fY',
    'サイドシュート':'sY',
    'バックシュート':'bY',
    'ジャンプシュート':'j.Y F',
    'ホーミング格闘':'XXX',
    'ホミ格':'XXX',
    'ホミ格1段':'X',
    'ホミ格2段':'XX',
    'ホミ格3段':'XXX',
    'ためホミ格':'XX[X]',
    'ホミ格ため':'XX[X]'

}

var partial_weapon_map = {
    'ジャンプシュート':'j.Y F',
    'ジャンプ格闘':'j.X F',
    'JY':'j.Y D',
    'JX':'j.X D',

    '掴み':'Y+B',
    '投げ':'Y+B',
    '通投げ':'Y+B',

    '通ブロ':'X+A',
    '通常ブロック':'X+A',
    'ブロック':'X+A',

    '通ブロ最大':'[X+A]',
    'ブロック最大ため':'[X+A]',
    'ブロック最大溜め':'[X+A]',
    '最大ブロック':'[X+A]',
    'ためブロ':'[X+A]',

    'シュート':'nY',
    'フロントシュート':'fY',
    'サイドシュート':'sY',
    'バックシュート':'bY'
}
*/

var XLSX = require("xlsx");
const Utils = XLSX.utils; // XLSX.utilsのalias
// Workbookの読み込み
const book = XLSX.readFile("FrameData.xlsx");

// Public APIのstatuses/filterで取得したタイムラインを、自分のアカウント名を含む文字列でフィルターする
bot.stream( 'statuses/filter', { track : BOT_ID }, function( stream ) {
    // フィルターされたデータのストリームを受け取り、ツイートのテキストを表示する
    stream.on( 'data', function( data ) {
        var reply_str = "";
        var weapon_name = 'hogehoge';
        var isThereName = false;
        var isThereWeapon = false;
        for(var regex in character_map){
            if(new RegExp(regex).test(data.text)){
                sheet = book.Sheets[character_map[regex] + ' v1.3'];   
                isThereName = true; 
            }
        }

        if(isThereName){
        // セルの範囲
        var range = sheet["!ref"]; //B2:B4
        // セル範囲を数値表現に変換
        var num;
        var decodeRange = Utils.decode_range(range);

        for(var weapon in partial_weapon_map){
            if(new RegExp(weapon).test(data.test)){
                weapon_name = partial_weapon_map[weapon];
            }
        }

        for(var i = 0; i <= decodeRange.e.r; i++){
            var address = Utils.encode_cell({ r: i, c:1 });
            var cell = sheet[address];
            if(typeof cell !== "undefined" && (new RegExp(cell.v).test(data.text) || cell.v == weapon_name)){
                num = i;
                isThereWeapon = true;
            }
        }

        
        if(isThereWeapon){
        var Imp = sheet[Utils.encode_cell({r:num, c:3})].v;
        var Blk = sheet[Utils.encode_cell({r:num, c:6})].v;
        var HitF = sheet[Utils.encode_cell({r:num, c:7})].v;
        var HitD = sheet[Utils.encode_cell({r:num, c:8})].v;
        var PSP = sheet[Utils.encode_cell({r:num, c:9})].v;
        var Damage = sheet[Utils.encode_cell({r:num, c:10})].v;
        var Height = sheet[Utils.encode_cell({r:num, c:11})].v;

        reply_str += '@' + data.user.screen_name + '\n' +
            '発生: ' + Imp + 'F' + '\n';
        if(Blk != 'N/A'){
            reply_str += 'ガード硬直差: ' + Blk + 'F' + '\n';
        }
        if(HitF != 'X' && HitF != 'N/A'){
            reply_str += 'ヒット硬直差(F): ' + HitF + 'F' + '\n';
        }
        if(HitD != 'X' && HitD != 'N/A'){
            reply_str += 'ヒット硬直差(D): ' + HitD + 'F' + '\n';
        }
        if(PSP != 'N/A'){
            reply_str += 'フェイズチェンジ値: ' + PSP + '\n';
        }
        if(Damage != 'N/A'){
            reply_str += 'ダメージ: ' + Damage + '\n';
        }
        if(Height != 'N/A'){
            reply_str += '打点: ' + Height;
        }
    }else{
        reply_str += '@' + data.user.screen_name + '\n' +'技名がヒットしませんでした';
    }
    }else{
        reply_str += '@' + data.user.screen_name + '\n' +'ポケモン名がヒットしませんでした';
    }

        bot.post('statuses/update', {status: reply_str, in_reply_to_status_id: data.id_str},function(error, tweet, response){
            if(!error){
                console.log("ok, reply.");
            }
        });   
    })
});
