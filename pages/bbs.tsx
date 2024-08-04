import Sidebar from '../components/Sidebar';
import '../src/app/index.css'
import '../src/app/app.scss'
import '../src/app/bbs.scss'
import type { Post } from "../seeds/post_type.ts";
import { PrismaClient } from '@prisma/client';
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

type PostFormValues = {
  username: string,
  password: string,
  content: string
};

const deleteHandler = (postId: Number) => {
  const password = prompt("削除用パスワードを入力してください");
  // パスワードが正しいかAPIに聞いて確かめる
  const fetchApi = async () => {
    const data = { postId: postId, password: password };
    const response = await fetch('/api/delete_bbs', { method: 'DELETE', body: JSON.stringify(data) });
    const result = await response.json();
    console.log(response, result);
    if (response.status === 200) {
      // ステータスが200ならパスワードが正しく、APIがレコードを削除したので画面をリロードする
      window.location.reload();
    } else {
      // それ以外のときはパスワードが違うので何も起こらない
      alert("パスワードが違います");
    }
  };
  fetchApi();
};

const postList = (posts: Post[]): React.JSX.Element => {
  return (
    <div className="posts-wrapper">
      <div className="post-list">
        {
          posts.map(post => 
            <div key={ post.id } className="post">
              <p>
                { post.id }: { post.username } { post.created_at.toLocaleString() }
                <button className="post-delete-button" onClick={ () => { deleteHandler(post.id) } }>削除</button>
              </p>
              <p>{ post.content }</p>
            </div>
          )
        }
      </div>
    </div>
  );
}

export const getServerSideProps = (async () => {
  // Fetch data from external API
  const prisma = new PrismaClient();
  const fetchedPosts = await prisma.post.findMany();
  console.log(fetchedPosts);
  // Pass data to the page via props
  // returnしたものはJSONになるが、Dateはserializableではないので、もう1段JSONをかませる
  return { props: { postsJson: JSON.stringify(fetchedPosts) } };
});

const PostsPage = ({ postsJson }: { postsJson: string }) => {
  // some useState thing goes here

  const posts: Post[] = JSON.parse(postsJson, (key, value) => {
    if (key == "created_at") {
      return new Date(value);
    } else {
      return value;
    }
  });

  console.log(posts);

  const { register, handleSubmit, formState: { errors } } = useForm<PostFormValues>();
  const router = useRouter();

  return (
    <div id="root">
      <Sidebar />
      <div className="App">
        <div className="bbs-wrapper">
          {
            postList(posts)
          }
          <form className="post-form" onSubmit={ handleSubmit((data) => {
            console.log(data);
            const fetchApi = async () => {
            const response = await fetch('/api/save_bbs', { method: 'POST', body: JSON.stringify(data) });
            const result = await response.json();
            console.log(response, result);
            if (response.status === 200) {
              router.reload();
            }
            };
            fetchApi();
          }) }>
            <div className="validation-errors">
              <div>{errors.username && "名前を入力してください"}</div>
              <div>{errors.content && "本文を入力してください"}</div>
            </div>
            <div id="username-input-wrapper">
              <div id="username-input">
                <label htmlFor="username">名前</label>
                <input {...register("username", { required: true })} />
              </div>
              <div id="password-input">
                <label htmlFor="password">削除用パスワード</label>
                <input {...register("password")} type="password" />
              </div>
            </div>
            <div id="content-input">
              <label htmlFor="content">本文</label>
              <textarea {...register("content", { required: true })} rows={ 5 }></textarea>
            </div>
            <div id="submit-wrapper">
              <label></label>
              <input type="submit" />
            </div>
          </form>
          <div className="warning">
            以下の場合は投稿が削除できなくなりますのでご注意ください。
            <ul>
              <li>削除用パスワードを入力しなかった場合</li>
              <li>削除用パスワードを忘れた場合</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostsPage;
