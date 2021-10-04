### Q&A
Q: Mengapa saya mendapat error message SequelizeConnectionError?
A: Itu karena variable environment anda belum ada. Untuk kedepannya file .env saya hapus dan dimasukkan ke .gitignore.

Q: Bagaimana solusi SequelizeConnectionError?
A: Buat file dengan nama .env dan masukkan variable environment disesuaikan dengan lokal mesin anda. contoh:
    DB_HOST = "localhost"
    DB_PORT = "5432"
    DB_USER = "postgres"
    DB_PASSWORD = "postgres"
    DB_NAME = "postgres"