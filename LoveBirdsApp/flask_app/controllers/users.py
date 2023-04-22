from flask_app import app
from flask import render_template, redirect, request, session, flash
from flask_app.models import user, image, attribute
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
    if not session:
        return redirect('/logout')
    data = {
        'user_id': session['user_id']
    }
    id = session['user_id']
    

    all_pics = image.Photo.query.filter_by(user=id).all()
    
    all_users = user.User.get_all_users()
    
    for pic in all_pics:
        if(pic.profile == "yes"):
            profile_pic = pic
            return render_template('dashboard.html', all_users=all_users, user=user.User.get_info_by_id(data), profile=profile_pic)

    return render_template('dashboard.html', all_users=all_users, user=user.User.get_info_by_id(data))



@app.route('/users/edit')
def edit_profile():
    if not session:
        return redirect('/logout')
    data = {
        'user_id': session['user_id']
    }
    id = session["user_id"]
    all_pics = image.Photo.query.filter_by(user=id).all()
    if not all_pics:
        return render_template('edit_profile.html', user=user.User.get_info_by_id(data), attributes=attribute.Attribute.get_attribute_by_user_id(data))
    
    for pic in all_pics:
        if(pic.profile == "yes"):
            profile_pic = pic
            return render_template('edit_profile.html', user=user.User.get_info_by_id(data), pics=all_pics, profile=profile_pic, attributes=attribute.Attribute.get_attribute_by_user_id(data))

    return render_template('edit_profile.html', user=user.User.get_info_by_id(data), pics=all_pics, attributes=attribute.Attribute.get_attribute_by_user_id(data))

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

@app.route('/changepw')
def change_pw():
    return render_template('change_pw.html')

@app.route('/updatepw', methods=['POST'])
def update_pw():
    if not session:
        return redirect('/logout')
    if not user.User.validate_password(request.form):
        return redirect('/changepw')
    data = {
        'password': bcrypt.generate_password_hash(request.form['password']),
        'id': session['user_id']
    }
    user.User.update_password(data)
    return redirect('/users/edit')


@app.route('/users/<int:id>')
def show_profile(id):
    if not session:
        return redirect('/logout')
    data = {
        'user_id': id
    }
    data1 = {
        'id': session['user_id']
    }
    attributes = attribute.Attribute.get_attribute_by_user_id(data)
    user_with_hearts = user.User.get_me_with_all_my_hearts(data1)
    all_pics = image.Photo.query.filter_by(user=id).all()
    if not all_pics:
        flash('This user has not uploaded any pics yet!', 'upload')
        return render_template('display_profile.html', user=user.User.get_info_by_id(data), attributes=attributes, user_with_hearts=user_with_hearts)
    
    for pic in all_pics:
        if(pic.profile == "yes"):
            profile_pic = pic
            return render_template('display_profile.html', user=user.User.get_info_by_id(data), pics=all_pics, profile=profile_pic, attributes=attributes, user_with_hearts=user_with_hearts)
        
    return render_template('display_profile.html', user=user.User.get_info_by_id(data), pics=all_pics, attributes=attributes, user_with_hearts=user_with_hearts)


@app.route('/sendheart/<int:id>')
def send_a_heart(id):
    data = {
        'user_id': session['user_id'],
        'match_id': id
    }
    user.User.send_heart(data)
    return redirect('/dashboard')



@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')
