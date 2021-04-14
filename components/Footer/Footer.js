import { memo } from 'react';
import styled, { keyframes } from 'styled-components';

const FadeInFromLeft = keyframes`
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const FooterRoot = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 0 15px 15px;
  opacity: 0;
  animation: ${FadeInFromLeft} 0.5s ease forwards;
`;

const Text = styled.p`
  margin: 0;

  a {
    font-weight: bold;

    @media (hover: hover) {
      :hover {
        opacity: 0.8;
      }
    }
  }
`;

const Footer = () => {
  return (
    <FooterRoot>
      <Text>
        Design reference:{' '}
        <a
          target="_blank"
          href="https://dribbble.com/D-studio"
          style={{ color: '#d85988' }}
          rel="noreferrer"
        >
          DStudio®
        </a>
      </Text>
      <Text>
        Icon:{' '}
        <a
          target="_blank"
          href="https://fontawesome.com/"
          style={{ color: '#3a7dce' }}
          rel="noreferrer"
        >
          Font Awesome
        </a>
      </Text>
    </FooterRoot>
  );
};

export default memo(Footer);
