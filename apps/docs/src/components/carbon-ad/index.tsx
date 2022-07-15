import React, {useEffect} from "react";
import {loadScript} from "@utils/scripts";
import {useTheme} from "@nextui-org/react";
import {isProd} from "@utils/index";
import useIsMounted from "@hooks/use-is-mounted";

import carbonOptimize from "./carbon-optimize";

const CarbonAd: React.FC<unknown> = () => {
  const ref = React.useRef(null);
  const {theme, isDark} = useTheme();
  const isMounted = useIsMounted();

  useEffect(() => {
    // The isolation logic of carbonads is flawed.
    // Once the script starts loading, it will asynchronous resolve, with no way to stop it.
    // This leads to duplication of the ad. To solve the issue, we debounce the load action.
    const load =
      isMounted &&
      setTimeout(() => {
        const script = loadScript(
          "https://cdn.carbonads.com/carbon.js?serve=CESIC53Y&placement=nextuiorg",
          ref.current,
        );

        script.id = "_carbonads_js";
        carbonOptimize.init();
      });

    return () => {
      load && clearTimeout(load);
    };
  }, [isMounted]);

  if (!isProd) return null;

  return (
    <div className="carbon-ad-container">
      <span ref={ref} id="carbon-ad">
        <style global jsx>
          {`
            .carbon-ad-container {
              min-height: 132px;
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
  );
};

export default CarbonAd;
