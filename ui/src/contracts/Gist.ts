export type Gist = {
    id: string,
    url: string,
    html_url: string,
    public: boolean,
    description: string,
    files: {
        [file: string]: {
            filename: string,
            raw_url: string
        }
    }
}