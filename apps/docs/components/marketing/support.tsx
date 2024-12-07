import {Support as SupportClient} from "./support-client";

import {getAllSponsors} from "@/utils/get-all-sponsors";

async function getData() {
  try {
    const sponsors = await getAllSponsors();

    return {
      sponsors,
    };
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default async function Support() {
  const data = await getData();

  return <SupportClient sponsors={data.sponsors} />;
}
