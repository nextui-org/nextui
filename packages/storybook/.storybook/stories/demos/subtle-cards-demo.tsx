import {Avatar, Card} from "@heroui/react";
import React from "react";
import {tv} from "tailwind-variants";

const cardStyles = tv({
  slots: {
    avatar: "size-[56px] rounded-xl",
    card: "min-w-0 flex-1 basis-[140px]",
    cardContent: "items-start",
    footer: "items-center gap-2",
    footerAvatar: "size-4",
  },
});

export function SubtleCardsDemo() {
  const {avatar, card, cardContent, footer, footerAvatar} = cardStyles();

  return (
    <div className="flex w-full flex-row flex-wrap gap-4">
      <Card className={card()}>
        <Card.Header>
          <Avatar className={avatar()}>
            <Avatar.Image
              alt="Demo 1"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg"
            />
            <Avatar.Fallback>JK</Avatar.Fallback>
          </Avatar>
        </Card.Header>
        <Card.Content className={cardContent()}>
          <p className="text-sm font-medium">Indie Hackers</p>
          <p className="text-sm text-muted">148 members</p>
        </Card.Content>
        <Card.Footer className={footer()}>
          <Avatar className={footerAvatar()}>
            <Avatar.Image
              alt="John"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg"
            />
            <Avatar.Fallback>JK</Avatar.Fallback>
          </Avatar>
          <p className="text-xs text-muted">By John</p>
        </Card.Footer>
      </Card>
      <Card className={card()}>
        <Card.Header>
          <Avatar className={avatar()}>
            <Avatar.Image
              alt="AI Builders"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg"
            />
            <Avatar.Fallback>J</Avatar.Fallback>
          </Avatar>
        </Card.Header>
        <Card.Content className={cardContent()}>
          <p className="text-sm font-medium">AI Builders</p>
          <p className="text-sm text-muted">362 members</p>
        </Card.Content>
        <Card.Footer className={footer()}>
          <Avatar className={footerAvatar()}>
            <Avatar.Image
              alt="Martha"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
            />
            <Avatar.Fallback>M</Avatar.Fallback>
          </Avatar>
          <p className="text-xs text-muted">By Martha</p>
        </Card.Footer>
      </Card>
    </div>
  );
}
