from flask import Flask, render_template, flash, redirect, url_for, session, logging, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_mysqldb import MySQL
from flask_mail import Mail, Message
from wtforms import Form, StringField, TextAreaField, PasswordField, validators
from checkPass import encrypt, check_password
from datetime import timedelta


app = Flask(__name__)

#Session config
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

class Register(Form):
    name = StringField('Name', [validators.Length(min=1, max=50)])
    surname = StringField('Surname', [validators.Length(min=1, max=50)])
    email = StringField('Email', [validators.Length(min=6, max=50)])
    password = PasswordField('Password', [
        validators.DataRequired(),
        validators.EqualTo('confirm', message='Passwords do not match!!!')
    ])
    confirm = PasswordField('Confirm Password')
    

@app.route('/Signin', methods=['GET', 'POST'])
def register():
    form = Register(request.form)
    if request.method == 'POST' and form.validate():
        name = form.name.data
        surname = form.surname.data
        email = form.email.data
        password = encrypt(form.password.data)
        
        db = mysql.connection
        cursor = db.cursor()
        
        cursor.execute("INSERT INTO users(name, surname, email, password) VALUES(%s, %s, %s, %s)", (name, surname, email, password))
        
        db.commit()
        
        cursor.close()
        
        flash('Welcome, you are now registered!', 'success')
        
        redirect(url_for('index'))
        return render_template('Signin.html', form=form)
    return render_template('Signin.html', form=form)

class Login(Form):
    email = StringField('email')
    password = PasswordField('password')


@app.route('/Login', methods=['GET','POST'])
def login():
    #Declaring email, password and cursor
        form=Login(request.form)
        request.method == 'POST'
        
        
        email = form.email.data
        password_cand = form.password.data
        
        cursor = mysql.connection.cursor()
        result = cursor.execute("SELECT * FROM users WHERE email=%s", [email])
        
        session.permanent = True
        #Checking the user login info
        if result > 0:
            data = cursor.fetchone()
            password_real = data['password']
            if check_password(password_cand, password_real) == True:
                
                session['Logged_in'] = True
                session['email'] = email
                
                flash('Welcome, you are now logged in!', 'success')
                return redirect(url_for('Account'))
            else:
                if 'email' in session:
                    return redirect(url_for('Account'))
                error = 'Login Failed. Reason: Invalid Password'
                return render_template('Login.html', error=error)
        else:
            app.logger.info('NO USER')
            error = 'Login Failed. Reason: Invalid Username'
            return render_template('Login.html')

@app.route('/Email', methods=['GET', 'POST'])
def Email():    
    msg = Message('Notice of a Successful order!', sender='savirawood22@gmail.com', recipients=['test666123123@gmail.com'])
    msg.body = 'Your Dildo 42cm Dragon Simulator has been ordered! Await for further instructions...'
    mail.send(msg)
    return ('Email sent!')

@app.route('/Account')
def Account():
    cursor = mysql.connection.cursor()
    
    if 'email' in session: 
        name = session['email']
        return name.jsonify({'Welcome, ${name}'})

@app.route('/logout')
def Logout():
    session.pop('email', None)
    flash('You have successfully logged out!', 'success')
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.secret_key = 'secret321'
    app.run(debug=True)