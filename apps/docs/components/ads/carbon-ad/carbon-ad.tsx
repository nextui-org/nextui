import React, {useCallback, useEffect} from "react";
import Script from "next/script";

import carbonOptimize from "./carbon-optimize";

import {loadScript} from "@/utils/scripts";
import {useIsMounted} from "@/hooks/use-is-mounted";
import {__PROD__} from "@/utils";

const EA_PROVIDER_RATIO = 0.85;

export const CarbonAd: React.FC<unknown> = () => {
  const carbonRef = React.useRef(null);
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
    const shouldShowEthicalAds = Math.random() < EA_PROVIDER_RATIO;

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
  }, [isMounted]);

  if (!__PROD__) return null;

  return (
    <>
      <>
        <Script async src="https://media.ethicalads.io/media/client/ethicalads.min.js" />
        <div
          className="ea-container horizontal"
          data-ea-campaign-types="paid|publisher-house|community"
          data-ea-publisher="nextuiorg"
          data-ea-type="image"
          style={{display: showEthicalAds ? "block" : "none"}}
        />
      </>
      <div className="carbon-ad-container" style={{display: showEthicalAds ? "none" : "block"}}>
        <span ref={carbonRef} id="carbon-ad" />
      </div>
    </>
  );
};
