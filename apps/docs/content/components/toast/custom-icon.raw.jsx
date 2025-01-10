import {addToast, Button} from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Button
        className="w-fit m-2"
        onPress={() =>
          addToast({
            title: "Toast title",
            description: "Toast displayed successfully",
            icon: (
              <svg height={24} viewBox="0 0 24 24" width={24}>
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit={10}
                  strokeWidth={1.5}
                >
                  <path
                    d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
                    data-name="Stroke 1"
                  />
                  <path d="M11.837 11.174a4.372 4.372 0 10-.031 0z" data-name="Stroke 3" />
                </g>
              </svg>
            ),
          })
        }
      >
        Show toast with custom icon
      </Button>
    </>
  );
}
