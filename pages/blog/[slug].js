import dayjs from 'dayjs';
import fs from 'fs';
import matter from 'gray-matter';
import Head from 'next/head';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import styled, { keyframes } from 'styled-components';

import ArticleImage from '@/components/blog/ArticleImage';
import TableOfContent from '@/components/blog/TableOfContent';
import { MEDIA_QUERY_MD } from '@/constants/breakpoint';

import { POSTS_PATH } from '../api/articles';

const FadeIn = keyframes`
  from {
    transform: translateY(-15px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Root = styled.div`
  max-width: 1264px;
  margin: 0 auto;
  animation: ${FadeIn} 0.5s ease-in-out;
  display: flex;
  justify-content: center;

  * {
    line-height: 30px;
    letter-spacing: 1px;
  }
`;

const ContentSection = styled.div`
  max-width: 768px;
  width: 100%;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;

  ${MEDIA_QUERY_MD} {
    font-size: 30px;
  }
`;

const SubTitle = styled.h2.attrs((props) => ({
  id: `blog-sub-title-${props.children}`,
  className: 'blog-sub-title',
}))`
  margin: 0 0 20px 0;
  font-size: 23px;

  ${MEDIA_QUERY_MD} {
    margin: 0 0 25px 0;
    font-size: 25px;
  }
`;

const Paragraph = styled.p`
  margin: 0 0 15px 0;
  font-size: 16px;

  ${MEDIA_QUERY_MD} {
    margin: 0 0 20px 0;
    font-size: 18px;
  }
`;

const Strong = styled.strong`
  padding: 0 6px;
  background-color: rgb(246, 246, 249);
  border: 1px solid rgb(230, 230, 230);
  color: rgb(189, 65, 71);
  border-radius: 5px;
  font-weight: normal;
`;

const OL = styled.ol`
  margin: 0 0 15px 0;

  ${MEDIA_QUERY_MD} {
    margin: 0 0 20px 0;
    font-size: 18px;
  }
`;

const LI = styled.li`
  font-size: 15px;

  ${MEDIA_QUERY_MD} {
    font-size: 17px;
  }
`;

const Link = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  color: #4885c4;

  @media (hover: hover) {
    :hover {
      opacity: 0.7;
    }
  }
`;

const Code = styled(SyntaxHighlighter).attrs({
  language: 'javascript',
  style: atomOneDark,
})`
  margin: 0 0 15px 0;
  font-size: 16px;

  ${MEDIA_QUERY_MD} {
    margin: 0 0 20px 0;
    font-size: 18px;
  }
`;

const MetaWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  margin: 10px 0 20px;

  ${MEDIA_QUERY_MD} {
    margin: 20px 0 30px;
    align-items: center;
    flex-direction: row;
  }
`;

const Time = styled.p`
  font-size: 14px;
  color: rgb(173, 173, 173);
  margin: 0 10px 0 0;
`;

const CategoryTagWrap = styled.div`
  display: flex;
  margin-top: 5px;

  ${MEDIA_QUERY_MD} {
    margin-top: 0;
  }
`;

const Category = styled.span`
  font-weight: bold;
  font-size: 14px;
`;

const Tag = styled.span`
  background-color: white;
  border-radius: 20px;
  padding: 0 10px;
  font-size: 14px;
  font-weight: bold;
  box-shadow: rgb(128 128 128 / 47%) 0px 0px 4px;
  margin-left: 10px;
`;

const components = {
  ArticleImage,
  h1: Title,
  h2: SubTitle,
  p: Paragraph,
  a: Link,
  strong: Strong,
  ol: OL,
  li: LI,
  code: Code,
};

const BlogDetail = ({ source, metaData }) => {
  return (
    <Root>
      <Head>
        <title>Paul&apos;s Blog - {metaData.title}</title>
      </Head>
      <ContentSection>
        <Title>{metaData.title}</Title>
        <MetaWrapper>
          <Time>{dayjs(metaData.date).format('DD MMM YY')}</Time>
          <CategoryTagWrap>
            <Category>{metaData.category}</Category>
            {metaData.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </CategoryTagWrap>
        </MetaWrapper>
        <MDXRemote {...source} components={components} />
      </ContentSection>
      <TableOfContent />
    </Root>
  );
};

BlogDetail.propTypes = {
  source: PropTypes.shape({}).isRequired,
  metaData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);
  const mdxSource = await serialize(content);

  return {
    props: {
      source: mdxSource,
      metaData: data,
    },
  };
};

export const getStaticPaths = async () => {
  const allPostFileName = fs.readdirSync(POSTS_PATH);
  const paths = allPostFileName
    .map((name) => name.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default BlogDetail;
