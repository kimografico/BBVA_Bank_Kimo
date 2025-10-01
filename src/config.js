const isLocal =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1';

export const CONFIG = {
  API: {
    BASE_URL: isLocal ? 'http://localhost:3001/api' : '/api',
    ENDPOINTS: {
      ACCOUNTS: '/accounts/',
      TRANSACTIONS: id =>
        isLocal
          ? `/accounts/${id}/transactions`
          : `/account-transactions?id=${id}`,
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
