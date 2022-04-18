import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import styled from 'styled-components';

import { MEDIA_QUERY_MD } from '@/constants/breakpoint';
import URLS from '@/constants/urls';
import {
  ArticleBlock,
  ArticleDesc,
  ArticleTitle,
  ContentBlock,
  DateText,
  LearnBlock,
  LinkButton,
  MinuteText,
  SeparateLine,
  TimeBlock,
} from '@/styles/articleBlock';
import {
  FadeFromRightAnimation,
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

const ExploreButton = styled(LinkButton)`
  margin: 0 0 0 auto;
  display: block;
  width: fit-content;
  opacity: 0;
  animation: ${FadeFromRightAnimation} 0.5s ease ${(props) => props.$delay}s
    forwards;
`;

const Home = ({ posts }) => {
  return (
    <RootWrapper>
      <LeftSection>
        <Title>What&apos;s News?</Title>
        <StyledSubText>想到什麼就寫什麼, 通常是筆記, 萬年不更新</StyledSubText>
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
