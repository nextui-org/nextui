import React, {useCallback, useEffect} from "react";
import Script from "next/script";
import {loadScript} from "@utils/scripts";
import {useTheme} from "@nextui-org/react";
import {isProd} from "@utils/index";
import useIsMounted from "@hooks/use-is-mounted";

import carbonOptimize from "./carbon-optimize";

const ADS_PROVIDER_RATIO = 0.5;

const CarbonAd: React.FC<unknown> = () => {
  const carbonRef = React.useRef(null);
  const {theme, isDark} = useTheme();
  const [showEthicalAds, setShowEthicalAds] = React.useState(false);

  const isMounted = useIsMounted();

  const loadEthicalAds = useCallback(() => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = "https://media.ethicalads.io/media/client/ethicalads.min.js";
      script.async = true;
      script.onload = () => {
        // @ts-ignore
        resolve(window.ethicalads);
      };

      script.onerror = () => {
        resolve(null);
      };

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    });
  }, []);

  useEffect(() => {
    const shouldShowEthicalAds = Math.random() < ADS_PROVIDER_RATIO;

    let loadCarbon: any = null;

    const loadCarbonAds = () => {
      setShowEthicalAds(false);
      // The isolation logic of carbonads is flawed.
      // Once the script starts loading, it will asynchronous resolve, with no way to stop it.
      // This leads to duplication of the ad. To solve the issue, we debounce the load action.
      loadCarbon =
        isMounted &&
        setTimeout(() => {
          const script = loadScript(
            "https://cdn.carbonads.com/carbon.js?serve=CESIC53Y&placement=nextuiorg",
            carbonRef.current,
          );

          script.id = "_carbonads_js";
          carbonOptimize.init();
        });
    };

    const loadAdProvider = async () => {
      if (shouldShowEthicalAds) {
        try {
          const ethicalads = await loadEthicalAds();

          if (!ethicalads) {
            loadCarbonAds();

            return;
          }

          // @ts-ignore
          ethicalads.wait.then((placements) => {
            if (!placements.length) {
              loadCarbonAds();
            } else {
              setShowEthicalAds(true);
            }
          });
        } catch (error) {
          loadCarbonAds();
        }
      } else {
        loadCarbonAds();
      }
    };

    loadAdProvider();

    return () => {
      loadCarbon && clearTimeout(loadCarbon);
    };
  }, [isMounted, isDark]);

  if (!isProd) return null;

  return (
    <>
      <>
        <Script async src="https://media.ethicalads.io/media/client/ethicalads.min.js" />
        <div
          className="ea-container horizontal"
          data-ea-publisher="nextuiorg"
          data-ea-type="image"
        />
        <style global jsx>
          {`
            .ea-container {
              display: ${showEthicalAds ? "block" : "none"} !important;
              width: 100%;
              z-index: 100;
              padding: 1.2rem 1rem;
              min-height: 132px;
              border-radius: ${theme?.radii?.lg?.value};
              background-color: ${!isDark ? "#363449" : "#111"};
              box-shadow: 0px 5px 20px -5px rgb(0 0 0 / 20%);
              position: relative;
            }
            .ea-container .ea-type-image {
              width: 100%;
            }
            .ea-container .ea-pixel {
              display: none !important;
            }
            .ea-container .ea-type-image .ea-content {
              width: 100%;
              height: 100% !important;
              max-width: 100% !important;
              display: flex;
              margin: 0 !important;
              padding: 0 !important;
              background-color: transparent !important;
              box-shadow: none !important;
            }

            .ea-container .ea-type-image .ea-callout {
              display: flex !important;
              max-width: 100% !important;
              justify-content: flex-end !important;
              position: absolute;
              bottom: 0;
              right: 1rem;
            }

            .ea-container .ea-type-image .ea-callout a,
            .ea-container .ea-type-image .ea-callout a .ea-headline,
            .ea-container .ea-type-image .ea-callout a .ea-cta {
              color: ${!isDark
                ? "var(--nextui-colors-accents2)"
                : "var(--nextui-colors-accents4)"} !important;
            }

            [data-ea-publisher].loaded .ea-content a strong {
              color: ${!isDark
                ? "var(--nextui-colors-accents2)"
                : "var(--nextui-colors-accents6)"} !important;
            }

            .ea-container .ea-type-image .ea-content a {
              display: block;
              line-height: 1;
              max-width: 130px;
              width: 100%;
            }

            .ea-container .ea-type-image .ea-text {
              width: 100%;
              text-align: left !important;
              padding-top: ${theme?.space?.xs?.value};
              padding-left: ${theme?.space?.md?.value};
              padding-right: ${theme?.space?.md?.value};
            }

            .ea-container .ea-type-image .ea-text a {
              width: 100%;
              max-width: 100%;
              display: block;
              font-size: 1rem;
              width: 100%;
              color: ${!isDark ? "var(--nextui-colors-accents6)" : "var(--nextui-colors-accents5)"};
            }

            .ea-container .ea-type-image .ea-text .ea-body {
              color: ${!isDark ? "var(--nextui-colors-accents6)" : "var(--nextui-colors-accents7)"};
            }

            .ea-container .ea-type-image img {
              display: block;
              max-width: 100% !important;
              width: 100%;
              border-radius: ${theme?.radii?.md?.value};
              border: 0px;
              margin: 0px;
            }

            @media only screen and (max-width: ${theme?.breakpoints?.xs.value}) {
              .ea-container .ea-type-image .ea-text a {
                font-size: 0.9rem;
              }
            }
          `}
        </style>
      </>
      <div className="carbon-ad-container">
        <span ref={carbonRef} id="carbon-ad">
          <style global jsx>
            {`
              .carbon-ad-container {
                min-height: 132px;
                display: ${!showEthicalAds ? "block" : "none"} !important;
              }
              #carbonads * {
                margin: initial;
                padding: initial;
              }
              #carbonads {
                font-family: inherit;
                max-width: 100%;
                padding: ${theme?.space?.md?.value};
              }
              #carbonads {
                display: flex;
                width: 100%;
                z-index: 100;
                border-radius: ${theme?.radii?.lg?.value};
                background-color: ${!isDark ? "#363449" : "#111"};
                box-shadow: 0px 5px 20px -5px rgb(0 0 0 / 20%);
              }
              #carbonads a {
                color: inherit;
                text-decoration: none;
                transition: color 0.25s ease;
              }
              #carbonads a:hover {
                color: ${!isDark ? theme?.colors?.accents3?.value : theme?.colors?.accents7?.value};
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
                border-radius: ${theme?.radii?.md?.value};
                border: 0px;
                margin: 0px;
              }
              #carbonads .carbon-text {
                display: block;
                font-size: 1rem;
                width: 100%;
                color: ${!isDark ? theme?.colors?.accents2?.value : theme?.colors?.accents6?.value};
                padding-left: ${theme?.space?.md?.value};
                padding-right: ${theme?.space?.md?.value};
              }
              #carbonads .carbon-poweredby {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                position: absolute;
                bottom: 0;
                right: 0;
                padding: 10px 0;
                color: ${!isDark ? theme?.colors?.accents1?.value : theme?.colors?.accents4?.value};
                text-transform: uppercase;
                letter-space: .value 0.5px;
                font-weight: 600;
                font-size: 9px;
                line-height: 0;
                transition: all 0.25 ease;
              }
              @media only screen and (max-width: ${theme?.breakpoints?.xs.value}) {
                #carbonads .carbon-text {
                  font-size: 0.9rem;
                }
              }
            `}
          </style>
        </span>
      </div>
    </>
  );
};

export default CarbonAd;
