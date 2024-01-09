# Hotel Management System

## Features


## Setup

> Please ensure you have PostgreSQL, Python, and Git installed (Python is in the path).

Configure your settings in config.yaml, and run the following commands:

```bash
git clone https://github.com/HeavenManySugar/booking-frontend.git
cd booking-frontend
pip install -r requirements.txt
python app.py
```

and then visit http://127.0.0.1:4999/ in your browser.

## Usage

- "Bookings" Tab - display list of bookings
- "Customers" Tab - display list of customers
- "Change Theme" Tab - change theme of the dashboard

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