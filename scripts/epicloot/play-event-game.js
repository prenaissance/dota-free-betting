const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/120.0";
const epiclootSession = process.env.EPICLOOT_SESSION;

const roles = ["DEFENSE" /*, "OFFENSE"*/];
const getRandomRole = () => roles[Math.floor(Math.random() * roles.length)];
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const headers = {
    "User-Agent": userAgent,
    Cookie: `PHPSESSID=${epiclootSession}`,
    "Content-Type": "application/json",
};

const playEventGame = async () => {
    const startGameData = await fetch(
        "https://epicloot.in/api/event/game/start",
        {
            method: "POST",
            headers,
            body: JSON.stringify({
                role: getRandomRole(),
            }),
        }
    ).then((res) => res.json());
    if (!startGameData.success) {
        console.error(`Failed to start game, reason: ${startGameData.error}`);
        process.exit(1);
    }
    const gameId = startGameData.id;
    console.log(`Started game, Game ID: ${gameId}`);
    for (let round = 1; round <= 3; round++) {
        const roundData = await fetch(
            "https://epicloot.in/api/event/game/action",
            {
                method: "POST",
                headers,
                body: JSON.stringify({
                    id: gameId,
                    round,
                    coords: [
                        {
                            x: 1,
                            y: 2,
                        },
                        {
                            x: 2,
                            y: 2,
                        },
                        {
                            x: 3,
                            y: 2,
                        },
                    ],
                }),
            }
        ).then((res) => res.json());
        if (!roundData.success) {
            console.error(
                `Failed to play round ${round}, reason: ${roundData.error}`
            );
            process.exit(1);
        }
        console.log(`Played round ${round}`);
        await sleep(1000);
    }
};

if (!epiclootSession) {
    console.log("EPICLOOT_SESSION env variable is missing");
    process.exit(1);
} else {
    playEventGame();
}
