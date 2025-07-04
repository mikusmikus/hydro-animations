import React from "react";

import { getRandomNumber } from "./randomNumberApi";

export const dynamic = "force-static";
export const revalidate = 20;

export default async function Test() {
    const randomNumber = await getRandomNumber();
    console.log(randomNumber);
    return <div>Test {randomNumber}</div>;
}