import { Client, Environment } from "square";

const client = new Client({
  environment:
    (process.env.SQUARE_ENVIRONMENT as Environment) || Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  clientSignatureKey: process.env.SQUARE_SIGNATURE_KEY,
});

export const paymentsApi = client.paymentsApi;
export const ordersApi = client.ordersApi;
export const checkoutApi = client.checkoutApi;
export const customersApi = client.customersApi;

export default client;
