const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")("sk_test_51PFvkNSF0uRd81kXMu1vR2ox7zhvBXi6FqqhVgZgzPMTsIG3bEw0KK5t5YZXZS9oC8g3NLJiQAVCh3eXjbvixvp000nVQSvN79");

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.post("/api/create-checkout-session", async (req, res) => {
    const { products } = req.body;

    const lineItems = products.map((product) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: product.Title,
                // images: [product.Img],
            },
            unit_amount: product.Price * 100,
        },
        quantity: product.quantity
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            
              shipping_options: [
                {
                  shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                      amount: 100*100,
                      currency: 'inr',
                    },
                    display_name: 'Next day air',
                    delivery_estimate: {
                      minimum: {
                        unit: 'business_day',
                        value: 1,
                      },
                      maximum: {
                        unit: 'business_day',
                        value: 1,
                      },
                    },
                  },
                },
              ],
            //   phone_number_collection:{
            //     enabled:true
            //   },
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
            billing_address_collection: "required"
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating Checkout session:", error);
        res.status(500).json({ error: "Failed to create Checkout session" });
    }
});

app.get('/ap', (req, res) => {
    res.send('hello patoliya');
});

app.listen(8080, () => {
    console.log('Server started on port: 8080');
});
