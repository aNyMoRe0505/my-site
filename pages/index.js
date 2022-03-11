import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import styled from 'styled-components';

import Link from '@/components/Link';
import { MEDIA_QUERY_MD } from '@/constants/breakpoint';
import URLS from '@/constants/urls';
import {
  FadeFromRightAnimation,
  LeftSection,
  RightSection,
  RootWrapper,
  SubText,
  Title,
} from '@/styles/mainStyle';

import { getPosts } from './api/articles';

const ArticleBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  word-break: break-word;
  opacity: 0;
  animation: ${FadeFromRightAnimation} 0.5s ease ${(props) => props.$delay}s
    forwards;

  ${MEDIA_QUERY_MD} {
    justify-content: space-between;
    flex-direction: row;
  }
`;

const SeparateLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e4e3e3;
  margin: 30px 0;
  opacity: 0;
  animation: ${FadeFromRightAnimation} 0.5s ease ${(props) => props.$delay}s
    forwards;
`;

const TimeBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  margin: 20px 0 0;

  ${MEDIA_QUERY_MD} {
    margin: 0;
  }
`;

const LearnBlock = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  margin: 25px 0 0;

  ${MEDIA_QUERY_MD} {
    justify-content: flex-end;
    margin: 0;
  }
`;

const LinkButton = styled(Link)`
  font-size: 16px;
  font-weight: bold;
  position: relative;
  height: fit-content;
  border: 1px solid black;
  color: black;
  padding: 5px;
  transition: all 0.3s ease;

  ::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    width: 0%;
    height: 100%;
    background-color: white;
    transition: all 0.3s ease;
  }

  @media (hover: hover) {
    :hover {
      color: white;

      ::after {
        width: 100%;
        background-color: black;
      }
    }
  }
`;

const ExploreButton = styled(LinkButton)`
  margin: 0 0 0 auto;
  display: block;
  width: fit-content;
  opacity: 0;
  animation: ${FadeFromRightAnimation} 0.5s ease ${(props) => props.$delay}s
    forwards;
`;

const MinuteText = styled.span`
  font-weight: bold;
  font-size: 16px;
  line-height: 35px;

  ${MEDIA_QUERY_MD} {
    font-size: 18px;
  }
`;

const DateText = styled.span`
  color: rgb(173, 173, 173);
  margin: 0;
  font-size: 14px;

  ${MEDIA_QUERY_MD} {
    margin: 10px 0 0;
  }
`;

const ArticleTitle = styled.h1`
  margin: 0;
  font-size: 22px;
  font-weight: bold;
  line-height: 35px;

  ${MEDIA_QUERY_MD} {
    font-size: 28px;
  }
`;

const ArticleDesc = styled.p`
  margin: 20px 0 0;
  font-size: 16px;
`;

const Home = ({ posts }) => {
  return (
    <RootWrapper>
      <LeftSection>
        <Title>What&apos;s News?</Title>
        <SubText>想到什麼就寫什麼, 通常是筆記, 萬年不更新</SubText>
      </LeftSection>
      <RightSection>
        {posts.map((article, index) => (
          <Fragment key={article.fileName}>
            <ArticleBlock $delay={0.8 + index * 0.1}>
              <TimeBlock>
                <MinuteText>{article.data.readTime} Mins Read</MinuteText>
                <DateText>
                  {dayjs(article.data.date).format('DD MMM YY')}
                </DateText>
              </TimeBlock>
              <ContentBlock>
                <ArticleTitle>{article.data.title}</ArticleTitle>
                <ArticleDesc>{article.data.desc}</ArticleDesc>
              </ContentBlock>
              <LearnBlock>
                <LinkButton
                  href={URLS.BLOG_DETAIL}
                  query={{ slug: article.fileName }}
                >
                  Learn More
                </LinkButton>
              </LearnBlock>
            </ArticleBlock>
            <SeparateLine $delay={0.8 + index * 0.1} />
          </Fragment>
        ))}
        <ExploreButton href={URLS.BLOG} $delay={0.8 + posts.length * 0.1}>
          Explore More
        </ExploreButton>
      </RightSection>
    </RootWrapper>
  );
};

Home.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export function getStaticProps() {
  const posts = getPosts({ limit: 3, offset: 0 });
  return {
    props: {
      posts,
    },
  };
}

export default Home;
