import { Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-customer')
  createCustomer() {
    return this.paymentService.createCustomer();
  }

  @Post('account-link')
  accountLink() {
    return this.paymentService.accountLink();
  }

  @Post('checkout')
  checkout() {
    return this.paymentService.checkout();
  }
}
