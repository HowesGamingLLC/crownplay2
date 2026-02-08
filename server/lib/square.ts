let client: any = null;

function initializeClient() {
  if (client) return client;

  try {
    // Dynamically require square to avoid import issues
    const square = require("square");
    const { Client, Environment } = square;

    if (!process.env.SQUARE_ACCESS_TOKEN) {
      console.warn("SQUARE_ACCESS_TOKEN not configured, Square payments disabled");
      return null;
    }

    client = new Client({
      environment:
        (process.env.SQUARE_ENVIRONMENT as "production" | "sandbox") ||
        "sandbox",
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      clientSignatureKey: process.env.SQUARE_SIGNATURE_KEY,
    });

    return client;
  } catch (error) {
    console.warn("Failed to initialize Square client:", error);
    return null;
  }
}

export const paymentsApi = {
  createPayment: async (body: any) => {
    const squareClient = initializeClient();
    if (!squareClient) throw new Error("Square not configured");
    return squareClient.paymentsApi.createPayment(body);
  },
};

export const ordersApi = {
  createOrder: async (body: any) => {
    const squareClient = initializeClient();
    if (!squareClient) throw new Error("Square not configured");
    return squareClient.ordersApi.createOrder(body);
  },
};

export const checkoutApi = {
  createCheckout: async (body: any) => {
    const squareClient = initializeClient();
    if (!squareClient) throw new Error("Square not configured");
    return squareClient.checkoutApi.createCheckout(body);
  },
};

export const customersApi = {
  createCustomer: async (body: any) => {
    const squareClient = initializeClient();
    if (!squareClient) throw new Error("Square not configured");
    return squareClient.customersApi.createCustomer(body);
  },
};

export default client;
