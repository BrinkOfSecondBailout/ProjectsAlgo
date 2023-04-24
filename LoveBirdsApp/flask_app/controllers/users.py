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
    
    data2 = {
        'id': session['user_id']
    }
    user_with_matches = user.User.get_me_with_all_my_hearts(data2)

    for pic in all_pics:
        if(pic.profile == "yes"):
            profile_pic = pic
            return render_template('dashboard.html', all_users=all_users, user=user.User.get_info_by_id(data), profile=profile_pic, user_with_matches=user_with_matches)

    return render_template('dashboard.html', all_users=all_users, user=user.User.get_info_by_id(data), user_with_matches=user_with_matches)



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
    if not session:
        return redirect('/logout')
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
    # user_with_hearts = user.User.get_me_with_all_my_hearts(data1)
    all_pics = image.Photo.query.filter_by(user=id).all()


    if not all_pics:
        flash('This user has not uploaded any pics yet!', 'upload')
        return render_template('display_profile.html', user=user.User.get_info_by_id(data), attributes=attributes)
    
    for pic in all_pics:
        if(pic.profile == "yes"):
            profile_pic = pic
            return render_template('display_profile.html', user=user.User.get_info_by_id(data), pics=all_pics, profile=profile_pic, attributes=attributes)
        
    return render_template('display_profile.html', user=user.User.get_info_by_id(data), pics=all_pics, attributes=attributes)


@app.route('/sendheart/<int:id>')
def send_a_heart(id):
    if not session:
        return redirect('/logout')
    data = {
        'user_id': session['user_id'],
        'match_id': id
    }
    data1 = {
        'id': session['user_id']
    }
    if not user.User.send_heart(data):
        return redirect('/users/' + str(id))

    if user.User.check_if_we_match(data1):
        data2 = {
            'user_id': id
        }
        match = user.User.get_info_by_id(data2)
        return render_template('matched_up.html', match=match)

    return redirect('/users/' + str(id))


@app.route('/unsend/<int:id>')
def unsend_a_heart(id):
    if not session:
        return redirect('/logout')
    data = {
        'user_id': session['user_id'],
        'id': id
    }
    user.User.unsend_heart(data)

    return redirect('/dashboard')

@app.route('/users/inbox')
def inbox_folder():
    if not session:
        return redirect('/logout')
    data = {
        'user_id': session['user_id']
    }
    messages = user.User.get_all_messages_for_me(data)
    return render_template('inbox.html', messages=messages)


@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')
