import TelegramBot from "node-telegram-bot-api"

export class BotService {

    
    constructor(token,url) {
        this.bot=new TelegramBot(token)
        this.bot.setWebHook(url)
    }

    sendMessage(chatId,message="") {
        this.bot.sendMessage(chatId,message)
    }

    async sendVideo(chatId,videoFile) {
        await this.bot.sendVideo(chatId,videoFile)
    }

    async sendChatAction(chatId) {
        try {
            await this.bot.sendChatAction(chatId, "upload_video");
        } catch (error) {
            console.error('Error sending chat action:', error);
        }
    }

}