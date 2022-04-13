import styled, { css } from 'styled-components';

import Link from '@/components/Link';
import { MEDIA_QUERY_MD } from '@/constants/breakpoint';
import { FadeFromRightAnimation } from '@/styles/mainStyle';

const FadeFromRightCSS = css`
  opacity: 0;
  animation: ${FadeFromRightAnimation} 0.5s ease
    ${(props) => (props.$isMounted ? 0 : props.$delay)}s forwards;
`;

export const ArticleBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  word-break: break-word;
  ${FadeFromRightCSS}

  ${MEDIA_QUERY_MD} {
    justify-content: space-between;
    flex-direction: row;
  }
`;

export const SeparateLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e4e3e3;
  margin: 30px 0;
  ${FadeFromRightCSS}
`;

export const TimeBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  margin: 20px 0 0;

  ${MEDIA_QUERY_MD} {
    margin: 0;
  }
`;

export const LearnBlock = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  margin: 25px 0 0;

  ${MEDIA_QUERY_MD} {
    justify-content: flex-end;
    margin: 0;
  }
`;

export const LinkButton = styled(Link)`
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

export const MinuteText = styled.span`
  font-weight: bold;
  font-size: 16px;
  line-height: 35px;

  ${MEDIA_QUERY_MD} {
    font-size: 18px;
  }
`;

export const DateText = styled.span`
  color: rgb(173, 173, 173);
  margin: 0;
  font-size: 14px;

  ${MEDIA_QUERY_MD} {
    margin: 10px 0 0;
  }
`;

export const ArticleTitle = styled.h1`
  margin: 0;
  font-size: 22px;
  font-weight: bold;
  line-height: 35px;

  ${MEDIA_QUERY_MD} {
    font-size: 28px;
  }
`;

export const ArticleDesc = styled.p`
  margin: 20px 0 0;
  font-size: 16px;
`;
