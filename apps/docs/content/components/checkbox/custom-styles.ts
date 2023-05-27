const App = `import { Checkbox, Link, User, Chip, cn } from "@nextui-org/react";

export default function App() {
  const [isSelected, setIsSelected] = React.useState(false);

  const user = {
    name: "Junior Garcia",
    avatar: "https://avatars.githubusercontent.com/u/30373425?v=4",
    username: "jrgarciadev",
    url: "https://twitter.com/jrgarciadev",
    role: "Software Developer",
    status: "Active",
  }

  return (
    <Checkbox       
      aria-label={user.name}
      classNames={{
        base: cn(
          "inline-flex w-full max-w-md bg-content1",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[checked=true]:border-primary",
        ),
        label: "w-full",
      }}
      isSelected={isSelected}
      onValueChange={setIsSelected}
    >
      <div className="w-full flex justify-between gap-2">
        <User
          avatarProps={{size: "sm", src: user.avatar}}
          description={
            <Link isExternal href={user.url} size="xs">
              @{user.username}
            </Link>
          }
          name={user.name}
        />
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs text-default-500">{user.role}</span>
          <Chip color="secondary" size="xs" variant="flat">
            {user.status}
          </Chip>
        </div>
      </div>
    </Checkbox>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
