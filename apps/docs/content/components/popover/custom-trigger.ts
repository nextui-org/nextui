const UserTwitterCard = `import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

export const UserTwitterCard = () => {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <Card className="max-w-[300px] border-none bg-transparent">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar isBordered radius="full" size="md" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-sm font-semibold leading-none text-default-600">Zoey Lang</h4>
            <h5 className="text-sm tracking-tight text-default-400">@zoeylang</h5>
          </div>
        </div>
        <Button
          className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0">
        <p className="text-sm pl-px text-default-400">
          Full-stack developer, @getnextui lover she/her
          <span aria-label="confetti" role="img">
            🎉
          </span>
        </p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-sm">4</p>
          <p className=" text-default-400 text-sm">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-sm">97.1K</p>
          <p className="text-default-400 text-sm">Followers</p>
        </div>
      </CardFooter>
    </Card>
  );
};`;

const App = `import {Popover, PopoverTrigger, PopoverContent, Button, User} from "@nextui-org/react";
import {UserTwitterCard} from "./UserTwitterCard";

export default function App() {
  return (
    <Popover showArrow placement="right">
      <PopoverTrigger>
        <User   
          as="button"
          name="Zoe Lang"
          description="Product Designer"
          className="transition-transform"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
          }}
        />
      </PopoverTrigger>
      <PopoverContent className="p-1">
        <UserTwitterCard/>
      </PopoverContent>
    </Popover>
  );
}`;

const react = {
  "/App.jsx": App,
  "/UserTwitterCard.jsx": UserTwitterCard,
};

export default {
  ...react,
};
