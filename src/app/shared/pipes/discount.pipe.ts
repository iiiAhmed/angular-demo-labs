import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
  standalone: true
})
export class DiscountPipe implements PipeTransform {
  transform(price: number, priceAfterDiscount: number): string {
    if (!price || !priceAfterDiscount || price <= priceAfterDiscount) {
      return '';
    }
    const discount = ((price - priceAfterDiscount) / price) * 100;
    return `${discount.toFixed(0)}% OFF`;
  }
}
