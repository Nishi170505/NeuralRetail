import pandas as pd
import numpy as np
import os

def generate_transactions(n=1000):
    data = {
        'order_id': range(n),
        'sku': np.random.choice(['SKU-A', 'SKU-B', 'SKU-C'], n),
        'qty': np.random.randint(1, 10, n),
        'val': np.random.uniform(10, 500, n)
    }
    return pd.DataFrame(data)

if __name__ == "__main__":
    os.makedirs('data/raw', exist_ok=True)
    df = generate_transactions()
    df.to_csv('data/raw/transactions.csv', index=False)
    print("Sample data generated in data/raw/transactions.csv")
