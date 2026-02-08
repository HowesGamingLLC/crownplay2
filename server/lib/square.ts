// Stub Square client - will be implemented when Square credentials are configured
// For now, we provide stub implementations that throw meaningful errors

export const paymentsApi = {
  createPayment: async (body: any) => {
    throw new Error(
      "Square payments not configured. Please set SQUARE_ACCESS_TOKEN environment variable."
    );
  },
};

export const ordersApi = {
  createOrder: async (body: any) => {
    throw new Error(
      "Square orders not configured. Please set SQUARE_ACCESS_TOKEN environment variable."
    );
  },
};

export const checkoutApi = {
  createCheckout: async (body: any) => {
    throw new Error(
      "Square checkout not configured. Please set SQUARE_ACCESS_TOKEN environment variable."
    );
  },
};

export const customersApi = {
  createCustomer: async (body: any) => {
    throw new Error(
      "Square customers not configured. Please set SQUARE_ACCESS_TOKEN environment variable."
    );
  },
};

export const getClient = () => null;
export default null;
