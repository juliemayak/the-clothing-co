/**
 * order controller
 */

const stripe = require("stripe")(process.env.VITE_STRIPE_SECRET_KEY);

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async create(ctx) {
      const { products, userName, email } = ctx.request.body;

      try {
        //retrieve item info
        const lineItems = await Promise.all(
          products.map(async (product, _params) => {
            const item = await strapi
              .service("api::item.item")
              .findOne(product.id, _params);

            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: item.name,
                },
                unit_amount: item.price * 100,
              },
              quantity: product.count,
            };
          })
        );

        // create stripe session
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          customer_email: email,
          mode: "payment",
          success_url: "http://localhost:5173/checkout/success",
          cancel_url: "http://localhost:5173/checkout/error",
          line_items: lineItems,
        });

        // create the order
        await strapi.service("api::order.order").create({
          data: { userName, products, stripeSessionId: session.id },
        });

        // return session id
        return { id: session.id };
      } catch (error) {
        ctx.response.status = 500;
        return {
          error: { message: "There was a problem creating the charge" },
        };
      }
    },
  })
);
