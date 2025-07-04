import React from "react";

import { getRandomNumber } from "./randomNumberApi";
import { unstable_cache } from "next/cache";

export const dynamic = "force-static";

export default async function Test() {
    const randomNumber = await unstable_cache(getRandomNumber, ["randomNumber"], {
        tags: ["randomNumber"],
        revalidate: 20,
    })();
    console.log(randomNumber);
    return <div>Test {randomNumber}</div>;
}