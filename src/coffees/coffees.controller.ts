import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Delete,
    Patch,
    Query,
    UsePipes,
    SetMetadata
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@UsePipes(ValidationPipe)
@Controller('coffees')
export class CoffeesController {

    constructor(private readonly coffeesService: CoffeesService) { }

    @Public()
    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto) {
        let { limit, offset } = paginationQuery;
        return this.coffeesService.findAll(paginationQuery);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
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
