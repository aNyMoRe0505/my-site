import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export const POSTS_PATH = path.join(process.cwd(), 'posts');

export const getPosts = ({ limit = 5, offset = 0, tags, category } = {}) => {
  const allPostFileName = fs.readdirSync(POSTS_PATH);

  let posts = allPostFileName.map((fileName) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, fileName));
    const { data, content } = matter(source);
    return { data, content, fileName: fileName.replace('.mdx', '') };
  });

  if (category) {
    posts = posts.filter((post) => post.data.category === category);
  }

  if (tags) {
    const parsedTags = tags.split(',');
    posts = posts.filter((post) =>
      post.data.tags.some((tag) => parsedTags.includes(tag))
    );
  }

  posts = posts
    .sort((a, b) => +new Date(b.data.date) - +new Date(a.data.date))
    .slice(+offset, +offset + +limit);

  return posts;
};

export default function handler(req, res) {
  const {
    query: { limit, offset, tags, category },
  } = req;

  const posts = getPosts({
    limit,
    offset,
    tags,
    category,
  });

  res.status(200).json(posts);
}
