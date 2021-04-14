import PropTypes from 'prop-types';
import { memo, useEffect, useRef } from 'react';

const Image = ({ className, src, alt, lazy }) => {
  const imgRef = useRef();

  useEffect(() => {
    let observer;
    const lazyAttributeSupport = 'loading' in HTMLImageElement.prototype;

    if (!lazy || lazyAttributeSupport) {
      imgRef.current.src = imgRef.current.dataset.src;
    }

    if (lazy && !lazyAttributeSupport) {
      const handleLazyLoad = (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          observer.disconnect();
        }
      };

      observer = new IntersectionObserver(handleLazyLoad, {
        rootMargin: '0px 0px 256px 0px',
      });
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [lazy, src]);

  return (
    <img
      className={className}
      ref={imgRef}
      data-src={src}
      loading={lazy ? 'lazy' : 'eager'}
      alt={alt}
    />
  );
};

Image.defaultProps = {
  className: '',
  alt: undefined,
  lazy: false,
};

Image.propTypes = {
  className: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.string.isRequired,
  lazy: PropTypes.bool,
};

export default memo(Image);
