"use client";

import {Button, CloseButton, buttonVariants} from "@heroui/react";
import {Calligraph} from "calligraph";
import {AnimatePresence, motion} from "motion/react";
import {useCallback, useEffect, useState, useSyncExternalStore} from "react";

import {env} from "~env";

import {useDictionary} from "@/hooks/use-dictionary";

import {FloatingStars} from "./floating-stars";
import {PRO_URL, SHOW_BANNER} from "./pro-constants";
import {ProTitle} from "./pro-title";

interface DiscountData {
  label: string;
  percent: number;
  endsAt: string;
}

const PRO_API_URL = env.NEXT_PUBLIC_PRO_API_URL;

const DISCOUNT_CAMPAIGN = "launch_discount";
const DEFAULT_CAMPAIGN = "pro_default";

const getProHref = (medium: string, campaign: string) =>
  `${PRO_URL}?utm_source=heroui.com&utm_medium=${medium}&utm_campaign=${campaign}`;

const withPercent = (template: string, percent: number | undefined) =>
  template.replace("{percent}", String(percent ?? 0));

function useProDiscount() {
  const [discount, setDiscount] = useState<DiscountData | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (!PRO_API_URL) return;

    fetch(`${PRO_API_URL}/api/prices`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data?.discount) {
          setDiscount(data.discount);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return discount;
}

interface TimeRemaining {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface CountdownState {
  endsAt: string;
  time: TimeRemaining | null;
}

function getTimeRemaining(targetDate: Date): TimeRemaining | null {
  const diff = Math.max(0, targetDate.getTime() - Date.now());

  if (diff <= 0) return null;

  const totalSeconds = Math.floor(diff / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");

  return {
    days: pad(Math.floor(totalSeconds / 86400)),
    hours: pad(Math.floor((totalSeconds % 86400) / 3600)),
    minutes: pad(Math.floor((totalSeconds % 3600) / 60)),
    seconds: pad(totalSeconds % 60),
  };
}

function useCountdown(endsAt: string | null) {
  const [countdown, setCountdown] = useState<CountdownState | null>(null);

  useEffect(() => {
    if (!endsAt) return;

    const endDate = new Date(endsAt);

    if (Number.isNaN(endDate.getTime())) return;

    const update = () => setCountdown({endsAt, time: getTimeRemaining(endDate)});

    const frame = requestAnimationFrame(update);
    const id = setInterval(update, 1000);

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(id);
    };
  }, [endsAt]);

  if (!endsAt || countdown?.endsAt !== endsAt) return null;

  return countdown.time;
}

export function HeaderBanner() {
  const dict = useDictionary().proBanner;
  const discount = useProDiscount();
  const time = useCountdown(discount?.endsAt ?? null);

  if (!SHOW_BANNER) return null;

  const hasLiveDiscount = Boolean(discount && time);
  const campaign = hasLiveDiscount ? DISCOUNT_CAMPAIGN : DEFAULT_CAMPAIGN;

  return (
    <a
      className="flex h-8 w-full items-center justify-center gap-1.5 bg-surface-secondary transition-colors hover:bg-surface-secondary/80"
      href={getProHref("banner", campaign)}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-xs leading-tight font-medium text-accent-foreground">
        Pro
      </span>
      {hasLiveDiscount ? (
        <>
          <span className="hidden text-xs font-medium text-foreground sm:inline">
            {dict.discount.headerTitle}
          </span>
          <span className="text-xs font-medium text-foreground tabular-nums">
            <span className="hidden sm:inline">
              {withPercent(dict.discount.headerCountdown, discount?.percent)}
            </span>
            <span className="sm:hidden">
              {withPercent(dict.discount.headerCountdownCompact, discount?.percent)}
            </span>
          </span>
          <span className="shrink-0 rounded-[5px] border border-accent-soft-hover bg-linear-to-r from-accent/10 to-accent/7 px-1.5 py-0.5 text-xs leading-tight font-medium text-foreground tabular-nums">
            <Calligraph animation="snappy" variant="number">
              {time?.days}
            </Calligraph>
            {dict.units.days} :{" "}
            <Calligraph animation="snappy" variant="number">
              {time?.hours}
            </Calligraph>
            {dict.units.hours} :{" "}
            <Calligraph animation="snappy" variant="number">
              {time?.minutes}
            </Calligraph>
            {dict.units.minutes} :{" "}
            <Calligraph animation="snappy" variant="number">
              {time?.seconds}
            </Calligraph>
            {dict.units.seconds}
          </span>
        </>
      ) : (
        <span className="text-xs font-medium text-foreground">
          <span className="hidden sm:inline">{dict.default.headerTitle} - </span>
          {dict.default.headerDetail}
        </span>
      )}
    </a>
  );
}

const PRO_BANNER_DISMISSED_KEY = "heroui-pro-banner-dismissed-session";
const MOBILE_AGENT_QUERY = "(max-width: 639px)";
const OPEN_AGENT_SELECTOR = '[data-heroui-agent][data-open="true"]';

const subscribeToDismissed = (callback: () => void) => {
  window.addEventListener("storage", callback);

  return () => window.removeEventListener("storage", callback);
};
const getDismissedSnapshot = () => sessionStorage.getItem(PRO_BANNER_DISMISSED_KEY) === "true";
const getDismissedServerSnapshot = () => true;

export function ProBanner() {
  const dict = useDictionary().proBanner;
  const wasPreviouslyDismissed = useSyncExternalStore(
    subscribeToDismissed,
    getDismissedSnapshot,
    getDismissedServerSnapshot,
  );
  const [dismissed, setDismissed] = useState(false);
  const discount = useProDiscount();
  const time = useCountdown(discount?.endsAt ?? null);

  const visible = SHOW_BANNER && !wasPreviouslyDismissed && !dismissed;
  const hasLiveDiscount = Boolean(discount && time);
  const campaign = hasLiveDiscount ? DISCOUNT_CAMPAIGN : DEFAULT_CAMPAIGN;
  const copy = hasLiveDiscount ? dict.discount : dict.default;

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    sessionStorage.setItem(PRO_BANNER_DISMISSED_KEY, "true");
  }, []);

  useEffect(() => {
    if (!visible) return;

    const mobileQuery = window.matchMedia(MOBILE_AGENT_QUERY);
    const dismissWhenAgentOverlaps = () => {
      if (mobileQuery.matches && document.querySelector(OPEN_AGENT_SELECTOR)) handleDismiss();
    };
    const observer = new MutationObserver(dismissWhenAgentOverlaps);

    observer.observe(document.documentElement, {
      attributeFilter: ["data-open"],
      attributes: true,
      childList: true,
      subtree: true,
    });
    mobileQuery.addEventListener("change", dismissWhenAgentOverlaps);
    dismissWhenAgentOverlaps();

    return () => {
      observer.disconnect();
      mobileQuery.removeEventListener("change", dismissWhenAgentOverlaps);
    };
  }, [handleDismiss, visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          animate={{opacity: 1, scale: 1, y: 0}}
          className="fixed start-6 bottom-6 z-50 w-[288px] overflow-hidden rounded-[20px] border border-separator bg-surface shadow-xl"
          exit={{opacity: 0, scale: 0.95, transition: {duration: 0.2, ease: "easeIn"}, y: 20}}
          initial={{opacity: 0, scale: 0.95, y: 20}}
          transition={{damping: 25, delay: 0.5, stiffness: 300, type: "spring"}}
        >
          {/* Top gradient section */}
          <div className="relative flex h-[180px] flex-col items-center justify-center gap-2 overflow-hidden px-6 py-6">
            <svg
              className="absolute inset-0 size-full -scale-y-100"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 406 328"
            >
              <g clipPath="url(#clip0_pro_banner)">
                <g filter="url(#filter0_i_pro_banner)">
                  <rect
                    fill="url(#paint0_linear_pro_banner)"
                    height="365"
                    width="406"
                    x="0"
                    y="0"
                  />
                </g>
                <g filter="url(#filter1_f_pro_banner)">
                  <path
                    d="M301.812 168C361.459 168 409.812 216.353 409.812 276C409.812 335.647 361.459 384 301.812 384C242.166 384 193.813 335.647 193.812 276C193.812 216.353 242.166 168 301.812 168Z"
                    fill="url(#paint1_linear_pro_banner)"
                  />
                </g>
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="365"
                  id="filter0_i_pro_banner"
                  width="406"
                  x="0"
                  y="0"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    mode="normal"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feMorphology
                    in="SourceAlpha"
                    operator="erode"
                    radius="12.8125"
                    result="effect1_innerShadow_pro_banner"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="80.0781" />
                  <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.728741 0 0 0 0 0.968353 0 0 0 0 1 0 0 0 0.8 0"
                  />
                  <feBlend in2="shape" mode="normal" result="effect1_innerShadow_pro_banner" />
                </filter>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="344.125"
                  id="filter1_f_pro_banner"
                  width="344.125"
                  x="129.75"
                  y="103.938"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    mode="normal"
                    result="shape"
                  />
                  <feGaussianBlur
                    result="effect1_foregroundBlur_pro_banner"
                    stdDeviation="32.0312"
                  />
                </filter>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id="paint0_linear_pro_banner"
                  x1="203"
                  x2="203"
                  y1="0"
                  y2="365"
                >
                  <stop stopColor="#E9E9FF" />
                  <stop offset="1" stopColor="#CCE5F1" />
                </linearGradient>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id="paint1_linear_pro_banner"
                  x1="235.242"
                  x2="397.641"
                  y1="219.359"
                  y2="417.953"
                >
                  <stop stopColor="#5DD0E7" />
                  <stop offset="1" stopColor="#7300FF" />
                </linearGradient>
                <clipPath id="clip0_pro_banner">
                  <rect fill="white" height="328" width="406" />
                </clipPath>
              </defs>
            </svg>
            {/* Floating white particles */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-50">
                <FloatingStars />
              </div>
            </div>
            <div className="relative flex items-center gap-2">
              <ProTitle />
            </div>
            {hasLiveDiscount ? (
              <span className="relative text-xs text-[#4E75A5] tabular-nums">
                {dict.discount.cardCountdown}{" "}
                <Calligraph animation="snappy" variant="number">
                  {time?.days}
                </Calligraph>
                {dict.units.days}{" "}
                <Calligraph animation="snappy" variant="number">
                  {time?.hours}
                </Calligraph>
                {dict.units.hours}{" "}
                <Calligraph animation="snappy" variant="number">
                  {time?.minutes}
                </Calligraph>
                {dict.units.minutes}{" "}
                <Calligraph animation="snappy" variant="number">
                  {time?.seconds}
                </Calligraph>
                {dict.units.seconds}
              </span>
            ) : (
              <span className="relative text-xs font-medium text-[#4E75A5]">
                {dict.default.heroLabel}
              </span>
            )}
          </div>

          <CloseButton
            className="absolute end-2 top-2 bg-transparent text-white/50 hover:bg-white/10 hover:text-white"
            onPress={handleDismiss}
          />

          {/* Content section */}
          <div className="flex flex-col gap-3 p-4">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-semibold text-foreground">{copy.cardTitle}</h3>
              <p className="text-sm leading-relaxed text-muted">{copy.cardDescription}</p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Button size="md" variant="outline" onPress={handleDismiss}>
                {dict.close}
              </Button>
              <a
                href={getProHref("pro_banner", campaign)}
                rel="noopener noreferrer"
                target="_blank"
                className={buttonVariants({
                  className: "bg-black text-white dark:bg-white dark:text-black",
                  fullWidth: true,
                  size: "md",
                  variant: "primary",
                })}
              >
                {copy.cta}
              </a>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
