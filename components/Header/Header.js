import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo, useCallback, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { MEDIA_QUERY_MD } from '@/constants/breakpoint';
import URLS from '@/constants/urls';
import useDelayUnmount from '@/hooks/useDelayUnmount';
import useLayout from '@/hooks/useLayout';

import Image from '../Image';
import Link from '../Link';

export const HEADER_HEIGHT = 72;

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

const MobileLinkOpenAnimation = keyframes`
  0% {
    transform: translateX(-50px);
    opacity: 0;
  }
  50% {
    transform: translateX(0);
    opacity: 1;
  }
  75% {
    transform: translateX(-5px);
    opacity: 1;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const MobileLinkCloseAnimation = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  50% {
    transform: translateX(-5px);
    opacity: 1;
    
  }
  75% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-50px);
    opacity: 0;
  }
`;

const Root = styled.div`
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  position: sticky;
  z-index: 999;
  top: 0;
`;

const HeaderRoot = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgb(0 0 0 / 5%) 0px 4px 20px;
  background-color: rgb(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1024px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
  opacity: 0;
  animation: ${FadeInFromLeft} 0.5s ease 0.5s forwards;
  padding: 0 30px;

  ${MEDIA_QUERY_MD} {
    justify-content: center;
  }
`;

const Logo = styled(Image)`
  width: 170px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  ${MEDIA_QUERY_MD} {
    transform: translate(0, -50%);
    left: 0;
  }
`;

const StyledLink = styled(Link)`
  letter-spacing: 1px;
  position: relative;

  & + & {
    margin-left: 35px;
  }

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

  @media (hover: hover) {
    :hover {
      font-weight: bold;
      ::after {
        width: 100%;
      }
    }
  }
`;

const HamburgerWrapper = styled.button.attrs({
  type: 'button',
})`
  padding: 0;
  margin: 0;
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 20px;
`;

const MobileMenu = styled.div`
  position: absolute;
  left: 30px;
  top: ${HEADER_HEIGHT + 20}px;
  pointer-events: ${(props) => (props.$menuOpen ? 'auto' : 'none')};
`;

const MobileLink = styled(Link)`
  padding: 10px;
  background-color: black;
  color: white;
  border-radius: 4px;
  display: block;
  box-shadow: rgb(0 0 0 / 5%) 0px 4px 20px;
  opacity: ${(props) => (props.$menuOpen ? 0 : 1)};
  animation: ${(props) =>
      props.$menuOpen ? MobileLinkOpenAnimation : MobileLinkCloseAnimation}
    0.5s ease ${(props) => props.$delay}s forwards;

  & + & {
    margin-top: 10px;
  }
`;

const links = [
  {
    text: 'Home',
    pathname: URLS.HOME,
  },
  {
    text: 'About',
    pathname: URLS.ABOUT,
  },
  {
    text: 'Blog',
    pathname: URLS.BLOG,
  },
  {
    text: 'Archives',
    pathname: URLS.ARCHIVES,
  },
];

const Header = () => {
  const { isMobile } = useLayout();
  const [menuOpen, setMenuOpen] = useState(false);
  const isMounted = useDelayUnmount(menuOpen, 700);

  const handleToggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);
  const handleMenuClose = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <Root>
      <HeaderRoot>
        <Container>
          {isMobile && (
            <HamburgerWrapper onClick={handleToggleMenu}>
              <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
            </HamburgerWrapper>
          )}
          <Link href={URLS.HOME} onClick={handleMenuClose}>
            <Logo src="/logo.png" alt="logo" />
          </Link>
          {!isMobile &&
            links.map((link) => (
              <StyledLink
                key={link.text}
                href={link.pathname}
                onClick={handleMenuClose}
              >
                {link.text}
              </StyledLink>
            ))}
        </Container>
        {isMobile && isMounted && (
          <MobileMenu $menuOpen={menuOpen}>
            {links.map((link, index) => (
              <MobileLink
                $menuOpen={menuOpen}
                onClick={handleMenuClose}
                key={link.text}
                href={link.pathname}
                $delay={
                  menuOpen ? index * 0.1 : (links.length - 1 - index) * 0.1
                }
              >
                {link.text}
              </MobileLink>
            ))}
          </MobileMenu>
        )}
      </HeaderRoot>
    </Root>
  );
};

export default memo(Header);
