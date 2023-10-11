class ShareSaleException extends Error {
    constructor(message) {
      super(message);
      this.name = 'ShareSaleException';
    }
  }

class Portfolio {
    constructor() {
      this.stocks = {};
    }

    isEmpty(){
        return Object.keys(this.stocks).length == 0;
    }

    numTickers(){
        return Object.keys(this.stocks).length;
    }
  
    // Add or update a stock to the portfolio
    addStock(ticker, amount) {
      if (this.stocks[ticker]) {
        // If the stock already exists, add the amount to the existing amount
        this.stocks[ticker] += amount;
      } else {
        // Otherwise, set the stock amount
        this.stocks[ticker] = amount;
      }
    }
  
    // Get the amount of a particular stock
    getStock(ticker) {
      return this.stocks[ticker] || 0;  // Return 0 if the ticker doesn't exist in the portfolio
    }

    //sell shares of a stock
    sellShares(ticker, amount) {
        if (this.stocks[ticker] < amount) {
            throw new ShareSaleException(`Sell amount exceeds amount owned`);
        }

        if (this.stocks[ticker]) {
          // Subtract the amount from the existing amount
          this.stocks[ticker] -= amount;
        } 

        // If the amount becomes zero or negative, remove the stock from the portfolio
        if (this.stocks[ticker] <= 0) {
            delete this.stocks[ticker];
        }
      }
  
    // Remove a stock completely from the portfolio
    removeStock(ticker) {
      delete this.stocks[ticker];
    }
  
    // Display the whole portfolio
    display() {
      for (let ticker in this.stocks) {
        console.log(`${ticker}: ${this.stocks[ticker]}`);
      }
    }
  }


export default {Portfolio, ShareSaleException};