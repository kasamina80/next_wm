## 実行方法
### DB関連
- 先にローカルにDBを作っておく
- `.env.development`に以下の形でDBへのパスを記載する:
  - `DATABASE_URL="(DBの種類)://(ユーザ名):(パスワード)@(ホスト名):(ポート番号)/(DB名)?schema=public"`
#### Dockerを使う場合
TODO: docker-compose.ymlを用意する

### 実行手順
```
npm install
npx prisma generate
npm run seed
npm run dev
```

## 開発関連
TODO: モデルを追加する手順を書く


