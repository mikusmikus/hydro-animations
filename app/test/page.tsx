import React from "react";

import { getRandomNumber } from "./randomNumberApi";

export const dynamic = "force-static";

export default async function Test() {
    const randomNumber = await getRandomNumber();
    console.log(randomNumber);
    return <div>Test {randomNumber}</div>;
}