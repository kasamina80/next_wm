## 実行方法
### WSLを使用する場合

WSLから:
```
docker-compose up
```

### WSLを使用しない場合

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

VSCodeターミナルもしくはPowershellから:
```
npm install
npx prisma generate
npx prisma migrate dev
npm run seed
npm run dev
```

### 解説
- `npm prisma generate`は`bundle exec rails db:migrate`に対応します。
- `npm run seed`は`bundle exec rails db:seed-fu`に対応します。
  - 実際には、`ruby -e "eval(File.read('seeds.rb'))"`に近いことをやっています。

## 開発関連

テーブル名は`WorkHistory`のような形式で作成される
