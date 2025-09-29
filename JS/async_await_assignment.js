function asyncAction(name, dly) {
    console.log(`${name} start`);
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`${name} end`);
            resolve();
        }, dly);
    });
}

async function main() {
    await asyncAction("login", 1000);
    await asyncAction("getData", 1000);
    console.log("2300320130063");
    await asyncAction("displayData", 1000);
    console.log("call other application");
}

main();
