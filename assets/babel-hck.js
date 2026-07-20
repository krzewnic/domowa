/* Clear the console because full Babel recompilation is not needed */
function cleanConsole() {
    const oldWarn = console.warn;
    console.warn = (...args) => {
    if (
        typeof args[0] === "string" &&
        args[0].includes("You are using the in-browser Babel transformer")
    ) {
        return;
    }
    oldWarn(...args);
    };
}

cleanConsole();