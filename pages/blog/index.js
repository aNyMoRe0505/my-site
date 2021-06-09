// import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';

import { getPosts } from '../api/articles';

const Root = styled.div``;

const Blog = ({ posts }) => {
  const [articles] = useState(posts);
  console.log(articles);
  return <Root>hi</Root>;
};

Blog.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export function getStaticProps() {
  const posts = getPosts({ limit: 5, offset: 0 });
  return {
    props: {
      posts,
    },
  };
}

export default Blog;
