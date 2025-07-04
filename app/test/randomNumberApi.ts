export async function getRandomNumber() {
    const response = await fetch("https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new");
    const data = await response.text();
    return data;
}