import React from "react";
import {Button} from "@nextui-org/react";
import confetti from "canvas-confetti";

const CustomButton = () => {
  const handleConfetti = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const {currentTarget} = event;
    const {clientWidth, clientHeight} = document.documentElement;
    const {y: targetY, x: targetX, width: targetWidth} = currentTarget.getBoundingClientRect();
    const targetCenterX = targetX + targetWidth / 2;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 70,
      origin: {
        y: targetY / clientHeight,
        x: targetCenterX / clientWidth,
      },
    });
  };

  return (
    <Button
      auto
      rounded
      css={{
        background: "$white",
        fontWeight: "$semibold",
        boxShadow: "$lg",
        position: "relative",
        overflow: "visible",
        color: "#0F9549",
        fontSize: "$lg",
        px: "$18",
        py: "$11",
        "&:after": {
          content: '""',
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "$white",
          opacity: 1,
          borderRadius: "$pill",
          transition: "all 0.4s ease",
        },
        "&:hover": {
          transform: "translateY(-5px)",
          "&:after": {
            transform: "scaleX(1.5) scaleY(1.6)",
            opacity: 0,
          },
        },
        "&:active": {
          transform: "translateY(-2px)",
        },
      }}
      ripple={false}
      onClick={handleConfetti}
    >
      Click me
    </Button>
  );
};

export default CustomButton;
