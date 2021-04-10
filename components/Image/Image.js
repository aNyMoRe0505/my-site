import PropTypes from 'prop-types';
import { memo, useEffect, useRef } from 'react';

const Image = ({ className, src, alt, lazy }) => {
  const imgRef = useRef();

  useEffect(() => {
    if (!lazy) {
      imgRef.current.src = imgRef.current.dataset.src;
      return;
    }

    if ('loading' in HTMLImageElement.prototype) {
      imgRef.current.loading = 'lazy';
      imgRef.current.src = imgRef.current.dataset.src;
    }
    // if not support see _app.js
  }, [lazy]);

  return (
    <img
      className={`${className}${lazy && ' lazy'}`}
      ref={imgRef}
      data-src={src}
      alt={alt}
    />
  );
};

Image.defaultProps = {
  className: '',
  alt: undefined,
  lazy: true,
};

Image.propTypes = {
  className: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.string.isRequired,
  lazy: PropTypes.bool,
};

export default memo(Image);
