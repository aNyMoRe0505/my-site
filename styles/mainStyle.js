import styled, { keyframes } from 'styled-components';

import { MEDIA_QUERY_LG, MEDIA_QUERY_MD } from '@/constants/breakpoint';

export const FadeFromLeftAnimation = keyframes`
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const FadeFromRightAnimation = keyframes`
  from {
    transform: translateX(50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const TitleLineAnimation = keyframes`
  from {
    width: 0%;
    opacity: 0;
  }
  to {
    width: 100%;
    opacity: 1;
  }
`;

export const RootWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  ${MEDIA_QUERY_LG} {
    flex-direction: row;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 2;

  ${MEDIA_QUERY_MD} {
    align-items: flex-start;
  }
`;

export const RightSection = styled.div`
  flex: 3;
  margin: 30px 0 0;

  ${MEDIA_QUERY_MD} {
    margin: 50px 0 0;
  }

  ${MEDIA_QUERY_LG} {
    margin: 0;
  }
`;

export const Title = styled.h1`
  margin: 0;
  color: black;
  font-weight: bold;
  font-size: 35px;
  position: relative;
  width: fit-content;
  opacity: 0;
  animation: ${FadeFromLeftAnimation} 0.5s ease forwards;

  ::after {
    content: '';
    position: absolute;
    height: 3px;
    width: 0%;
    background-color: black;
    bottom: -5px;
    left: 0;
    animation: ${TitleLineAnimation} 0.5s ease 0.3s forwards;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 45px;
  }
`;

export const SubText = styled.p`
  margin: 20px 0 0;
  font-size: 16px;
  text-align: left;
  opacity: 0;
  animation: ${FadeFromLeftAnimation} 0.5s ease 0.8s forwards;
  max-width: 400px;
  line-height: 30px;
  width: 100%;

  & + & {
    margin: 10px 0 0;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 18px;
  }
`;
