import type { Signal } from "./Signal"

export class Output {

    constructor(public tilte: string | null = null) { }
    state: Signal = null
    private onSignalChange: ((output: Output) => void)[] = []

    sendSignal(newState: Signal) {
        if (this.state == newState)
            return
        
        this.state = newState
        this.onSignalChange.forEach(func => {
            func(this)
        });
    }

    subscribe(func: (o: Output) => void) {
        this.onSignalChange.push(func)
    }

    unsubscribe(func: (o: Output) => void) {
        this.onSignalChange = this.onSignalChange.filter(fn => fn !== func)
    }
}