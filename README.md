# Hotel Booking Frontend

## Features
- Introduction of the hotel
- Rservation of rooms
- Display of rooms
- RWD (Responsive Web Design)
- Dark Mode
- Preloader
- Scroll to Top


## Setup
> Please ensure you have PostgreSQL, Python, and Git installed (Python is in the path).

Configure your settings in config.yaml, and run the following commands:

```bash
git clone https://github.com/HeavenManySugar/booking-frontend.git
cd booking-frontend
pip install -r requirements.txt
python app.py
```

and then visit http://127.0.0.1:5000/ in your browser.

## Usage

- "Home" Tab - display homepage
- "Booking" Tab - reservation of rooms
- "Rooms" Tab - display of rooms
- "About" Tab - display of the information of the hotel

## Code Explanation

### File Structure
```
├─ app.py
├─ config.yaml
├─ requirements.txt
├─ static
│  ├─ css
│  │  ├─ about.css
│  │  ├─ booking.css
│  │  ├─ carousel.css
│  │  ├─ preloader.css
│  │  ├─ rooms-and-suites.css
│  │  ├─ style.css
│  │  └─ style_custom.css
│  │
│  ├─ images
│  │  ├─ ai_hotel.jpg
│  │  ├─ ai_hotel_building.jpg
│  │  ├─ ai_hotel_deluxe_room.jpg
│  │  ├─ ai_hotel_room.jpg
│  │  ├─ ai_hotel_single_room.jpg
│  │  ├─ bed.png
│  │  ├─ cat1.jpg
│  │  ├─ cat2.jpg
│  │  ├─ cat3.jpg
│  │  ├─ check-square.svg
│  │  ├─ favicon.ico
│  │  ├─ fitnessRoom1.jpg
│  │  ├─ fitnessRoom2.jpg
│  │  ├─ outdoorPool.jpg
│  │  ├─ saunaNBathroom1.jpg
│  │  ├─ saunaNBathroom2.jpg
│  │  └─ success.gif
│  │
│  └─ js
│     ├─ btn_top.js
│     ├─ color-modes.js
│     ├─ preloader.js
│     └─ stepper.js
│
└─ templates
   ├─ about.html
   ├─ booking.html
   ├─ index.html
   ├─ rooms.html
   ├─ success.html
   │
   └─ layout
      └─ base.html
```

### Flask

All the code is in app.py.


- configure the SQLAlchemy part
```python
# get config from config.yaml
with open('config.yaml', 'r') as f:
    config = yaml.safe_load(f.read())
    user = config['POSTGRESQL_ENV']['POSTGRES_USER']
    password = config['POSTGRESQL_ENV']['POSTGRES_PASSWORD']
    host = config['POSTGRESQL_ENV']['POSTGRES_HOST']
    port = config['POSTGRESQL_ENV']['POSTGRES_PORT']
    database = config['POSTGRESQL_ENV']['POSTGRES_DB']

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{user}:{password}@{host}:{port}/{database}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'YourSecretKey'

db = SQLAlchemy(app)
```

- configure tables for SQLalchemy
```python
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
```

- hard code rooms price
```python
rooms = {
    'Single Room': 100,
    'Deluxe Room': 200,
    'Suite': 300
}
```

- FlaskForm for booking
```python
class BookingForm(FlaskForm):
    guest_name = StringField('Guest Name', validators=[DataRequired()], description="Name")
    room_type = SelectField('Room Type', choices=room_price.keys(), validators=[DataRequired()], description="Room Type")
    check_in_date = DateField('Check-In Date', format='%Y-%m-%d', validators=[DataRequired()], description="Check-In Date")
    check_out_date = DateField('Check-Out Date', format='%Y-%m-%d', validators=[DataRequired()], description="Check-Out Date")
    contact_email = EmailField('Contact Email', validators=[DataRequired()], description="Email")
    contact_phone = TelField('Contact Phone', validators=[DataRequired()], description="Phone Number")
    submit = SubmitField('Book Now')
    def validate_check_in_date(self, field):
        if field.data >= self.check_out_date.data:
            raise ValidationError('Check-In Date must be earlier than Check-Out Date.')
```

- define routes and render htmls
```python
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

        total_days = (form.check_out_date.data - form.check_in_date.data).days
        total_price = total_days * room_price[form.room_type.data]
        
        new_booking = Booking(
            guest_id=new_guest.guest_id,
            room_type=form.room_type.data,
            check_in_date=form.check_in_date.data,
            check_out_date=form.check_out_date.data,
            total_price=total_price,
        )
        db.session.add(new_booking)
        db.session.commit()
        
        return render_template('success.html', form=form, total_price=total_price)
    return render_template('booking.html', form=form, room_price=room_price)

@app.route('/rooms')
def rooms():
    return render_template('rooms.html')

@app.route('/about')
def about():
    return render_template('about.html')
```
