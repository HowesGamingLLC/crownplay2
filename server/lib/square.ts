// Lazy-loaded Square client to avoid import issues during server startup
let cachedClient: any = null;

function getSquareClient() {
  if (cachedClient !== null) {
    return cachedClient;
  }

  if (!process.env.SQUARE_ACCESS_TOKEN) {
    console.log("Square: SQUARE_ACCESS_TOKEN not configured, payments disabled");
    return null;
  }

  try {
    // Dynamically require square only when actually needed
    const square = require("square");
    const { Client, Environment } = square;

    cachedClient = new Client({
      environment:
        (process.env.SQUARE_ENVIRONMENT as "production" | "sandbox") ||
        "sandbox",
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      clientSignatureKey: process.env.SQUARE_SIGNATURE_KEY,
    });

    return cachedClient;
  } catch (error) {
    console.warn("Square: Failed to initialize client:", (error as any).message);
    return null;
  }
}

// Export lazy-loaded API objects
export const paymentsApi = {
  createPayment: (body: any) => {
    const client = getSquareClient();
    if (!client) throw new Error("Square not configured");
    return client.paymentsApi.createPayment(body);
  },
};

export const ordersApi = {
  createOrder: (body: any) => {
    const client = getSquareClient();
    if (!client) throw new Error("Square not configured");
    return client.ordersApi.createOrder(body);
  },
};

export const checkoutApi = {
  createCheckout: (body: any) => {
    const client = getSquareClient();
    if (!client) throw new Error("Square not configured");
    return client.checkoutApi.createCheckout(body);
  },
};

export const customersApi = {
  createCustomer: (body: any) => {
    const client = getSquareClient();
    if (!client) throw new Error("Square not configured");
    return client.customersApi.createCustomer(body);
  },
};

export const getClient = getSquareClient;
export default cachedClient;
