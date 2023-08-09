from flask import Flask, render_template, flash, redirect, url_for, session, logging, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_marshmallow import Marshmallow, fields
from flask_mysqldb import MySQL
from flask_mail import Mail, Message
from wtforms import Form, StringField, TextAreaField, PasswordField, validators
from checkPass import encrypt, check_password
from datetime import timedelta
from flask_cors import CORS
import os

app = Flask(__name__)
cors = CORS(app)


basedir = os.path.abspath(os.path.dirname(__file__))
app.permanent_session_lifetime = timedelta(days=15)

#MySQL config
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'savirawood'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql=MySQL(app)

#Flask-Mail config
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'savirawood22@gmail.com'
app.config['MAIL_PASSWORD'] = 'fzlqjxrgaycftphw'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:@localhost:3306/savirawood'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

# PRODUCTS 

#Product Class
class Woodenpictures(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    width = db.Column(db.Integer)
    height = db.Column(db.Integer)
    weight = db.Column(db.Integer)
    price = db.Column(db.Float)
    def __init__(self, name, width, height, weight, price ):
        self.name = name
        self.width = width
        self.height = height
        self.weight = weight
        self.price = price

class WoodenpicturesSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'width', 'height', 'wight', 'price')

product_schema = WoodenpicturesSchema()
products_schema = WoodenpicturesSchema(many=True)


# with app.app_context():
#     db.create_all()

# PRODUCT CRUD

@app.route('/pictures', methods=['POST'])
def add_product():
    name = request.json['name']
    width = request.json['width']
    height = request.json['height']
    weight = request.json['weight']
    price = request.json['price']
    
    new_product = Woodenpictures(name, width, height, weight, price)
    
    db.session.add(new_product)
    db.session.commit()
    
    return product_schema.jsonify(new_product)

@app.route('/pictures', methods=['GET'])
def get_products():
    all_products = Woodenpictures.query.all()
    result = products_schema.dump(all_products)
    return jsonify(result)

@app.route('/pictures/<id>', methods=['GET'])
def get_product(id):
    product = Woodenpictures.query.get(id)
    return product_schema.jsonify(product)

@app.route('/pictures/<id>', methods=['PUT'])
def update_product(id):
    product = Woodenpictures.query.get(id)
    
    name = request.json['name']
    width = request.json['width']
    height = request.json['height']
    weight = request.json['weight']
    price = request.json['price']
    
    Woodenpictures.name = name
    Woodenpictures.width = width
    Woodenpictures.height = height
    Woodenpictures.weight = weight
    Woodenpictures.price = price
    
    db.session.commit()
    
    return product_schema.jsonify(product)

@app.route('/pictures/<id>', methods=['DELETE'])
def delete_product(id):
    product = Woodenpictures.query.get(id)
    db.session.delete(product)
    db.session.commit()
    
    return product_schema.jsonify(product)

# ACCOUNT AUTH

#User Class
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    surname = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    def __init__(self, name, surname, email, password):
        self.name = name
        self.surname = surname
        self.email = email
        self.password = password

class UsersSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'surname', 'email', 'password')

user_schema = UsersSchema()
users_schema = UsersSchema(many=True)

# USER CRUD

@app.route('/register', methods = ['POST'])
def register():
    name = request.json['name']
    surname = request.json['surname']
    email = request.json['email']
    password = encrypt(request.json['password'])
    create_user = Users(name, surname, email, password)
    
    db.session.add(create_user)
    db.session.commit()
    
    return user_schema.jsonify(create_user)

@app.route('/login/<id>', methods = ['GET'])
def get_user(id):
    users = Users.query.get(id)
    return user_schema.jsonify(users)


if __name__ == '__main__':
    app.run(debug=True)