// Square client initialization with graceful fallback
let client: any = null;
let initialized = false;

function initializeSquareClient() {
  if (initialized) return client;
  initialized = true;

  if (!process.env.SQUARE_ACCESS_TOKEN) {
    console.log("Square: SQUARE_ACCESS_TOKEN not configured, payments disabled");
    return null;
  }

  try {
    // Use dynamic import to avoid module resolution issues
    const squareModule = require("square");
    const Client = squareModule.Client;
    const Environment = squareModule.Environment;

    client = new Client({
      environment:
        (process.env.SQUARE_ENVIRONMENT as "production" | "sandbox") ||
        "sandbox",
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      clientSignatureKey: process.env.SQUARE_SIGNATURE_KEY,
    });

    return client;
  } catch (error) {
    console.log("Square: Failed to initialize client:", (error as any).message);
    return null;
  }
}

function getSquareClient() {
  const squareClient = initializeSquareClient();
  if (!squareClient) {
    throw new Error(
      "Square is not configured. Please set SQUARE_ACCESS_TOKEN environment variable."
    );
  }
  return squareClient;
}

export const paymentsApi = {
  createPayment: (body: any) => getSquareClient().paymentsApi.createPayment(body),
};

export const ordersApi = {
  createOrder: (body: any) => getSquareClient().ordersApi.createOrder(body),
};

export const checkoutApi = {
  createCheckout: (body: any) =>
    getSquareClient().checkoutApi.createCheckout(body),
};

export const customersApi = {
  createCustomer: (body: any) =>
    getSquareClient().customersApi.createCustomer(body),
};

export const getClient = () => initializeSquareClient();
export default client;
