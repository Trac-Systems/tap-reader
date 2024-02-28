import TracManager from "./TracManager.mjs";


export class CLI {
    constructor() {}


    async start() {
        let tracCore = new TracManager();
        await tracCore.initReader();

        return true;
    }
}