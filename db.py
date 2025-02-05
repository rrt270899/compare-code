import sqlite3

def create_database():
    conn = sqlite3.connect("loan_calculator.db")
    cursor = conn.cursor()
    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS loan_details (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        loan_amount REAL NOT NULL,
        tenure INTEGER NOT NULL,
        interest_rate REAL NOT NULL,
        emi REAL NOT NULL
    )
    """)
    
    conn.commit()
    conn.close()

if __name__ == "__main__":
    create_database()
