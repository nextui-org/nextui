/* eslint-disable react/display-name */

import {title, subtitle, titleWrapper, sectionWrapper} from "@/components/primitives";
import {FeaturesGrid} from "@/components/marketing/features-grid";
import landingContent from "@/content/landing";

export const LastButNotLeast = () => {
  return (
    <section className={sectionWrapper({class: "mt-16 lg:mt-44"})}>
      <div className="flex flex-col gap-0 md:gap-8">
        <div>
          <div className={titleWrapper({class: "items-center"})}>
            <div>
              <h1 className={title({size: "lg"})}>Last&nbsp;</h1>
              <h1 className={title({color: "yellow", size: "lg"})}>but</h1>
            </div>
            <div>
              <h1 className={title({size: "lg"})}>not&nbsp;</h1>
              <h1 className={title({size: "lg", color: "pink"})}>least.</h1>
            </div>
          </div>
          <p
            className={subtitle({
              class: "mt-4 md:w-full text-center flex justify-center items-center",
            })}
          >
            A fully-featured React UI library.
          </p>
        </div>
        <FeaturesGrid features={landingContent.fullFeatures} />
      </div>
    </section>
  );
};
