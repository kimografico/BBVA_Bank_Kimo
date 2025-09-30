export const CONFIG = {
  API: {
    BASE_URL: 'http://localhost:3001/api',
    ENDPOINTS: {
      ACCOUNTS: '/accounts/',
      TRANSACTIONS: id => `/accounts/${id}/transactions`,
    },
    TIMEOUT: 5000,
  },

  USER: {
    DEFAULT_ID: 2,
  },

  PAGINATION: {
    DEFAULT_PAGE_SIZE: 5,
    PAGE_SIZE_OPTIONS: [5, 10, 25, 50],
  },

  VALIDATION: {
    NAME_MIN_LENGTH: 2,
    PHONE_LENGTH: 9,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^\d{9}$/,
  },

  APP: {
    DEFAULT_LANGUAGE: 'es',
    SPINNER_DELAY: 2000,
  },
};
