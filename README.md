# Installation

## 1. firebaseプロジェクトの作成

firebaseでプロジェクトを作成して、Realtime Databaseをテストモードで開始します。

## 2. 初期データのインポート

Realtime Databaseへ `survey-slide-export.json` をインポートします。

## 3. config.jsonの作成

config.sample.jsonをコピーしてconfig.jsを作成し、
firebaseのアプリを追加するで表示できるコードを記載します。

## 4. npm_modulesのセットアップ

```
npm install
```

or

```
yarn install
```

# Development

```
npm watch
```

or

```
yarn watch
```

## pages

- http://localhost:3000/audience.html
- http://localhost:3000/speaker.html
- http://localhost:3000/facilitation.html
