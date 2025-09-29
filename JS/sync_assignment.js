function login() {
    console.log("login start");
    const start = Date.now();
    while (Date.now() - start < 2000) {}
    console.log("login end");
}

function getData() {
    console.log("getData start");
    const start = Date.now();
    while (Date.now() - start < 1000) {}
    console.log("getData end");
}

function displayData() {
    console.log("displayData start");
    console.log("2300320130063");
    const start = Date.now();
    while (Date.now() - start < 1000) {}
    console.log("displayData end");
}

login();
getData();
displayData();
console.log("Program Finished");
console.log("call other application");

