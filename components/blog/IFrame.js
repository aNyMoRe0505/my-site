import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  margin: 0 0 20px 0;
`;

const IFrame = ({ src }) => {
  return (
    <Wrapper>
      <div dangerouslySetInnerHTML={{ __html: src }} />
    </Wrapper>
  );
};

IFrame.propTypes = {
  src: PropTypes.string.isRequired,
};

export default IFrame;
