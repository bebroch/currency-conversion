import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from "@nestjs/common";
import { ConversionService } from "./conversion.service";
import { CreateConversionDto } from "./dto/create-conversion.dto";
import { UpdateConversionDto } from "./dto/update-conversion.dto";

@Controller("conversion")
export class ConversionController {
    constructor(private readonly conversionService: ConversionService) {}

    @Post()
    create(@Body() createConversionDto: CreateConversionDto) {
        return this.conversionService.create(createConversionDto);
    }

    @Get()
    findAll() {
        return this.conversionService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.conversionService.findOne(+id);
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateConversionDto: UpdateConversionDto,
    ) {
        return this.conversionService.update(+id, updateConversionDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.conversionService.remove(+id);
    }
}
