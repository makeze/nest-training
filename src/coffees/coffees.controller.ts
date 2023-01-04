import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Delete,
    Patch,
    Query,
    UsePipes
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ApiTags } from '@nestjs/swagger/dist';
import { Public } from '../common/decorators/public.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@UsePipes(ValidationPipe)
@Controller('coffees')
@ApiTags('coffees')
export class CoffeesController {

    constructor(private readonly coffeesService: CoffeesService) { }

    @Public()
    @Get()
    async findAll(@Query() paginationQuery: PaginationQueryDto) {
        return this.coffeesService.findAll(paginationQuery);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: string) {
        console.log(id);
        return this.coffeesService.findOne(id);
    }

    @Post()
    create(@Body() CreateCoffeeDto: CreateCoffeeDto) {
        return this.coffeesService.create(CreateCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
        return this.coffeesService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeesService.remove(id);
    }
}
