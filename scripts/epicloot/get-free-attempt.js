const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/120.0";
const epiclootSession = process.env.EPICLOOT_SESSION;

const getFreeAttempt = async () => {
    console.log("Attempting to gain free attempt...");
    const response = await fetch("https://epicloot.in/api/event/sm/getFree", {
        method: "POST",
        headers: {
            "User-Agent": userAgent,
            Cookie: `PHPSESSID=${epiclootSession}`,
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (data.success) {
        console.log("Free attempt gained successfully");
    } else {
        console.log("Free attempt failed");
        process.exit(1);
    }
};

if (!epiclootSession) {
    console.log("EPICLOOT_SESSION env variable is missing");
    process.exit(1);
} else {
    getFreeAttempt();
}
