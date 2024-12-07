import {Checkbox, CheckboxGroup, Link, User, Chip, cn} from "@nextui-org/react";

export const CustomCheckbox = ({user, statusColor, value}) => {
  return (
    <Checkbox
      aria-label={user.name}
      classNames={{
        base: cn(
          "inline-flex max-w-md w-full bg-content1 m-0",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary",
        ),
        label: "w-full",
      }}
      value={value}
    >
      <div className="w-full flex justify-between gap-2">
        <User
          avatarProps={{size: "md", src: user.avatar}}
          description={
            <Link isExternal href={user.url} size="sm">
              @{user.username}
            </Link>
          }
          name={user.name}
        />
        <div className="flex flex-col items-end gap-1">
          <span className="text-tiny text-default-500">{user.role}</span>
          <Chip color={statusColor} size="sm" variant="flat">
            {user.status}
          </Chip>
        </div>
      </div>
    </Checkbox>
  );
};

export default function App() {
  const [groupSelected, setGroupSelected] = React.useState([]);

  return (
    <div className="flex flex-col gap-1 w-full">
      <CheckboxGroup
        classNames={{
          base: "w-full",
        }}
        label="Select employees"
        value={groupSelected}
        onChange={setGroupSelected}
      >
        <CustomCheckbox
          statusColor="secondary"
          user={{
            name: "Junior Garcia",
            avatar: "https://avatars.githubusercontent.com/u/30373425?v=4",
            username: "jrgarciadev",
            url: "https://x.com/jrgarciadev",
            role: "Software Developer",
            status: "Active",
          }}
          value="junior"
        />
        <CustomCheckbox
          statusColor="warning"
          user={{
            name: "John Doe",
            avatar: "https://i.pravatar.cc/300?u=a042581f4e29026707d",
            username: "johndoe",
            url: "#",
            role: "Product Designer",
            status: "Vacation",
          }}
          value="johndoe"
        />
        <CustomCheckbox
          statusColor="danger"
          user={{
            name: "Zoey Lang",
            avatar: "https://i.pravatar.cc/300?u=a042581f4e29026704d",
            username: "zoeylang",
            url: "#",
            role: "Technical Writer",
            status: "Out of office",
          }}
          value="zoeylang"
        />
        <CustomCheckbox
          statusColor="secondary"
          user={{
            name: "William Howard",
            avatar: "https://i.pravatar.cc/300?u=a048581f4e29026701d",
            username: "william",
            url: "#",
            role: "Sales Manager",
            status: "Active",
          }}
          value="william"
        />
      </CheckboxGroup>
      <p className="mt-4 ml-1 text-default-500">Selected: {groupSelected.join(", ")}</p>
    </div>
  );
}
