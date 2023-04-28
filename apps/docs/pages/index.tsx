import {DefaultLayout} from "@/layouts";
import {Hero, FeaturesGrid} from "@/components";
import landingContent from "@/content/landing";

const IndexPage = () => {
  return (
    <DefaultLayout>
      <Hero />
      <FeaturesGrid features={landingContent.topFeatures} />
    </DefaultLayout>
  );
};

export default IndexPage;
