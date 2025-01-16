import {Button} from "@heroui/react";

export const HeroUIProButton = () => (
  <Button
    as={"a"}
    className="px-6 flex items-center"
    color="primary"
    href="https://heroui.pro?utm_source=heroui.com&utm_medium=heroui-homepage-section"
    rel="noopener noreferrer"
    target="_blank"
  >
    Explore HeroUI Pro
    <svg fill="none" height="21" viewBox="0 0 20 21" width="20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.0254 5.44189L17.0837 10.5002L12.0254 15.5586"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M2.91602 10.5H16.941"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
    </svg>
  </Button>
);
