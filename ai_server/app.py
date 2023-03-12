from flask import Flask, jsonify, request
from YTScraper import YTScraper
from main import Model
from selenium import webdriver
from bs4 import BeautifulSoup
import time
from selenium.webdriver.common.by import By
import urllib.parse

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.after_request
def after_request_func(response):
    # CORS section
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response
# end CORS section

model = Model()

@app.route('/',methods = ['POST'])
def login():
   if request.method == 'POST':
      data = request.get_json()

      # keywords = "math probability normal distribution"
      keywords = data["keywords"]
      result = model.getRecommendations(keywords)
      print("result:",result)
      if (len(result)<3):
         scraper = YTScraper(keywords, 4-len(result))
         model.getRecommendations(data=scraper.get_video_data())
         result.extend([x["link"] for x in scraper.get_video_data()])
      return jsonify(result)

# @app.route('/getMediumArticle',methods = ['POST'])
# def getMediumArticle():
#    if request.method == 'POST':
#       data = request.get_json()
#       keywords = data["keywords"]

#       # create a new Chrome browser instance
#       driver = webdriver.Chrome()

#       # navigate to the Medium homepage
#       driver.get('https://medium.com/search?q=' + urllib.parse.quote(keywords))

#       articles = driver.find_elements(By.TAG_NAME, 'article')
#       result = []
#       for article in articles:
#          # get the link to the article
#          link = article.find_element(By.CSS_SELECTOR, 'a').get_attribute('href')
         
#          # get the title of the article
#          title = article.find_element(By.CSS_SELECTOR, 'h2').text

#          # print the results
#          print('Link:', link)
#          print('Title:', title)
#          result.append({'link':link, 'title':title})
#       return jsonify(result)

if __name__ == '__main__':
   app.run(port=5000, debug = True)
