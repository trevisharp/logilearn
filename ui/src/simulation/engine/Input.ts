import type { Signal } from "./Signal"

export class Input {
    x = 0
    y = 0
    connected = false
    
    constructor(public title: string | null = null) { }
    state: Signal = 0
    private onSignalChange?: (input: Input) => void

    reciveSignal(newState: Signal) {
        if (this.state == newState) {
            return
        }
        
        this.state = newState
        this.onSignalChange?.(this)
    }

    subscribe(func: (i: Input) => void) {
        this.onSignalChange = func;
    }

    unsubscribe() {
        this.state = 0
        this.onSignalChange = undefined
    }
}