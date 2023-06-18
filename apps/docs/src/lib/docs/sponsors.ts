import {uniqBy} from "lodash";

export type SponsorType = "USER" | "ORGANIZATION" | "COLLECTIVE";

export type SponsorRole = "ADMIN" | "BACKER" | "CONTRIBUTOR" | "HOST" | "MEMBER" | "FUNDRAISER";

export const SPONSOR_TIERS = {
  BACKER: "Backer 🖤",
  BRONZE: "Bronze Sponsor 🥉",
  SILVER: "Silver Sponsor 🥈",
  GOLD: "Gold Sponsor 🥇",
  PLATINUM: "Platinum Sponsor ⭐️",
  HERO: "Hero Sponsor 🎖",
};

export const SPONSOR_TIER_BY_AMOUNT = {
  [SPONSOR_TIERS.HERO]: 1000,
  [SPONSOR_TIERS.PLATINUM]: 500,
  [SPONSOR_TIERS.GOLD]: 100,
  [SPONSOR_TIERS.SILVER]: 30,
  [SPONSOR_TIERS.BRONZE]: 10,
  [SPONSOR_TIERS.BACKER]: 1,
};

export const SPONSOR_COLORS = {
  [SPONSOR_TIERS.BACKER]: "default",
  [SPONSOR_TIERS.BRONZE]: "default",
  [SPONSOR_TIERS.SILVER]: "primary",
  [SPONSOR_TIERS.GOLD]: "warning",
  [SPONSOR_TIERS.PLATINUM]: "secondary",
  [SPONSOR_TIERS.HERO]: "gradient",
};

export type SponsorTiers =
  | "Backer 🖤"
  | "Bronze Sponsor 🥉"
  | "Silver Sponsor 🥈"
  | "Gold Sponsor 🥇"
  | "Platinum Sponsor ⭐️"
  | "Hero Sponsor 🎖";

export type Sponsor = {
  MemberId: number;
  type: SponsorType;
  role: SponsorRole;
  isActive: boolean;
  totalAmountDonated: number;
  currency: string;
  lastTransactionAt: string;
  lastTransactionAmount: number;
  profile: string;
  name: string;
  tier: SponsorTiers;
  company: string;
  description: string;
  image: string;
  email: string;
  twitter: string;
  github: string;
  website: string;
  createdAt: string;
};

export const getSponsors = async () => {
  try {
    const res = await fetch("https://opencollective.com/nextui/members/all.json");
    const data = await res.json();

    // filter out repeated sponsors
    const sponsors = uniqBy<Sponsor>(data, "profile").filter(
      (sponsor) => sponsor.role !== "ADMIN" && sponsor.role !== "HOST",
    );

    return sponsors;
  } catch (error) {
    return [];
  }
};

export const getTier = (amount: number) => {
  return (
    Object.keys(SPONSOR_TIER_BY_AMOUNT).find((tier) => amount >= SPONSOR_TIER_BY_AMOUNT[tier]) ??
    SPONSOR_TIERS.BACKER
  );
};
