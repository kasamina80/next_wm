## 実行方法
### Dockerを使用する場合

WSLから:
```
docker-compose up
```

### Dockerを使用しない場合

`.env`のパスを

```
DATABASE_URL="DBの種類://ユーザ:パスワード@ホスト:ポート番号/DB名?schema=public"
```

に書き換えてください。

例:

```
DATABASE_URL="mysql://root:password@localhost:3306/next_wm?schema=public"
```

## 共通

2つ目と3つ目は`npx`なので注意してください。

VSCodeターミナルもしくはPowershellから:
```
npm install
npx prisma generate
npx prisma migrate dev
npm run seed
npm run dev
```

別のコンソールを開いて実行:
```
npm run start-server
```

tRPCを使用するためDB接続用のAPIサーバーをアプリケーションサーバーとは別に立てています。

### 解説
- `npm run seed`は`bundle exec rails db:seed-fu`に対応します。
  - 実際には、`ruby -e "eval(File.read('seeds.rb'))"`に近いことをやっています。

## 開発関連

テーブル名は`workhistory`のような形式で作成される
