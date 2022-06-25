export default class WorkerBuilder {
    constructor(worker: string) {
        const code = worker.toString()
        const blob = new Blob([`(${code})()`])
        return new Worker(URL.createObjectURL(blob))
    }
}
