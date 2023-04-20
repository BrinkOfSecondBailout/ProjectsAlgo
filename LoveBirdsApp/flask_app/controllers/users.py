from flask_app import app
from flask import render_template, redirect, request, session, flash, url_for
from flask_app.models import user
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
import urllib.request
import os
bcrypt = Bcrypt(app)

UPLOAD_FOLDER = 'flask_app/static/files/'

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload')
def upload_pic():
    return render_template('file_upload.html')


@app.route('/upload', methods=['POST'])
def process_pic():
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file= request.files['file']
    if file.filename == '':
        flash('No image selected for uploading')
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename= secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        flash('Image successfully uploaded!')
        return render_template('file_upload.html', filename=filename)
    else:
        flash('Allowed image types are - png, jpg, jpeg, gif')
        return redirect(request.url)

@app.route('/display/<filename>')
def display_image(filename):
    return redirect(url_for('static', filename='files/' + filename), code=301)


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
    if not session:
        return redirect('/logout')
    data = {
        'id': session['user_id']
    }
    return render_template('dashboard.html', all_users=user.User.get_all_users(), user=user.User.get_info_by_id(data))



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

@app.route('/users/<int:id>')
def show_profile(id):
    if not session:
        return redirect('/logout')
    data = {
        'id': id
    }
    return render_template('display_profile.html', user=user.User.get_info_by_id(data))


@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')
