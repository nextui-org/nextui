import {DefaultLayout} from "@/layouts";
import {Hero, FeaturesGrid, CustomThemes, A11yOtb} from "@/components";
import landingContent from "@/content/landing";

const IndexPage = () => {
  return (
    <DefaultLayout>
      <Hero />
      <FeaturesGrid features={landingContent.topFeatures} />
      <CustomThemes />
      <A11yOtb />
    </DefaultLayout>
  );
};

export default IndexPage;
