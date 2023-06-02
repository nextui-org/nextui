const CustomCheckbox = `import {Checkbox, Link, User, Chip, cn} from "@nextui-org/react";

export const CustomCheckbox = ({ user, statusColor, value }) => {
  return (
    <Checkbox
      aria-label={user.name}
      classNames={{
        base: cn(
          "inline-flex max-w-md w-full bg-content1",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
        label: "w-full",
      }}
      value={value}
    >
      <div className="w-full flex justify-between gap-2">
        <User
          avatarProps={{ size: "sm", src: user.avatar }}
          description={
            <Link isExternal href={user.url} size="xs">
              @{user.username}
            </Link>
          }
          name={user.name}
        />
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs text-default-500">{user.role}</span>
          <Chip color={statusColor} size="xs" variant="flat">
            {user.status}
          </Chip>
        </div>
      </div>
    </Checkbox>
  );
};`;

const App = `import {CheckboxGroup} from "@nextui-org/react";
import {CustomCheckbox} from "./CustomCheckbox";

export default function App() {
  const [groupSelected, setGroupSelected] = React.useState([]);

  return (
    <div className="flex flex-col gap-1 w-full">
      <CheckboxGroup
        label="Select employees"
        value={groupSelected}
        onChange={setGroupSelected}
        classNames={{
          base: "w-full"
        }}
      >
        <CustomCheckbox
          value="junior"
          user={{
            name: "Junior Garcia",
            avatar: "https://avatars.githubusercontent.com/u/30373425?v=4",
            username: "jrgarciadev",
            url: "https://twitter.com/jrgarciadev",
            role: "Software Developer",
            status: "Active",
          }}
          statusColor="secondary"
        />
        <CustomCheckbox
          value="johndoe"
          user={{
            name: "John Doe",
            avatar: "https://i.pravatar.cc/300?u=a042581f4e29026707d",
            username: "johndoe",
            url: "#",
            role: "Product Designer",
            status: "Vacation",
          }}
          statusColor="warning"
        />
        <CustomCheckbox
          value="zoeylang"
          user={{
            name: "Zoey Lang",
            avatar: "https://i.pravatar.cc/300?u=a042581f4e29026704d",
            username: "zoeylang",
            url: "#",
            role: "Technical Writer",
            status: "Out of office",
          }}
          statusColor="danger"
        />
        <CustomCheckbox
          value="william"
          user={{
            name: "William Howard",
            avatar: "https://i.pravatar.cc/300?u=a048581f4e29026701d",
            username: "william",
            url: "#",
            role: "Sales Manager",
            status: "Active",
          }}
          statusColor="secondary"
        />
      </CheckboxGroup>
      <p className="mt-4 ml-1 text-default-500">
        Selected: {groupSelected.join(", ")}
      </p>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
  "/CustomCheckbox.jsx": CustomCheckbox,
};

export default {
  ...react,
};
