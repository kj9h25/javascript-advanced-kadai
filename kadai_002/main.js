// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;
let preTime = 3;
let onTime = 60;

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const preGame = document.getElementById('pre-game');
const preCount = document.getElementById('pre-count');
const onGame = document.getElementById('on-game');
const onCount = document.getElementById('on-count');
const letterCount = document.getElementById('letter-count');

// 複数のテキストを格納する配列
const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];

// ランダムなテキストを表示
const createText = () => {
  // 正タイプした文字列をクリア
  typed = '';
  typedfield.textContent = typed;

  // 配列のインデックス数からランダムな数値を生成する
  let random = Math.floor(Math.random() * textLists.length);
  // console.log(random);
  // 配列からランダムにテキストを取得し画面に表示する
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};

// キー入力の判定
const keyPress = e => {
  // console.log(e.key);
  // 誤タイプの場合
  if(e.key !== untyped.substring(0, 1)) {
    wrap.classList.add('mistyped');
    // 100ms後に背景色を元に戻す
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
    return;
  }
  // 正タイプの場合
  // スコアのインクリメント
  score++;
  // 現在の正タイプ数を代入する
  letterCount.textContent = `入力文字数：${score}`;
  typed += untyped.substring(0, 1); //typed = typed + untyped~
  untyped = untyped.substring(1); //substringメソッドは非破壊的メソッド
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;
  // テキストがなくなったら新しいテキストを表示
  if(untyped === '') {
    createText();
  }
};

// タイピングスキルのランクを判定
const rankCheck = score => {
  // テキストを格納する変数を定義する
  let text = '';
  // スコアに応じて異なるメッセージを変数textに格納する
  if(score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if(score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
  } else if(score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
  } else if(score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます！`;
  }
  // 生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました！\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {
  clearInterval(id);
  // 「タイムアップ！」を表示する
  onCount.textContent = '0';
  typedfield.textContent = '';
  untypedfield.textContent = 'タイムアップ！';
  // 1ms後にダイアログを表示する
  setTimeout(() => {
    const result = confirm(rankCheck(score));
    // OKボタンをクリックしたらリロードする
    if(result == true) {
      window.location.reload();
    }
    // 上記以外の操作を行った場合、イベント処理を停止する
    else {
      document.removeEventListener('keypress', keyPress);
    }
  }, 1);
};

// ゲーム開始までのカウントダウンタイマー
const preTimer = () => {
  setInterval(() => {
    // カウントダウンする
    preTime--;
    preCount.textContent = preTime;
    // カウントが0になったらタイマーを停止する
    if(preTime <= 0) {
      return;
    }
  }, 1000);
};

// ゲーム終了までのカウントダウンタイマー
const onTimer = () => {
  const id = setInterval(() => {
    // カウントダウンする
    onTime--;
    onCount.textContent = onTime;
    // カウントが5以下になったら表示を変更する
    if(onTime <= 5) {
      onCount.style.color = 'red';
    }
    // カウントが0になったらタイマーを停止する
    if(onTime <= 0) {
      gameOver(id);
    }
  }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {
  // ゲーム開始までのカウントダウンタイマーを開始する
  preTimer();
  // 「スタート」ボタンクリックの3m後に開始する
  setTimeout(() => {
    // ゲーム終了までのカウントダウンタイマーを開始する
    onTimer();
    // ランダムなテキストを表示する
    createText();
    // 「スタート」ボタンを非表示にする
    start.style.display = 'none';
    preGame.style.display = 'none';
    onGame.style.display = 'block';
    // 「文字数カウンター」を表示する
    letterCount.style.display = 'block';
    // キーボードのイベント処理
    document.addEventListener('keypress', keyPress);
  }, 3000);
});

untypedfield.textContent = 'スタートボタンで開始';
