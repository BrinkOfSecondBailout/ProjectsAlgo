from flask_app import app
from flask import render_template, redirect, request, session, flash
from flask_app.models import user
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)


@app.route('/')
def index_page():
    return render_template('index.html')

@app.route('/process/registration', methods=['POST'])
def process_registration():
    if not user.User.validate_registration(request.form):
        return redirect('/')
    else:
        data = {
            'first_name': request.form['first_name'],
            'last_name': request.form['last_name'],
            'email': request.form['email'],
            'password': bcrypt.generate_password_hash(request.form['password'])
        }
        user.User.save_user(data)
        return redirect('/')


@app.route('/process/login', methods=['POST'])
def process_login():
    user1 = user.User.validate_login(request.form)
    if not user1:
        return redirect('/')
    if not bcrypt.check_password_hash(user1['password'], request.form['password']):
        flash('Incorrect password! Try again.', 'login')
        return redirect('/')
    else:
        session['user_id'] = user1['id']
        return redirect('/dashboard')
    
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html', all_users=user.User.get_all_users())

@app.route('/users/edit')
def edit_profile():
    if not session:
        return redirect('/logout')
    data = {
        'id': session['user_id']
    }
    return render_template('edit_profile.html', user=user.User.get_info_by_id(data))

@app.route('/users/update', methods=['POST'])
def update_profile():
    if not session:
        return redirect('/logout')
    if not user.User.validate_edit(request.form):
        return redirect('/users/edit')
    data = {
        'id': session['user_id'],
        'first_name': request.form['first_name'],
        'last_name': request.form['last_name'],
        'email': request.form['email']
    }
    user.User.update_user(data)
    return redirect('/dashboard')


@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')


