from flask_app import app
from flask import render_template, redirect, request, session, flash, url_for, Response
from flask_app.models import user, message, image

@app.route('/messages/new/<int:id>')
def new_message(id):
    if not session:
        return redirect('/logout')

    data1 = {
        'blocker_id': session['user_id'],
        'blocked_id': id
    }
    if user.User.check_if_im_blocked(data1):
        return redirect('/dashboard')

    data = {
        'user_id': id
    }
    receiver = user.User.get_info_by_id(data)
    data3 = {
        'user_id': session['user_id']
    }
    myId = session['user_id']

    all_pics = image.Photo.query.filter_by(user=myId).all()
    user1 = user.User.get_info_by_id(data3)
    if user1.suspended == "yes":
        return redirect('/suspended')
    for pic in all_pics:
        if(pic.profile == "yes"):
            profile_pic = pic
            return render_template('new_message.html', profile=profile_pic, receiver=receiver, user=user1)
    return render_template('new_message.html', receiver=receiver, user=user1)

@app.route('/messages/process/<int:id>', methods=['POST'])
def process_message(id):
    if not session:
        return redirect('/logout')
    if not message.Message.validate_message(request.form):
        return redirect('/messages/new/' + str(id))
    message.Message.save_message(request.form)
    myId = session['user_id']
    return redirect('/users/' + str(myId))

@app.route('/messages/delete/<int:id>')
def delete_message(id):
    if not session:
        return redirect('/logout')
    data = {
        'id': id
    }
    message.Message.delete_message(data)
    return redirect('/users/inbox')