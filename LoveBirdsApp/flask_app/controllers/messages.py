from flask_app import app
from flask import render_template, redirect, request, session, flash, url_for, Response
from flask_app.models import user, message

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
    return render_template('new_message.html', receiver=receiver)

@app.route('/messages/process/<int:id>', methods=['POST'])
def process_message(id):
    if not session:
        return redirect('/logout')
    if not message.Message.validate_message(request.form):
        return redirect('/messages/new/' + str(id))
    message.Message.save_message(request.form)
    return redirect('/users/' + str(id))

@app.route('/messages/delete/<int:id>')
def delete_message(id):
    if not session:
        return redirect('/logout')
    data = {
        'id': id
    }
    message.Message.delete_message(data)
    return redirect('/users/inbox')