import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import qs from 'qs';
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

import { HEADER_HEIGHT } from '@/components/Header';
import { MEDIA_QUERY_LG } from '@/constants/breakpoint';
import URLS from '@/constants/urls';
import useAPI from '@/hooks/useAPI';
import useIsMounted from '@/hooks/useIsMounted';
import useLatest from '@/hooks/useLatest';
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
  FadeFromLeftAnimation,
  LeftSection,
  RightSection,
  RootWrapper,
  Title,
} from '@/styles/mainStyle';

import { getPosts } from '../api/articles';

const StyledLeftSection = styled(LeftSection)`
  ${MEDIA_QUERY_LG} {
    position: sticky;
    top: ${HEADER_HEIGHT + 20}px;
    height: fit-content;
  }
`;

const StyledRightSectionWrapper = styled(RightSection)`
  position: relative;
`;

const SearchBox = styled.div`
  opacity: 0;
  animation: ${FadeFromLeftAnimation} 0.5s ease 0.8s forwards;
  margin: 20px 0 0;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 200px;
  height: 40px;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 7px;
  outline: none;
  border: 1px solid black;
`;

const SearchIcon = styled(FontAwesomeIcon).attrs({
  icon: faSearch,
})`
  && {
    color: black;
    margin: 0 0 0 10px;
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
`;

const Flag = styled.div`
  width: 20px;
  height: 20px;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ARTICLE_LIMIT = 5;

const fetchArticle = async ({ keyword = '', offset = 0 } = {}) => {
  const queryStr = qs.stringify({ keyword, limit: ARTICLE_LIMIT, offset });
  const rawResult = await fetch(`/api/articles?${queryStr}`);
  return rawResult.json();
};

const Blog = ({ posts }) => {
  const [articles, setArticles] = useState(posts);
  const [keyword, setKeyword] = useState('');
  const [offset, setOffset] = useState(0);
  const isMounted = useIsMounted();
  const [isFetchingEnd, setIsFetchingEnd] = useState(false);
  const fetchMoreRef = useRef();
  const { send, loading } = useAPI({ queryFn: fetchArticle });

  const keywordRef = useLatest(keyword);
  const offsetRef = useLatest(offset);
  const loadingRef = useLatest(loading);

  const handleKeywordSearch = useCallback(() => {
    if (loadingRef.current) return;
    send({ keyword: keywordRef.current }).then((result) => {
      setArticles(result);
      setOffset(0);
      setIsFetchingEnd(false);
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    });
  }, [loadingRef, keywordRef, send]);

  useEffect(() => {
    const handleFetchMore = (entries) => {
      if (loadingRef.current || !entries[0].isIntersecting) return;

      const newOffset = offsetRef.current + ARTICLE_LIMIT;
      send({ keyword: keywordRef.current, offset: newOffset }).then(
        (result) => {
          if (!result.length) {
            setIsFetchingEnd(true);
          } else {
            setArticles((prev) => [...prev, ...result]);
            setOffset(newOffset);
          }
        }
      );
    };

    let observer;

    if (!isFetchingEnd) {
      observer = new IntersectionObserver(handleFetchMore);
      observer.observe(fetchMoreRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [send, keywordRef, offsetRef, loadingRef, isFetchingEnd]);

  const MemoizeRightSection = useMemo(() => {
    const delaySec = isMounted() ? 0 : 0.8;
    return (
      <>
        {articles.length ? (
          articles.map((article, index) => (
            <Fragment key={article.fileName}>
              <ArticleBlock $delay={delaySec + index * 0.1}>
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
              <SeparateLine $delay={delaySec + index * 0.1} />
            </Fragment>
          ))
        ) : (
          <h1>QQ 沒有相關文章</h1>
        )}
      </>
    );
  }, [articles, isMounted]);

  return (
    <RootWrapper>
      <StyledLeftSection>
        <Title>Blog</Title>
        <SearchBox>
          <SearchInput
            placeholder="請輸入關鍵字"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <SearchIcon onClick={handleKeywordSearch} />
        </SearchBox>
      </StyledLeftSection>
      <StyledRightSectionWrapper>
        {MemoizeRightSection}
        <Flag ref={fetchMoreRef} />
      </StyledRightSectionWrapper>
    </RootWrapper>
  );
};

Blog.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export function getStaticProps() {
  const posts = getPosts({ limit: ARTICLE_LIMIT, offset: 0 });
  return {
    props: {
      posts,
    },
  };
}

export default Blog;
