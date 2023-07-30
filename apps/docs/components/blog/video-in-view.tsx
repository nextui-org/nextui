/* eslint-disable jsx-a11y/media-has-caption */
"use client";

import {useInView} from "framer-motion";
import {useRef, FC, useEffect, useState, useCallback} from "react";
import {Button, cn, Spinner, Tooltip} from "@nextui-org/react";

import {RotateLeftLinearIcon} from "@/components/icons";

interface VideoInViewProps {
  src: string;
  autoPlay?: boolean;
  width?: number;
  height?: number;
  controls?: boolean;
  className?: string;
}

export const VideoInView: FC<VideoInViewProps> = ({
  src,
  width,
  height,
  autoPlay = true,
  controls = false,
  className,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);

  const isVisible = useInView(videoRef);

  // play video when it is visible
  useEffect(() => {
    if (isVisible) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isVisible]);

  const handleCanPlayThrough = useCallback(() => {
    setIsLoading(false);
  }, []);

  const onRestart = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, []);

  return (
    <div className="relative">
      {isLoading && (
        <Spinner
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          color="secondary"
          size="lg"
        />
      )}
      <Tooltip content="Restart" delay={1000}>
        <Button
          isIconOnly
          className="absolute z-50 right-3 top-3 border-1 border-transparent bg-transparent before:bg-white/10 before:content-[''] before:block before:z-[-1] before:absolute before:inset-0 before:backdrop-blur-md before:backdrop-saturate-100 before:rounded-lg"
          size="sm"
          variant="bordered"
          onPress={onRestart}
        >
          <RotateLeftLinearIcon size={16} />
        </Button>
      </Tooltip>
      <video
        ref={videoRef}
        loop
        muted
        autoPlay={autoPlay}
        className={cn(
          "w-full border border-transparent dark:border-default-200/50 object-fit rounded-xl shadow-lg",
          className,
        )}
        controls={controls}
        height={height}
        src={src}
        width={width}
        onCanPlayThrough={handleCanPlayThrough}
        onPlaying={() => setIsLoading(false)}
      />
    </div>
  );
};
