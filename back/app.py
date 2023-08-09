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
#Product Class

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float)
    qty = db.Column(db.Integer)
    def __init__(self, name, price, qty):
        self.name = name
        self.price = price
        self.qty = qty

class ProductSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'price', 'qty')

product_schema = ProductSchema()
products_schema = ProductSchema(many=True)

# with app.app_context():
#     db.create_all()

@app.route('/product', methods=['POST'])
def add_product():
    name = request.json['name']
    price = request.json['price']
    qty = request.json['qty']
    
    new_product = Product(name, price, qty)
    
    db.session.add(new_product)
    db.session.commit()
    
    return product_schema.jsonify(new_product)

@app.route('/product', methods=['GET'])
def get_products():
    all_products = Product.query.all()
    result = products_schema.dump(all_products)
    return jsonify(result)

@app.route('/product/<id>', methods=['GET'])
def get_product(id):
    product = Product.query.get(id)
    return product_schema.jsonify(product)

@app.route('/product/<id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get(id)
    
    name = request.json['name']
    price = request.json['price']
    qty = request.json['qty']
    
    product.name = name
    product.price = price
    product.qty = qty
    
    db.session.commit()
    
    return product_schema.jsonify(product)

@app.route('/product/<id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get(id)
    db.session.delete(product)
    db.session.commit()
    
    return product_schema.jsonify(product)


if __name__ == '__main__':
    app.run(debug=True)