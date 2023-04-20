from flask_app import app
from flask import render_template, redirect, request, session, flash, url_for, Response
from flask_app.models import user, image
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
import urllib.request
import os
from flask_app.models.db import db_init, db

bcrypt = Bcrypt(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Image.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db_init(app)


# UPLOAD_FOLDER = 'flask_app/static/files/'

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload/<int:id>', methods=['POST'])
def upload_pic(id):
    pic = request.files['pic']
    if not pic:
        flash('No image has been selected!', 'upload')
        return redirect('/users/edit')
    if not allowed_file(pic.filename):
        flash('Allowed image types are - png, jpg, jpeg, gif', 'upload')
        return redirect('/users/edit')
    filename = secure_filename(pic.filename)
    mimetype = pic.mimetype
    userid = int(id)
    img = image.Image(img=pic.read(), name=filename, mimetype=mimetype, user=userid)
    db.session.add(img)
    db.session.commit()
    flash('Upload successful!', 'upload')
    return redirect('/users/edit')


@app.route('/pics/<int:id>')
def get_img(id):
    img = image.Image.query.filter_by(id=id).first()
    if not img:
        return "No image with that id", 404
    return Response(img.img, mimetype=img.mimetype)

@app.route('/pics/delete/<int:id>')
def delete_img(id):
    img = image.Image.query.filter_by(id=id).first()
    if not img:
        return "No image with that id", 404
    db.session.delete(img)
    db.session.commit()
    return redirect('/dashboard')



# @app.route('/upload', methods=['POST'])
# def process_pic():
#     if 'file' not in request.files:
#         flash('No file part')
#         return redirect(request.url)
#     file= request.files['file']
#     if file.filename == '':
#         flash('No image selected for uploading')
#         return redirect(request.url)
#     if file and allowed_file(file.filename):
#         filename= secure_filename(file.filename)
#         file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#         flash('Image successfully uploaded!')
#         return render_template('file_upload.html', filename=filename)
#     else:
#         flash('Allowed image types are - png, jpg, jpeg, gif')
#         return redirect(request.url)

# @app.route('/display/<filename>')
# def display_image(filename):
#     return redirect(url_for('static', filename='files/' + filename), code=301)


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

    all_pics = image.Image.query.filter_by(user=id).all()
    if not all_pics:
        flash('This user has not uploaded any pics yet!', 'upload')
        return render_template('display_profile.html', user=user.User.get_info_by_id(data))
    
    profile_pic = image.Image.query.filter_by(id=id).first()
    if not profile_pic:
        flash('This user has no profile picture! Sorry :(', 'upload')
        return render_template('display_profile.html', user=user.User.get_info_by_id(data))

    return render_template('display_profile.html', user=user.User.get_info_by_id(data), profile=profile_pic, pics=all_pics)


@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')
