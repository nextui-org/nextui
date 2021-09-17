import React, { useEffect } from 'react';
import loadScript from '@utils/load-script';
import { useTheme } from '@nextui-org/react';

const CarbonAd: React.FC<unknown> = () => {
  const ref = React.useRef(null);

  const theme = useTheme();

  useEffect(() => {
    const scriptEl = document.getElementById('_carbonads_js');
    if (!ref.current || !!scriptEl) return;
    const script = loadScript(
      'https://cdn.carbonads.com/carbon.js?serve=CESIC53Y&placement=nextuiorg',
      ref.current
    );
    script.id = '_carbonads_js';
  }, []);

  return (
    <span id="carbon-ad" ref={ref}>
      <style jsx global>
        {`
          #carbonads * {
            margin: initial;
            padding: initial;
          }
          #carbonads {
            font-family: inherit;
            padding: 16px;
          }
          #carbonads {
            display: flex;
            width: 100%;
            max-width: 200px;
            border-radius: ${theme.layout.radius};
            background-color: ${theme.palette.accents_1};
            z-index: 100;
          }
          #carbonads a {
            color: inherit;
            text-decoration: none;
          }
          #carbonads a:hover {
            color: inherit;
          }
          #carbonads span {
            position: relative;
            display: block;
            overflow: hidden;
          }
          #carbonads .carbon-wrap {
            display: flex;
            flex-direction: column;
          }
          #carbonads .carbon-img {
            display: block;
            max-width: 200px;
            line-height: 1;
            margin-bottom: 8px;
          }
          #carbonads .carbon-img img {
            display: block;
            max-width: none !important;
            width: 100%;
            border-radius: ${theme.layout.radius};
            border: 0px;
            margin: 0px;
          }
          #carbonads .carbon-text {
            display: block;
            color: ${theme.palette.accents_6};
            font-size: 0.8rem;
            padding-bottom: 4px;
          }
          #carbonads .carbon-poweredby {
            display: flex;
            justify-content: flex-start;
            padding: 10px 0;
            color: ${theme.palette.accents_4};
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-weight: 600;
            font-size: 9px;
            line-height: 0;
            transition: all 0.25 ease;
          }
        `}
      </style>
    </span>
  );
};

const MemoCarbonAd = React.memo(CarbonAd);

export default MemoCarbonAd;
