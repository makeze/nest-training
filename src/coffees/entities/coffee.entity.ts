import { Schema, Prop } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose/dist';
import { Document } from 'mongoose';

@Schema()
export class Coffee extends Document {
    @Prop()
    id: number;

    @Prop()
    name: string;

    @Prop()
    brand: string;

    @Prop([String])
    flavors: string[];

    @Prop()
    recommendations: number;
}

export const CoffeeSchema = SchemaFactory.createForClass(Coffee);