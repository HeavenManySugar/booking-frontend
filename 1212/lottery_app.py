from flask import Flask, render_template
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/')
def lottery():
    try:
        url = 'https://www.taiwanlottery.com.tw/'
        html = requests.get(url)
        sp = BeautifulSoup(html.text, 'html.parser')

        data1 = sp.select("#rightdown")
        data2 = data1[0].find('div', {'class':'contents_box02'})
        data3 = data2.find_all('div', {'class':'ball_tx'})
        data = [data1, data2, data3]
        return render_template('lottery.html', data=data)
    except:
        return render_template('error.html')

if __name__ == '__main__':
    app.run()

