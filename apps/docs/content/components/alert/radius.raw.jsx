import {Alert} from "@heroui/react";

export default function App() {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col w-full">
        {["none", "sm", "md", "lg", "full"].map((radius) => (
          <div key={radius} className="w-full flex items-center my-3">
            <Alert radius={radius} title={`This is a ${radius} radius alert`} />
          </div>
        ))}
      </div>
    </div>
  );
}
