import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export const POSTS_PATH = path.join(process.cwd(), 'posts');

const allPostFileName = fs.readdirSync(POSTS_PATH);

const ALL_POSTS = allPostFileName
  .map((fileName) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, fileName));
    const { data, content } = matter(source);
    return { data, content, fileName: fileName.replace('.mdx', '') };
  })
  .sort((a, b) => +new Date(b.data.date) - +new Date(a.data.date));

// TODO: cache mechanism

export const getPosts = ({
  limit,
  offset = 0,
  tags,
  category,
  keyword,
} = {}) => {
  let posts = ALL_POSTS;

  if (category) posts = posts.filter((post) => post.data.category === category);

  if (tags) {
    const parsedTags = tags.split(',');
    posts = posts.filter((post) =>
      post.data.tags.some((tag) => parsedTags.includes(tag))
    );
  }

  if (keyword) {
    posts = posts.filter((post) =>
      post.data.title.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  if (limit) posts = posts.slice(+offset, +offset + +limit);

  return posts;
};

export default function handler(req, res) {
  const {
    query: { limit, offset, tags, category, keyword },
  } = req;

  const posts = getPosts({
    limit,
    offset,
    tags,
    category,
    keyword,
  });

  res.status(200).json(posts);
}
