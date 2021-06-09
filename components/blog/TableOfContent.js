import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

import { HEADER_HEIGHT } from '@/components/Header';
import { MEDIA_QUERY_LG } from '@/constants/breakpoint';

const Root = styled.div`
  display: none;

  ${MEDIA_QUERY_LG} {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    width: 250px;
    height: fit-content;
    margin-left: 80px;
    background-color: black;
    position: sticky;
    top: ${HEADER_HEIGHT + 15}px;
    border-radius: 5px;
    box-shadow: rgb(0 0 0 / 5%) 0px 4px 20px;
    background-color: rgb(255, 255, 255);
  }
`;

const Title = styled.div`
  font-size: 20px;
`;

const SeparateLine = styled.div`
  width: 80%;
  height: 3px;
  background-color: black;
  border-radius: 4px;
  margin: 10px 0px;
`;

const SubTitleLink = styled.div`
  font-size: 18px;
  cursor: pointer;
  position: relative;

  ::after {
    content: '';
    width: 0%;
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    height: 3px;
    background-color: black;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  & + & {
    margin-top: 10px;
  }

  @media (hover: hover) {
    :hover {
      font-weight: bold;
      ::after {
        width: 100%;
      }
    }
  }
`;

const TableOfContent = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const allH2Title = document.getElementsByClassName('blog-sub-title');
    setContents(Array.from(allH2Title));
  }, []);

  if (!contents.length) return null;

  return (
    <Root>
      <Title>目錄</Title>
      <SeparateLine />
      {contents.map((contentDOM) => (
        <SubTitleLink
          onClick={() => {
            const elementOffsetTop = document.getElementById(contentDOM.id)
              ?.offsetTop;

            window.scroll({
              top: elementOffsetTop - HEADER_HEIGHT - 50,
              left: 0,
              behavior: 'smooth',
            });
          }}
          key={contentDOM.innerHTML}
        >
          {contentDOM.innerHTML}
        </SubTitleLink>
      ))}
    </Root>
  );
};

export default memo(TableOfContent);
