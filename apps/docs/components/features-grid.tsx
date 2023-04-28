import React, {ReactNode} from "react";
import {Card, CardHeader, CardBody, LinkProps} from "@nextui-org/react";
import {useRouter} from "next/router";
import {LinkIcon} from "@nextui-org/shared-icons";

export interface Feature extends LinkProps {
  title: string;
  description: string;
  icon: ReactNode;
}

interface FeaturesGridProps {
  features: Feature[];
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({features, ...props}) => {
  const router = useRouter();
  const handleClick = (feat: Feature) => {
    if (!feat.href) {
      return;
    }

    if (feat.isExternal) {
      window.open(feat.href, "_blank");

      return;
    }
    router.push(feat.href);
  };

  return (
    <div className="flex gap-2" {...props}>
      {features.map((feat: Feature, index: number) => (
        <div key={`${feat.title}_${index}`}>
          <Card
            isBlurred
            className="border-none before:bg-white/5 before:backdrop-blur-lg before:backdrop-saturate-[1.8]"
            isPressable={!!feat.href}
            onPress={() => handleClick(feat)}
          >
            <CardHeader>
              <div>{feat.icon}</div>
              <p>{feat.title}</p>
              {feat.isExternal && <LinkIcon className="text-white" height={18} width={18} />}
            </CardHeader>
            <CardBody>
              <p>{feat.description}</p>
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  );
};
