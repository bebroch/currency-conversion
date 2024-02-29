import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AuthModule } from "./auth/auth.module"
import { ConversionModule } from "./conversion/conversion.module"

@Module({
    imports: [AuthModule, ConversionModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
