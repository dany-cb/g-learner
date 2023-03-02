# from flask import Flask, jsonify, request
# from flask_restful import Api, Resource
# from YTScraper import YTScraper

# app = Flask(__name__)
# api = Api(app)


# class Crawler(Resource):
#     def post(self):
#         data = request.get_json()
#         print(data)
#         keywords = data["keywords"]
#         scraper = YTScraper(keywords.split())

#         return jsonify(scraper.get_video_data())
#     # def get(self):
#     #     args = request.args
#     #     print(args)
#     #     keywords = args["keywords"]
#     #     scraper = YTScraper(keywords.split())

#     #     return jsonify(scraper.get_video_data())


# api.add_resource(Crawler, "/")

# if __name__ == "__main__":
#     app.run(port=5000, debug=True)

from flask import Flask, jsonify, request
from YTScraper import YTScraper
app = Flask(__name__)

@app.route('/',methods = ['POST'])
def login():
   if request.method == 'POST':
      data = request.get_json()
      print(data)
      keywords = data["keywords"]
      
      scraper = YTScraper(keywords.split())

      return jsonify(scraper.get_video_data())

if __name__ == '__main__':
   app.run(port=5000, debug = True)