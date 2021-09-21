import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { loadScript, removeScript } from '@utils/scripts';
import { useTheme } from '@nextui-org/react';
import useIsMounted from '@hooks/use-is-mounted';
import { isProd } from '@utils/index';

const CarbonAd: React.FC<unknown> = () => {
  const ref = React.useRef(null);
  const theme = useTheme();
  const router = useRouter();

  const isMounted = useIsMounted();

  const loadAd = () => {
    const scriptEl = document.getElementById('_carbonads_js');
    const carbonAds = document.getElementById('carbonads');
    if (!ref.current) return;
    if (scriptEl) {
      removeScript(scriptEl, ref.current);
      scriptEl.innerHTML = '';
      carbonAds && carbonAds?.remove();
      scriptEl?.remove();
    }
    const script = loadScript(
      'https://cdn.carbonads.com/carbon.js?serve=CESIC53Y&placement=nextuiorg',
      ref.current
    );
    script.id = '_carbonads_js';
  };

  useEffect(() => {
    isMounted() && loadAd();
  }, [isMounted]);

  useEffect(() => {
    const handleRouteChange = (
      url: string,
      { shallow }: { shallow: boolean }
    ) => {
      console.log(
        `NextUI 🚀 - is changing to ${url} ${
          shallow ? 'with' : 'without'
        } shallow routing`
      );
      loadAd();
    };
    router.events.on('routeChangeStart', handleRouteChange);
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    // ref: https://nextjs.org/docs/api-reference/next/router
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  if (!isProd) return null;

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
            max-width: 100%;
            padding: calc(${theme.layout.gap} * 0.75) ${theme.layout.gap};
          }
          #carbonads {
            display: flex;
            width: 100%;
            border-radius: ${theme.layout.radius};
            background-color: ${theme.palette.accents_1};
            z-index: 100;
          }
          #carbonads a {
            color: inherit;
            text-decoration: none;
            transition: all 0.25s ease;
          }
          #carbonads a:hover {
            color: inherit;
          }
          #carbonads span {
            width: 100%;
            position: relative;
            display: block;
            overflow: hidden;
          }
          #carbonads .carbon-wrap {
            display: flex;
            flex-direction: row;
          }
          #carbonads .carbon-img {
            display: block;
            line-height: 1;
            max-width: 130px;
            width: 100%;
          }
          #carbonads .carbon-img img {
            display: block;
            max-width: 100% !important;
            width: 100%;
            border-radius: calc(${theme.layout.radius} - 4px);
            border: 0px;
            margin: 0px;
          }
          #carbonads .carbon-text {
            display: block;
            font-size: 1rem;
            width: 100%;
            color: ${theme.palette.accents_6};
            padding: ${theme.layout.gapHalf};
          }
          #carbonads .carbon-poweredby {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            position: absolute;
            bottom: 0;
            right: 0;
            padding: 10px 0;
            color: ${theme.palette.accents_4};
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-weight: 600;
            font-size: 9px;
            line-height: 0;
            transition: all 0.25 ease;
          }
          @media only screen and (max-width: ${theme.breakpoints.xs.max}) {
            #carbonads .carbon-text {
              font-size: 0.9rem;
            }
          }
        `}
      </style>
    </span>
  );
};

export default CarbonAd;
