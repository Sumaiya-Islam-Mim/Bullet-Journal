# app.py
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_mail import Mail, Message
import re

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
mail = Mail(app)

# User model
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

# Routes
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(username=username, email=email, password=hashed_password)

        # Email validation
        if not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            flash("Invalid email address.", 'danger')
            return redirect(url_for('register'))

        # Add to database
        db.session.add(new_user)
        db.session.commit()
        flash("Registration successful! Please check your email to verify your account.", 'success')

        # Send email verification link (dummy implementation)
        send_verification_email(email)

        return redirect(url_for('login'))
    return render_template('register.html')

def send_verification_email(email):
    token = 'verification_token'  # For demo purposes, use a static token
    msg = Message('Email Verification', recipients=[email])
    msg.body = f'Please verify your email by clicking the link: http://localhost:5000/verify/{token}'
    mail.send(msg)

# Run the app
if __name__ == "__main__":
    app.run(debug=True)



