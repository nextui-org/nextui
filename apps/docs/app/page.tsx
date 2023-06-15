import {Spacer} from "@nextui-org/react";

import {Hero} from "@/components/marketing/hero";
import {FeaturesGrid} from "@/components/marketing/features-grid";
import {CustomThemes} from "@/components/marketing/custom-themes";
import {A11yOtb} from "@/components/marketing/a11y-otb";
import {DarkMode} from "@/components/marketing/dark-mode";
import {Customization} from "@/components/marketing/customization";
import {LastButNotLeast} from "@/components/marketing/last-but-not-least";
import {InstallBanner} from "@/components/marketing/install-banner";
import {Community} from "@/components/marketing/community";
import {Support} from "@/components/marketing/support";
import landingContent from "@/content/landing";
import {getAllSponsors} from "@/utils/get-all-sponsors";

async function getData() {
  try {
    const sponsors = await getAllSponsors();

    return {
      sponsors,
    };
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default async function Home() {
  const data = await getData();

  return (
    <section className="flex flex-col items-center justify-center">
      <Hero />
      <FeaturesGrid features={landingContent.topFeatures} />
      <CustomThemes />
      <A11yOtb />
      <DarkMode />
      <Customization />
      <LastButNotLeast />
      <Support sponsors={data.sponsors} />
      <Spacer y={24} />
      <InstallBanner />
      <Community />
      <Spacer y={24} />
    </section>
  );
}
