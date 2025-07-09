import React from "react";

import { getRandomNumber } from "./randomNumberApi";


export const dynamic = "force-static";
export const revalidate = 20;

export const generateMetadata = async () => {
    const randomNumber = await getRandomNumber();
    return {
        title: `Test ${randomNumber}`,
    };
};

export default async function Test() {
    const randomNumber = await getRandomNumber();
    console.log(randomNumber);
    return <div>Test {randomNumber}</div>;
}