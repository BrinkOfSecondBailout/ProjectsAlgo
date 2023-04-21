from flask_app import app
from flask import render_template, redirect, request, session, flash, url_for, Response
from flask_app.models import user, attribute


@app.route('/attributes/new')
def new_attributes():
    return render_template('new_attributes.html')

@app.route('/attributes/create', methods=['POST'])
def create_attributes():
    if not session:
        return redirect('/logout')
    if not attribute.Attribute.validate_attribute(request.form):
        return redirect('/attributes/new')
    data = {
        'description': request.form['description'],
        'age': request.form['age'],
        'gender': request.form['gender'],
        'smoker': request.form['smoker'],
        'drinker': request.form['drinker'],
        'dating_goal': request.form['dating_goal'],
        'hobbies': request.form['hobbies'],
        'body_type': request.form['body_type'],
        'user_id': session['user_id'],
    }
    attribute.Attribute.save_attribute(data)
    return redirect('/users/edit')