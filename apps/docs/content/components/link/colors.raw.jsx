import {Link} from "@heroui/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Link color="foreground" href="#">
        Foreground
      </Link>
      <Link color="primary" href="#">
        Primary
      </Link>
      <Link color="secondary" href="#">
        Secondary
      </Link>
      <Link color="success" href="#">
        Success
      </Link>
      <Link color="warning" href="#">
        Warning
      </Link>
      <Link color="danger" href="#">
        Danger
      </Link>
    </div>
  );
}
