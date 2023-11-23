import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe('{{stripe_key}}', {
      apiVersion: '2023-10-16',
    });
  }

  async createCustomer() {
    const account = await this.stripe.accounts.create({
      type: 'express',
    });

    return account;
  }

  async accountLink() {
    const accountLink = await this.stripe.accountLinks.create({
      account: '{{account_ID}}',
      refresh_url: 'https://example.com/reauth',
      return_url: 'https://example.com/return',
      type: 'account_onboarding',
    });

    return accountLink;
  }

  async checkout() {
    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: 'price_1OFj11FNTaHxpqxnzwOGmJVb',
          quantity: 1,
        },
      ],
      payment_intent_data: {
        application_fee_amount: 1,
        transfer_data: {
          destination: '{{account_ID}}',
        },
      },
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });

    return session;
  }
}
