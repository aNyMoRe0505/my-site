import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from '@/components/Link';
import { MEDIA_QUERY_MD } from '@/constants/breakpoint';
import URLS from '@/constants/urls';
import { FadeFromRightCSS } from '@/styles/articleBlock';
import {
  LeftSection,
  RightSection,
  RootWrapper,
  SubText,
  Title,
} from '@/styles/mainStyle';

import { getPosts } from './api/articles';

const StyledSubText = styled(SubText)`
  text-align: center;

  ${MEDIA_QUERY_MD} {
    text-align: left;
  }
`;

const TimeSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  & + & {
    margin: 30px 0 0;
  }
  ${FadeFromRightCSS}
`;

const Time = styled.div`
  font-size: 20px;
  font-weight: bold;

  ${MEDIA_QUERY_MD} {
    font-size: 30px;
  }

  ::after {
    display: block;
    content: '';
    height: 3px;
    width: 100%;
    background-color: black;
    margin: 10px 0;
  }
`;

const ArticleLink = styled(Link)`
  font-size: 16px;
  font-weight: normal;
  position: relative;
  & + & {
    margin-top: 10px;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 18px;
  }

  @media (hover: hover) {
    :hover {
      font-weight: bold;
    }
  }
`;

const Archives = ({ posts }) => {
  return (
    <RootWrapper>
      <LeftSection>
        <Title>Archives</Title>
        <StyledSubText>歷年文章</StyledSubText>
      </LeftSection>
      <RightSection>
        {Object.keys(posts)
          .sort((a, b) => +b - +a)
          .map((time, index) => (
            <TimeSection $delay={0.8 + index * 0.1} key={time}>
              <Time>{time}</Time>
              {posts[time].map((article) => (
                <ArticleLink
                  href={URLS.BLOG_DETAIL}
                  query={{ slug: article.fileName }}
                  key={article.fileName}
                >
                  {article.data.title}
                </ArticleLink>
              ))}
            </TimeSection>
          ))}
      </RightSection>
    </RootWrapper>
  );
};

Archives.propTypes = {
  posts: PropTypes.shape({}).isRequired,
};

export function getStaticProps() {
  let posts = getPosts();

  const groupBy = (array, transformKey) => {
    const result = {};

    array.forEach((item) => {
      const key = transformKey(item);
      if (key in result) {
        result[key].push(item);
      } else {
        result[key] = [item];
      }
    });
    return result;
  };

  posts = groupBy(posts, (item) => dayjs(item.data.date).format('YYYY'));

  return {
    props: {
      posts,
    },
  };
}

export default Archives;
