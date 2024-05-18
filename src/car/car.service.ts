import { HttpException, Injectable } from '@nestjs/common';
import { Cars } from './cars.mock';
@Injectable()
export class CarService {
    private cars = Cars;

    public getCars() {
        return this.cars;
    }
    public postCar(car) {
        return this.cars.push(car);
    }
    public getCarById(id: number): Promise<any> {
        const carId = Number(id);
        return new Promise((resolve, reject) => {

            const cars = this.cars.find((cars) => cars.id === carId);
            if (cars) {
                throw new HttpException('not found', 404);
            }
            return resolve(cars);
        })
    }
    public deleteCarById(id: number): Promise<any> {
        const carId = Number(id);
        return new Promise((resolve) => {

            const index = this.cars.findIndex((cars) => cars.id === carId);
            if (index === -1) {
                throw new HttpException('not found', 404);
            }
            this.cars.splice(index, 1);
            return resolve(this.cars);

        })
    }
    public putCarById(id: number, propertyValue: string, propertyName: string): Promise<any> {
        const carId = Number(id);
        return new Promise((resolve) => {
            const index = this.cars.findIndex((car) => car.id === carId);
            if (index === -1) {
                throw new HttpException('not found', 404);
            }
            this.cars[index][propertyName] = propertyValue;
            return resolve(this.cars);
        });

    }
}
