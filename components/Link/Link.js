import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { memo } from 'react';
import styled from 'styled-components';

const ALink = styled.a`
  color: black;
  font-size: 18px;
`;

const Link = ({ className, href, query, children, onClick }) => {
  return (
    <NextLink
      href={{
        pathname: href,
        query,
      }}
      passHref
    >
      <ALink onClick={onClick} className={className}>
        {children}
      </ALink>
    </NextLink>
  );
};

Link.defaultProps = {
  className: '',
  query: {},
  onClick: undefined,
};

Link.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  query: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default memo(Link);
