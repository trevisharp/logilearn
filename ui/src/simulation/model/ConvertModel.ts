import { AddGateCommand } from "../commands/AddGateCommand";
import type { Command } from "../commands/Command";
import { ConnectGateCommand } from "../commands/ConnectGateCommand";
import type { Circuit } from "../engine/Circuit";
import type { Gate } from "../engine/Gate";
import { AndGate } from "../engine/gates/AndGate";
import { InputGate } from "../engine/gates/InputGate";
import { NotGate } from "../engine/gates/NotGate";
import { OrGate } from "../engine/gates/OrGate";
import { OutputGate } from "../engine/gates/OutputGate";
import type { RenderContext } from "../rendering/RenderContext";
import type { CircuitModel } from "./CircuitModel";

export function toCircuit(model: CircuitModel, circuit: Circuit, ctx: RenderContext): Command[] {
    const commands: Command[] = []
    const map = new Map<string, Gate>()

    model.gates.forEach(gate => {
        switch (gate.type)
        {
            case 'input':
                const inputGate = new InputGate()
                map.set(gate.id, inputGate)
                commands.push(new AddGateCommand(
                    inputGate, circuit, ctx, gate.x, gate.y
                ))
                break;
                
            case 'output':
                const outputGate = new OutputGate()
                map.set(gate.id, outputGate)
                commands.push(new AddGateCommand(
                    outputGate, circuit, ctx, gate.x, gate.y
                ))
                break;
                
            case 'and':
                const andGate = new AndGate()
                map.set(gate.id, andGate)
                commands.push(new AddGateCommand(
                    andGate, circuit, ctx, gate.x, gate.y
                ))
                break;
                
            case 'or':
                const orGate = new OrGate()
                map.set(gate.id, orGate)
                commands.push(new AddGateCommand(
                    orGate, circuit, ctx, gate.x, gate.y
                ))
                break;
                
            case 'not':
                const notGate = new NotGate()
                map.set(gate.id, notGate)
                commands.push(new AddGateCommand(
                    notGate, circuit, ctx, gate.x, gate.y
                ))
                break;
        }
    });
        
    model.wires.forEach(wire => {
        const gateA = map.get(wire.fromId)
        const gateB = map.get(wire.toId)

        if (gateA === undefined || gateB === undefined) {
            return
        }

        commands.push(new ConnectGateCommand(
            gateA, gateB, 0, 0, 0, 0, ctx
        ))
    });

    return commands
}

export function toModel(commands: Command[]): CircuitModel {
    const model: CircuitModel = {
        gates: [],
        wires: []
    }
    let id = 1
    const map = new Map<Gate, string>()

    commands.forEach(command => {
        if (command instanceof AddGateCommand) {
            const gateId = `g${id++}`
            map.set(command.gate, gateId)
            model.gates.push({
                id: gateId,
                type: command.gate.type,
                x: command.x,
                y: command.y
            })
            return
        }

        if (command instanceof ConnectGateCommand) {
            model.wires.push({
                fromId: map.get(command.startGate) ?? "",
                toId: map.get(command.endGate) ?? ""
            })
            return
        }
    });

    return model
}