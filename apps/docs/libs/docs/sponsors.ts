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

export const mockData: Sponsor[] = [
  {
    MemberId: 101,
    type: "USER",
    role: "BACKER",
    isActive: true,
    totalAmountDonated: 5000,
    currency: "USD",
    lastTransactionAt: "2023-04-29",
    lastTransactionAmount: 500,
    profile: "/profile/101",
    name: "John Doe",
    tier: "Gold Sponsor 🥇",
    company: "",
    description: "A passionate open-source contributor.",
    image: "https://i.pravatar.cc/250?img=1",
    email: "john.doe@example.com",
    twitter: "johndoe",
    github: "johndoe",
    website: "https://johndoe.com",
    createdAt: "2021-03-15",
  },
  {
    MemberId: 102,
    type: "ORGANIZATION",
    role: "BACKER",
    isActive: true,
    totalAmountDonated: 3000,
    currency: "USD",
    lastTransactionAt: "2023-04-27",
    lastTransactionAmount: 300,
    profile: "/profile/102",
    name: "Example Corp",
    tier: "Silver Sponsor 🥈",
    company: "Example Corp",
    description: "We support open-source projects.",
    image: "https://i.pravatar.cc/250?img=2",
    email: "info@examplecorp.com",
    twitter: "examplecorp",
    github: "examplecorp",
    website: "https://examplecorp.com",
    createdAt: "2020-06-01",
  },
  {
    MemberId: 103,
    type: "USER",
    role: "CONTRIBUTOR",
    isActive: false,
    totalAmountDonated: 1500,
    currency: "EUR",
    lastTransactionAt: "2022-10-12",
    lastTransactionAmount: 100,
    profile: "/profile/103",
    name: "Alice Smith",
    tier: "Bronze Sponsor 🥉",
    company: "",
    description: "Software engineer and open-source enthusiast.",
    image: "https://i.pravatar.cc/250?img=3",
    email: "alice.smith@example.com",
    twitter: "alicesmith",
    github: "alicesmith",
    website: "https://alicesmith.com",
    createdAt: "2019-09-20",
  },
  {
    MemberId: 104,
    type: "ORGANIZATION",
    role: "HOST",
    isActive: true,
    totalAmountDonated: 10000,
    currency: "USD",
    lastTransactionAt: "2023-05-01",
    lastTransactionAmount: 1000,
    profile: "/profile/104",
    name: "Tech Solutions Inc.",
    tier: "Platinum Sponsor ⭐️",
    company: "Tech Solutions Inc.",
    description: "Proudly sponsoring open-source projects.",
    image: "https://i.pravatar.cc/250?img=4",
    email: "contact@techsolutions.com",
    twitter: "techsolutions",
    github: "techsolutions",
    website: "https://techsolutions.com",
    createdAt: "2018-05-10",
  },
  {
    MemberId: 105,
    type: "USER",
    role: "FUNDRAISER",
    isActive: true,
    totalAmountDonated: 2000,
    currency: "USD",
    lastTransactionAt: "2023-04-30",
    lastTransactionAmount: 250,
    profile: "/profile/105",
    name: "Bob Martin",
    tier: "Silver Sponsor 🥈",
    company: "",
    description: "Developer and open-source advocate.",
    image: "https://i.pravatar.cc/250?img=5",
    email: "bob.martin@example.com",
    twitter: "bobmartin",
    github: "bobmartin",
    website: "https://bobmartin.com",
    createdAt: "2021-02-05",
  },
  {
    MemberId: 106,
    type: "COLLECTIVE",
    role: "MEMBER",
    isActive: true,
    totalAmountDonated: 800,
    currency: "USD",
    lastTransactionAt: "2023-05-02",
    lastTransactionAmount: 50,
    profile: "/profile/106",
    name: "Open Source Community",
    tier: "Bronze Sponsor 🥉",
    company: "",
    description: "A group of open-source enthusiasts.",
    image: "https://i.pravatar.cc/250?img=6",
    email: "opensourcecommunity@example.com",
    twitter: "opensourcecommunity",
    github: "opensourcecommunity",
    website: "https://opensourcecommunity.org",
    createdAt: "2019-11-15",
  },
  {
    MemberId: 107,
    type: "ORGANIZATION",
    role: "ADMIN",
    isActive: true,
    totalAmountDonated: 15000,
    currency: "USD",
    lastTransactionAt: "2023-05-01",
    lastTransactionAmount: 2000,
    profile: "/profile/107",
    name: "Innovative Solutions",
    tier: "Hero Sponsor 🎖",
    company: "Innovative Solutions",
    description: "We innovate for a better tomorrow.",
    image: "https://i.pravatar.cc/250?img=7",
    email: "info@innovativesolutions.com",
    twitter: "innovativesolutions",
    github: "innovativesolutions",
    website: "https://innovativesolutions.com",
    createdAt: "2017-08-25",
  },
  {
    MemberId: 108,
    type: "USER",
    role: "CONTRIBUTOR",
    isActive: true,
    totalAmountDonated: 1200,
    currency: "USD",
    lastTransactionAt: "2023-04-28",
    lastTransactionAmount: 100,
    profile: "/profile/108",
    name: "Carol Johnson",
    tier: "Bronze Sponsor 🥉",
    company: "",
    description: "Full-stack developer and open-source contributor.",
    image: "https://i.pravatar.cc/250?img=8",
    email: "carol.johnson@example.com",
    twitter: "caroljohnson",
    github: "caroljohnson",
    website: "https://caroljohnson.com",
    createdAt: "2020-01-01",
  },
  {
    MemberId: 109,
    type: "COLLECTIVE",
    role: "ADMIN",
    isActive: true,
    totalAmountDonated: 4500,
    currency: "USD",
    lastTransactionAt: "2023-04-25",
    lastTransactionAmount: 500,
    profile: "/profile/109",
    name: "The Code Initiative",
    tier: "Gold Sponsor 🥇",
    company: "",
    description: "Empowering developers through open-source collaboration.",
    image: "https://i.pravatar.cc/250?img=9",
    email: "thecodeinitiative@example.com",
    twitter: "codeinitiative",
    github: "codeinitiative",
    website: "https://codeinitiative.org",
    createdAt: "2021-07-15",
  },
  {
    MemberId: 110,
    type: "ORGANIZATION",
    role: "BACKER",
    isActive: true,
    totalAmountDonated: 2400,
    currency: "USD",
    lastTransactionAt: "2023-05-02",
    lastTransactionAmount: 200,
    profile: "/profile/110",
    name: "Creative Minds Inc.",
    tier: "Silver Sponsor 🥈",
    company: "Creative Minds Inc.",
    description: "Supporting creativity and innovation in technology.",
    image: "https://i.pravatar.cc/250?img=10",
    email: "contact@creativeminds.com",
    twitter: "creativeminds",
    github: "creativeminds",
    website: "https://creativeminds.com",
    createdAt: "2016-03-12",
  },
];

export const getTier = (amount: number) => {
  return (
    Object.keys(SPONSOR_TIER_BY_AMOUNT).find((tier) => amount >= SPONSOR_TIER_BY_AMOUNT[tier]) ??
    SPONSOR_TIERS.BACKER
  );
};
