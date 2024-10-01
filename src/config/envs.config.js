import env from "env-var"
import 'dotenv/config'

export const envs = {
    TOKEN_TELEGRAM_BOT: env.get("TOKEN_TELEGRAM_BOT").required().asString(),
    URL_SERVER: env.get("URL_SERVER").required().asString()
}