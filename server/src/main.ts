import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
    // TODO: вынести порт
    const PORT = 5000
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    await app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
}
bootstrap()
