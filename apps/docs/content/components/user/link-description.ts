const App = `import {User, Link} from "@nextui-org/react";

export default function App() {
  return (
    <User   
      name="Junior Garcia"
      description={(
        <Link href="https://twitter.com/jrgarciadev" size="xs" isExternal>
          @jrgarciadev
        </Link>
      )}
      avatarProps={{
        src: "https://avatars.githubusercontent.com/u/30373425?v=4"
      }}
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
