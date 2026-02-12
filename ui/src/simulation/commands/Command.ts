export interface Command {
    do(): boolean
    undo(): void
}