from flask import Flask, jsonify, request
from YTScraper import YTScraper
from main import Model

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
scraper = YTScraper()

@app.route('/',methods = ['POST'])
def login():
   if request.method == 'POST':
      data = request.get_json()

      # keywords = "math probability normal distribution"
      keywords = data["keywords"]
      result = model.getRecommendations(keywords)
      print("result:",result)
      if (len(result)<3):
         scraper.generate_video_data(keywords, 4-len(result))
         model.getRecommendations(data=scraper.get_video_data())
         result.extend([x["link"] for x in scraper.get_video_data()])
      return jsonify(result)

if __name__ == '__main__':
   app.run(port=5000, debug = True, host='0.0.0.0')
