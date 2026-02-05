import type { Signal } from "./Signal"

export class Output {

    constructor(public tilte: string | null = null) { }
    state: Signal = null
    onSignalChange?: (input: Output) => void

    sendSignal(newState: Signal) {
        if (this.state == newState)
            return
        
        this.state = newState
        this.onSignalChange?.(this)
    }

}