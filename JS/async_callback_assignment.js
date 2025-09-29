function login(callback) {
    console.log("login start");
    setTimeout(() => {
        console.log("login end");
        callback();
    }, 2000);
}

function getData(callback) {
    console.log("getData start");
    setTimeout(() => {
        console.log("getData end");
        callback();
    }, 1000);
}

function displayData(callback) {
    console.log("displayData start");
    console.log("2300320130063");
    setTimeout(() => {
        console.log("displayData end");
        callback();
    }, 1000);
}

login(() => {
        getData(() => {
          displayData(() => {
            console.log("Program finished.");
            console.log("call other application");

        });
    });
});