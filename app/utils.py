import yfinance as yf

def get_stock_info(ticker):
    try:
        stock = yf.Ticker(ticker)
        hist = stock.history(period="2d")  # Get last two days' prices

        if hist.empty or len(hist) < 2:
            return None  # If not enough data, return None

        last_close = hist["Close"].iloc[-2]  # Previous day's close price
        current_price = hist["Close"].iloc[-1]  # Latest closing price

        percent_change = ((current_price - last_close) / last_close) * 100

        return {
            "current_price": round(current_price, 2),
            "percent_change": round(percent_change, 2),
        }
    except Exception as e:
        print(f"Error fetching {ticker}: {e}")
        return None
