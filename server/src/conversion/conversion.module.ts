import { Module } from "@nestjs/common";
import { ConversionService } from "./conversion.service";
import { ConversionController } from "./conversion.controller";

@Module({
    controllers: [ConversionController],
    providers: [ConversionService],
})
export class ConversionModule {}
