import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  paymentHandler: any = null;
  amount: string = '0.00';
  showThanks = false;
  constructor() {}
  ngOnInit() {
    this.invokeStripe();
  }

 

  updateAmount(event: Event) {
    this.amount = (<HTMLInputElement>event.target).value;
  
    
  }
  makePayment() {
    let num =  parseFloat(this.amount);
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MqcEjDGK6bT25ElI7sQIwfzYHxvL3k3OsrcMyDTPp12ZF9tXPKnTmdx9myNvIRgNDAsDE2TyoJP45krY46aurY700cO9hfd98',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Stripe token generated!');
      },
    });
    paymentHandler.open({
      name: 'Positronx',
      description: '3 widgets',
      amount: num * 100,
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'sk_test_51MqcEjDGK6bT25ElSAPO8xlJc4EoWRyph9IbXoPx2zibcxLxp3xSlJtpdnl5c5M81SFwXdToh66xkb89PybNgpYp00wlTPTPXc',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

}
