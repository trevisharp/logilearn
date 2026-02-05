import type { Signal } from "./Signal"

export class Input {

    constructor(public tilte: string | null = null) { }
    state: Signal = null
    onSignalChange?: (input: Input) => void

    reciveSignal(newState: Signal) {
        if (this.state == newState)
            return
        
        this.state = newState
        this.onSignalChange?.(this)
    }
}