import { Injectable } from "@nestjs/common";
import { CreateConversionDto } from "./dto/create-conversion.dto";
import { UpdateConversionDto } from "./dto/update-conversion.dto";

@Injectable()
export class ConversionService {
    create(createConversionDto: CreateConversionDto) {
        return "This action adds a new conversion";
    }

    findAll() {
        return `This action returns all conversion`;
    }

    findOne(id: number) {
        return `This action returns a #${id} conversion`;
    }

    update(id: number, updateConversionDto: UpdateConversionDto) {
        return `This action updates a #${id} conversion`;
    }

    remove(id: number) {
        return `This action removes a #${id} conversion`;
    }
}
