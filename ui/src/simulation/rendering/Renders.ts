import type { Gate } from "../engine/Gate";
import type { GateRender } from "./GateRender";
import { InputGateRender } from "./renders/InputGateRender";

export class Renders {
    static registry = new Map<string, GateRender>()

    static load() {
        this.registry.set('input', new InputGateRender())
    }

    static get(gate: Gate): GateRender {
        const render = this.registry.get(gate.type)
        if (render == undefined) {
            throw new Error("invalid gate type")
        }
        return render
    }
}