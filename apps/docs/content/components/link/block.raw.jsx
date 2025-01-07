import {Link} from "@heroui/react";

export default function App() {
  return (
    <div className="flex gap-2">
      <Link isBlock showAnchorIcon color="foreground" href="#">
        Foreground
      </Link>
      <Link isBlock showAnchorIcon color="primary" href="#">
        Primary
      </Link>
      <Link isBlock showAnchorIcon color="secondary" href="#">
        Secondary
      </Link>
      <Link isBlock showAnchorIcon color="success" href="#">
        Success
      </Link>
      <Link isBlock showAnchorIcon color="warning" href="#">
        Warning
      </Link>
      <Link isBlock showAnchorIcon color="danger" href="#">
        Danger
      </Link>
    </div>
  );
}
