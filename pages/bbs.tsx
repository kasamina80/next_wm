import Sidebar from '../components/Sidebar';
import '../src/app/index.css'
import '../src/app/app.scss'
import '../src/app/bbs.css'
import type { Post } from "../seeds/post_type.ts";
import { PrismaClient } from '@prisma/client';

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
  return (
    <div id="root">
      <Sidebar />
      <div className="App">
        {
          postList(posts)
        }
      </div>
    </div>
  );
}

export default PostsPage;
