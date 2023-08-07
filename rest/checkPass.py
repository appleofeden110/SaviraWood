import hashlib

def encrypt(password):
    return hashlib.sha256(password.encode()).hexdigest()

def check_password(password, hashed_password):
    hashed_input = hashlib.sha256(password.encode()).hexdigest()
    return hashed_input == hashed_password
