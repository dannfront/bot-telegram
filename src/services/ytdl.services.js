import ytdl from "@distube/ytdl-core";

export class YtdlService {

    #dataBuffer = []
    constructor(url="", options={}) {
        this.url = url
        this.options = options
    }

    #downloadVideoStream() {
        return new Promise((resolve, reject) => {

            const video = ytdl(this.url, this.options)
            video.on("data", (buffer) => {
                this.#dataBuffer.push(buffer)
            })

            video.on('end', () => {
                const resultVideo = Buffer.concat(this.#dataBuffer)
                resolve(resultVideo)
            })
        })
    }

    async sendVideo() {
        try {
            const video = await this.#downloadVideoStream()
            return video
        } catch (error) {
            throw error
        }
    }

}