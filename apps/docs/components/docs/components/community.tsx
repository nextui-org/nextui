import {FeaturesGrid} from "@/components/marketing/features-grid";
import {communityAccounts} from "@/libs/constants";

export const Community = () => {
  return (
    <div className="max-w-4xl flex flex-col gap-8">
      <FeaturesGrid
        classNames={{
          base: "lg:grid-cols-3",
          iconWrapper: "bg-transparent",
          header: "pt-2",
          body: "pt-0 pb-2",
          description: "hidden",
        }}
        features={communityAccounts}
      />
    </div>
  );
};
