import React, { useEffect, useState } from 'react';

const AnchorLink: React.FC = () => {
  const [targetHeading, setTargetHeading] = useState<HTMLElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 759.99px)');
    setIsMobile(mediaQuery.matches);

    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target && ['H2', 'H3', 'H4', 'H5', 'H6'].includes(target.tagName) && target.id) {
        setTargetHeading(target);
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const relatedTarget = event.relatedTarget as HTMLElement;
      if (
        target &&
        ['H2', 'H3', 'H4', 'H5', 'H6'].includes(target.tagName) &&
        target.id &&
        (!relatedTarget || !relatedTarget.classList.contains('anchor-link-button'))
      ) {
        setTargetHeading(null);
      }
    };

    document.body.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.body.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  useEffect(() => {
    if (!targetHeading) {
      setCopied(false);
    }
  }, [targetHeading]);

  const handleCopy = () => {
    if (targetHeading) {
      const url = `${window.location.origin}${window.location.pathname}#${targetHeading.id}`;
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
      window.location.hash = targetHeading.id;
    }
  };

  if (!targetHeading) return null;

  const { top, left, width } = targetHeading.getBoundingClientRect();
  const computedStyle = window.getComputedStyle(targetHeading);

  const style: React.CSSProperties = {
    top: top + window.scrollY,
    left: isMobile ? left + window.scrollX + width + -30 : left + window.scrollX - 30,
    fontSize: computedStyle.fontSize,
    lineHeight: computedStyle.lineHeight,
  };

  return (
    <button
      className="anchor-link-button"
      onClick={handleCopy}
      onMouseLeave={() => setTargetHeading(null)}
      style={style}
    >
      {copied ? '✓' : '#'}
    </button>
  );
};

export default AnchorLink;
