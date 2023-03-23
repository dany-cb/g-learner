from flask import Flask, jsonify, request
from YTScraper import YTScraper
from main import Model

app = Flask(__name__)

model = Model()

@app.route('/',methods = ['POST'])
def login():
   if request.method == 'POST':
      data = request.get_json()
      print(data)
      keywords = "math probability normal distribution"
      keywords = data["keywords"]
      result = model.getRecommendations(gvn_keyword=keywords)
      print("result:",len(result))
      if (len(result)<3):
         scraper = YTScraper(keywords, 4-len(result))
         model.getRecommendations(data=scraper.get_video_data())
         result.extend([x["link"] for x in scraper.get_video_data()])
      return jsonify(result)

if __name__ == '__main__':
   app.run(port=5000, debug = True)