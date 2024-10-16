import { Spacer } from "@nextui-org/react";
import { sectionWrapper, titleWrapper, title, subtitle } from "../primitives";
import { FeaturesGrid } from "@/components/marketing/features-grid";
import { communityAccounts } from "@/libs/constants";

export const Community = () => {
  return (
    <section
      className={sectionWrapper({
        class: "flex flex-col items-center mt-16 lg:mt-44 px-4 md:px-0",
      })}
    >
      <div className="max-w-4xl flex flex-col gap-10">
        {/* Title Section */}
        <div className={titleWrapper({ class: "items-center text-center" })}>
          <div className="inline-flex items-center">
            <h1 className={title({ size: "lg" })}>Join Our Community</h1>
          </div>
        </div>

        {/* Subtitle Section */}
        <p
          className={subtitle({
            class:
              "md:w-full text-center flex justify-center items-center text-lg lg:text-xl",
          })}
        >
          Get involved in our community. Everyone is welcome!
        </p>

        {/* Features Section */}
        <Spacer y={10} />
        <FeaturesGrid
          classNames={{
            base: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",
            iconWrapper: "bg-transparent",
            body: "pt-4",
          }}
          features={communityAccounts}
        />
      </div>
    </section>
  );
};

