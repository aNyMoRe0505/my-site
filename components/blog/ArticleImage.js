import PropTypes from 'prop-types';
import styled from 'styled-components';

import Image from '../Image';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 20px 0;
`;

const StyledImage = styled(Image)`
  width: 100%;
`;

const Remark = styled.span`
  font-size: 14px;
  color: gray;
  margin-top: 8px;
`;

const ArticleImage = ({ alt, src, remark }) => {
  return (
    <Wrapper>
      <StyledImage src={src} alt={alt} />
      {remark && <Remark>{remark}</Remark>}
    </Wrapper>
  );
};

ArticleImage.propTypes = {
  alt: PropTypes.string,
  remark: PropTypes.string,
  src: PropTypes.string.isRequired,
};

ArticleImage.defaultProps = {
  alt: '',
  remark: '',
};

export default ArticleImage;
