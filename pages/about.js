import dayjs from 'dayjs';
import styled, { keyframes } from 'styled-components';

import { MEDIA_QUERY_LG, MEDIA_QUERY_MD } from '@/constants/breakpoint';

const FadeFromLeftAnimation = keyframes`
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const FadeFromRightAnimation = keyframes`
  from {
    transform: translateX(50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const TitleLineAnimation = keyframes`
  from {
    width: 0%;
    opacity: 0;
  }
  to {
    width: 100%;
    opacity: 1;
  }
`;

const Root = styled.div`
  width: 100%;
  display: flex;

  flex-direction: column;

  ${MEDIA_QUERY_LG} {
    flex-direction: row;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 2;

  ${MEDIA_QUERY_MD} {
    align-items: flex-start;
  }
`;

const RightSection = styled.div`
  flex: 3;
  margin: 30px 0 0;

  ${MEDIA_QUERY_MD} {
    margin: 50px 0 0;
  }

  ${MEDIA_QUERY_LG} {
    margin: 9px 0 0;
  }
`;

const Title = styled.h1`
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

const SubText = styled.p`
  margin: 20px 0 0;
  font-size: 16px;
  text-align: left;
  opacity: 0;
  animation: ${FadeFromLeftAnimation} 0.5s ease 0.8s forwards;
  max-width: 400px;
  line-height: 30px;

  & + & {
    margin: 10px 0 0;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 18px;
  }
`;

const ExternalLink = styled.a.attrs({
  target: '_blank',
  rel: 'noreferrer',
})`
  color: ${(props) => props.$color};
  font-weight: bold;
  position: relative;
  width: fit-content;
  display: inline-block;

  ::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 100%;
    background-color: ${(props) => props.$color};
    bottom: 0px;
    left: 0;
  }

  @media (hover: hover) {
    :hover {
      opacity: 0.8;
    }
  }
`;

const RightTitle = styled.h1`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0 0;

  ${MEDIA_QUERY_MD} {
    font-size: 18px;
  }
`;

const Time = styled.p`
  margin: 0;
  font-size: 14px;
  color: rgb(173, 173, 173);

  ${MEDIA_QUERY_MD} {
    font-size: 15px;
  }

  & + & {
    margin-left: 10px;
  }
`;

const WorkSeparateLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e4e3e3;
  margin: 15px 0;
`;

const WorkTimeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const EduBlock = styled.div`
  opacity: 0;
  animation: ${FadeFromRightAnimation} 0.5s ease 0.8s forwards;

  ::after {
    display: block;
    content: '';
    height: 3px;
    width: 100%;
    background-color: black;
    margin: 15px 0;
  }
`;

const WorkBlock = styled.div`
  opacity: 0;
  animation: ${FadeFromRightAnimation} 0.5s ease ${(props) => props.$delay}s
    forwards;
`;

const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const Tag = styled.span`
  background-color: white;
  border-radius: 20px;
  padding: 5px 13px;
  font-size: 14px;
  font-weight: bold;
  box-shadow: rgb(128 128 128 / 47%) 0px 0px 4px;
  cursor: pointer;
  margin: 0 10px 10px 0;
  opacity: 0;
  animation: ${FadeFromRightAnimation} 0.5s ease ${(props) => props.$delay}s
    forwards;
`;

const workExperiences = [
  {
    companyAbbrev: 'OneDegree',
    companyName: '甯寶金融科技',
    jobTitle: '前端工程師',
    from: '2020-09-14',
    to: null,
  },
  {
    companyAbbrev: 'Gogoro',
    companyName: '睿能創意',
    jobTitle: '前端工程師',
    from: '2020-04-06',
    to: '2020-09-09',
  },
  {
    companyAbbrev: 'Rytass',
    companyName: '八拍子',
    jobTitle: '軟體工程師',
    from: '2019-01-01',
    to: '2020-02-28',
  },
];

const skillTags = [
  'HTML',
  'JAVASCRIPT',
  'CSS',
  'REACT',
  'NEXT.JS',
  'NODE.JS',
  'MYSQL',
];

const About = () => {
  return (
    <Root>
      <LeftSection>
        <Title>About Me</Title>
        <SubText>
          Hi, 我是 Paul, 政大資管系畢業,目前在{' '}
          <ExternalLink
            href="https://www.onedegree.hk/en-us/about-us"
            $color="#00bcb2"
          >
            OneDegree
          </ExternalLink>{' '}
          擔任前端工程師, 曾經也開發過後端,
          但比較喜歡有畫面的感覺所以選擇了前端。
        </SubText>
        <SubText>
          喜歡打球、看漫畫。 最喜歡的球星是{' '}
          <ExternalLink
            href="https://www.basketball-reference.com/players/b/bealbr01.html"
            $color="#da6464"
          >
            Bradley Beal
          </ExternalLink>
          , 最喜歡的漫畫是{' '}
          <ExternalLink
            href="https://en.wikipedia.org/wiki/Blue_Giant_(manga)"
            $color="#296aac"
          >
            Blue Giant
          </ExternalLink>
        </SubText>
      </LeftSection>
      <RightSection>
        <EduBlock>
          <Time>2014-09 - 2018-06</Time>
          <RightTitle>國立政治大學 - 資訊管理學系 學士</RightTitle>
        </EduBlock>
        {workExperiences.map((experience, index) => {
          const now = new Date();
          const monthDiff = dayjs(experience.to || now).diff(
            experience.from,
            'month'
          );
          const yearDiff = Math.floor(monthDiff / 12);

          const to = (experience.to && ` ${experience.to}`) || '';

          return (
            <WorkBlock
              $delay={0.8 + index * 0.1}
              key={experience.companyAbbrev}
            >
              <WorkTimeWrapper>
                <Time>{`${experience.from} ~${to}`}</Time>
                <Time>{`${yearDiff}年${monthDiff - 12 * yearDiff}個月`}</Time>
              </WorkTimeWrapper>
              <RightTitle>{`${experience.companyAbbrev} - ${experience.companyName} ${experience.jobTitle}`}</RightTitle>
              <WorkSeparateLine />
            </WorkBlock>
          );
        })}
        <TagWrapper>
          {skillTags.map((tag, index) => (
            <Tag
              $delay={0.8 + (workExperiences.length - 1) * 0.1 + index * 0.1}
              key={tag}
            >
              {tag}
            </Tag>
          ))}
        </TagWrapper>
      </RightSection>
    </Root>
  );
};

export default About;
