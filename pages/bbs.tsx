import Sidebar from '../components/Sidebar';
import '../src/app/index.css'
import '../src/app/app.scss'
import '../src/app/bbs.css'
import type { Post } from "../seeds/post_type.ts";
import { PrismaClient } from '@prisma/client';
import { useForm } from "react-hook-form";

type PostFormValues = {
  username: string,
  password: string,
  content: string
};

const postList = (posts: Post[]): React.JSX.Element => {
  return (
    <div className="posts-wrapper">
      <div className="post-list">
        {
          posts.map(post => 
            <div key={ post.id } className="post">
              <p>{ post.id }: { post.username } { post.created_at.toLocaleString() } </p>
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

  return (
    <div id="root">
      <Sidebar />
      <div className="App">
        {
          postList(posts)
        }
      </div>
      <form className="post-form" onSubmit={ handleSubmit((data) => {
        console.log(data);
      }) }>
        <div className="validation-errors">
          <div>{errors.username && "名前を入力してください"}</div>
          <div>{errors.content && "本文を入力してください"}</div>
        </div>
        <div>
          <label htmlFor="username">名前</label>
          <input {...register("username", { required: true })} />
          <label htmlFor="password">削除用パスワード</label>
          <input {...register("password")} type="password" />
        </div>
        <div>
          <label htmlFor="content">本文</label>
          <textarea {...register("content", { required: true })}></textarea>
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default PostsPage;
