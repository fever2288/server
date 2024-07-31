const express = require('express');
const app = express();
const port = 3005;
/**
 * Middleware to simulate a delay for all incoming requests.
 * This middleware introduces a delay of 3 seconds before passing the request to the next middleware.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */
const delayMiddleware = (req, res, next) => {
  setTimeout(() => next(), 3000);
};

/**
 * Returns the current timestamp in ISO 8601 format.
 * @returns {string} The current timestamp in ISO 8601 format.
 */
const getCurrentTimestamp = () => {
  return new Date().toISOString();
};

/**
 * Returns a sample data set for wallet balances.
 * Each wallet entry includes account details, balance information, and a timestamp.
 * @returns {Array<Object>} An array of wallet objects.
 * @example
 * [
 *   {
 *     "account_id": "3230bd7e-cb4c-553c-bcd3-607f3a3f8e20",
 *     "company_name": "Business Example LTD",
 *     "amount": {
 *       "amount": "198395.3700",
 *       "currency": "USD"
 *     },
 *     "credit_debit_indicator": "Credit",
 *     "datetime": "2024-07-24T12:00:00.000Z"
 *   },
 *   // More wallet objects...
 * ]
 */
const getWallets = () => {
  try {
    return [
      {
        account_id: '3230bd7e-cb4c-553c-bcd3-607f3a3f8e20',
        company_name: 'Business Example LTD',
        amount: {
          amount: '50000.5000',
          currency: 'USD',
        },
        credit_debit_indicator: 'Credit',
        datetime: getCurrentTimestamp(),
      },
      {
        account_id: '5259846c-1d53-d9e0-1865-9d3815c42c16',
        company_name: 'Business Example LTD',
        amount: {
          amount: '2700000.5000',
          currency: 'EUR',
        },
        credit_debit_indicator: 'Credit',
        datetime: getCurrentTimestamp(),
      },
      {
        account_id: 'a70e04fd-cc2e-4c93-9079-2e41ec6eb7a1',
        company_name: 'Business Example LTD',
        amount: {
          amount: '500730.0000',
          currency: 'GBP',
        },
        credit_debit_indicator: 'Credit',
        datetime: getCurrentTimestamp(),
      },
      {
        account_id: 'f70e04fd-cc2e-4c93-9079-2e41ec6eb7a2',
        company_name: 'Business Example LTD',
        amount: {
          amount: '1725000.0000',
          currency: 'RSD',
        },
        credit_debit_indicator: 'Credit',
        datetime: getCurrentTimestamp(),
      },
      {
        account_id: 't70e04fd-cc2e-4c93-9079-2e41ec6eb7a9',
        company_name: 'Business Example LTD',
        amount: {
          amount: '930000.0000',
          currency: 'JPY',
        },
        credit_debit_indicator: 'Credit',
        datetime: getCurrentTimestamp(),
      },
    ];
  } catch (error) {
    throw new Error('Error fetching wallets data');
  }
};

// Route to get wallet balances
/**
 * GET /wallets
 * @summary Retrieves a list of wallet balances.
 * @description This endpoint returns a list of wallet balances with a simulated delay of 3 seconds.
 * @response 200 - Success response with wallet data.
 * @response 500 - Internal server error if there is a failure in fetching wallet data.
 * @throws {Error} Throws an error if there is an issue processing the request.
 * @example
 * // Example response:
 * [
 *   {
 *     "account_id": "3230bd7e-cb4c-553c-bcd3-607f3a3f8e20",
 *     "company_name": "Business Example LTD",
 *     "amount": {
 *       "amount": "198395.3700",
 *       "currency": "USD"
 *     },
 *     "credit_debit_indicator": "Credit",
 *     "datetime": "2024-07-24T12:00:00.000Z"
 *   },
 *   // More wallet objects...
 * ]
 */
app.get('/wallets', delayMiddleware, (req, res, next) => {
  try {
    const wallets = getWallets();
    res.json(wallets);
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
/**
 * Middleware to handle errors.
 * @param {Object} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 * @description Catches errors and sends a JSON response with a 500 status code.
 * Logs the error stack to the console for debugging.
 * @response 500 - Internal server error with the error message.
 * @example
 * // Example error response:
 * {
 *   "error": {
 *     "message": "Error fetching wallets data"
 *   }
 * }
 */
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error
  res.status(500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

// Start the server
/**
 * Starts the Express server and listens on the specified port.
 * @param {number} port - The port number on which the server will listen.
 * @example
 * // Starting the server:
 * app.listen(port, () => {
 *   console.log(`Mock API listening at http://localhost:${port}`);
 * });
 */
app.listen(port, () => {
  console.log(`Mock API listening at http://localhost:${port}`);
});
