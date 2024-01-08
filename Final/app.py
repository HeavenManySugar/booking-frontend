from flask import Flask, render_template, request, redirect, url_for, flash
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, DateField, SelectField, EmailField, TelField
from wtforms.validators import DataRequired, ValidationError

from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'YourSecretKey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/hotel'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Example room data (in a real application, this would come from a database)
room_type = [
    'Single Room',
    'Double Room',
    'Deluxe Room'
]

class Guest(db.Model):
    __tablename__ = 'guest'
    guest_id = db.Column(db.Integer, primary_key=True)
    guest_name = db.Column(db.String(255), nullable=False)
    contact_email = db.Column(db.String(255), nullable=False)
    contact_phone = db.Column(db.String(255), nullable=False)

class Booking(db.Model):
    __tablename__ = 'booking'
    booking_id = db.Column(db.Integer, primary_key=True)
    guest_id = db.Column(db.Integer, db.ForeignKey('guest.guest_id'), nullable=False)
    check_in_date = db.Column(db.Date, nullable=False)
    check_out_date = db.Column(db.Date, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    room_type = db.Column(db.String(255), nullable=False)

    guest = db.relationship('Guest', backref='booking')

class BookingForm(FlaskForm):
    guest_name = StringField('Guest Name', validators=[DataRequired()], description="Name")
    room_type = SelectField('Room Type', choices=room_type, validators=[DataRequired()], description="Room Type")
    check_in_date = DateField('Check-In Date', format='%Y-%m-%d', validators=[DataRequired()], description="Check-In Date")
    check_out_date = DateField('Check-Out Date', format='%Y-%m-%d', validators=[DataRequired()], description="Check-Out Date")
    contact_email = EmailField('Contact Email', validators=[DataRequired()], description="Email")
    contact_phone = TelField('Contact Phone', validators=[DataRequired()], description="Phone Number")
    submit = SubmitField('Book Now')
    def validate_check_in_date(self, field):
        if field.data >= self.check_out_date.data:
            raise ValidationError('Check-In Date must be earlier than Check-Out Date.')
        
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/booking', methods=['GET', 'POST'])
def booking():
    form = BookingForm()
    if form.validate_on_submit():
        new_guest = Guest(guest_name=form.guest_name.data, contact_phone=form.contact_phone.data,
                          contact_email=form.contact_email.data)
        db.session.add(new_guest)
        db.session.flush()  # Flush to get the ID of the new guest

        new_booking = Booking(
            guest_id=new_guest.guest_id,
            room_type=form.room_type.data,
            check_in_date=form.check_in_date.data,
            check_out_date=form.check_out_date.data,
            total_price=100.0,  # change this to calculate the total price based on room type
        )
        db.session.add(new_booking)
        db.session.commit()
        
        return redirect(url_for('index'))
    return render_template('booking.html', form=form)

@app.route('/rooms')
def rooms():
    return render_template('rooms.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/test')
def test():
    form = BookingForm()
    return render_template('test.html', form=form)

if __name__ == '__main__':
    app.run(debug=True)
