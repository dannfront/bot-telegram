import { envs } from "./config/envs.config.js";
import express from "express"
import { YtdlService } from './services/ytdl.services.js';
import { UrlDto } from './domain/dtos/url.dto.js';
import { BotService } from './services/bot.services.js';
import ytdl from "@distube/ytdl-core";

const app = express()

const token = envs.TOKEN_TELEGRAM_BOT
const bot = new BotService(token, `${envs.URL_SERVER}/bot`)

app.use(express.json())


app.post("/bot", async (req, res) => {

    const url = req.body.message?.link_preview_options?.url
    const chatId = req.body.message.chat.id
    const text = req.body.message.text

    switch (text) {
        case '/start':
            bot.sendMessage(chatId, `Welcome to the Telegram bot, to download a video just copy the link to the chat`)
            return res.send(200)

        default:
            break;
    }


    const [urlDto, error] = UrlDto.create(url,ytdl.validateURL)

    if (error) {
        bot.sendMessage(chatId, error)
        return res.send(200)
    }

    const videoYtdl = new YtdlService(urlDto.url, { quality: 'highestvideo', filter: format => (format.hasAudio === true && format.hasVideo === true) })

    bot.sendMessage(chatId, "descargando video...")


    videoYtdl.sendVideo()
        .then((video) => bot.sendVideo(chatId, video))
        .catch((error) => bot.sendMessage("error send video"))


    res.send(200)

})

const PORT = 3000
app.listen(PORT, () => console.log("server started"))



