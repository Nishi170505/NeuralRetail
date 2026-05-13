import random
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def generate_mock_data():
    """Generates mock retail data for initial seeding."""
    
    # Products
    categories = ['Electronics', 'Home & Kitchen', 'Beauty', 'Sports', 'Toys']
    products = []
    for i in range(1, 101):
        products.append({
            'product_id': f'PROD-{i:03}',
            'name': f'Product {i}',
            'category': random.choice(categories),
            'price': round(random.uniform(10, 500), 2),
            'cost': round(random.uniform(5, 250), 2),
            'stock_level': random.randint(0, 1000)
        })
    df_products = pd.DataFrame(products)
    
    # Customers
    customers = []
    for i in range(1, 1001):
        customers.append({
            'customer_id': f'CUST-{i:04}',
            'signup_date': (datetime.now() - timedelta(days=random.randint(30, 730))).strftime('%Y-%m-%d'),
            'region': random.choice(['North', 'South', 'East', 'West']),
            'is_churned': random.random() < 0.15
        })
    df_customers = pd.DataFrame(customers)
    
    # Transactions
    transactions = []
    start_date = datetime.now() - timedelta(days=365)
    for _ in range(5000):
        date = start_date + timedelta(days=random.randint(0, 365))
        transactions.append({
            'transaction_id': f'TX-{random.randint(100000, 999999)}',
            'customer_id': random.choice(df_customers['customer_id']),
            'product_id': random.choice(df_products['product_id']),
            'quantity': random.randint(1, 5),
            'timestamp': date.strftime('%Y-%m-%d %H:%M:%S')
        })
    df_transactions = pd.DataFrame(transactions)
    
    # Save to CSV
    df_products.to_csv('data/raw/products.csv', index=False)
    df_customers.to_csv('data/raw/customers.csv', index=False)
    df_transactions.to_csv('data/raw/transactions.csv', index=False)
    print("Database seeding complete. Raw data generated in data/raw/")

if __name__ == "__main__":
    import os
    os.makedirs('data/raw', exist_ok=True)
    generate_mock_data()
