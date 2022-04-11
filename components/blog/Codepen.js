import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  margin: 0 0 20px 0;
`;

const Codepen = ({ src }) => {
  return (
    <Wrapper>
      <div dangerouslySetInnerHTML={{ __html: src }} />
    </Wrapper>
  );
};

Codepen.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Codepen;
