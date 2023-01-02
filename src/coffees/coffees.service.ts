import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [
    {
        id: 1,
        name: 'Filter',
        brand: 'Illy',
        flavors: ['nuts','chocolate']
    },
    {
        id: 2,
        name: 'Moka',
        brand: 'Lavaza',
        flavors: ['chocolate']
    },
    {
        id: 3,
        name: 'Espresso',
        brand: 'Mobi',
        flavors: ['roasted macadamia']
    }];

    findAll() {
        return this.coffees;
    }

    findOne(id: string) {
        const coffee = this.coffees.find(item => item.id === +id);
        
        if (!coffee) {
            throw new NotFoundException('Coffee id does not exist.');
        }

        return coffee;
    }

    create(createCoffeeDto: any) {
        this.coffees.push(createCoffeeDto);
        return createCoffeeDto;
    }

    update(id: string, createCoffeeDto: any) {
        const existingCoffee = this.findOne(id);

        if (existingCoffee) {
            // some logic
        }
    }

    remove(id: string) {
        const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
        
        if (coffeeIndex >= 0) {
            this.coffees.splice(coffeeIndex, 1);
        }
    }
}
