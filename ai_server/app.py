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
app.config['CORS_HEADERS'] = 'Content-Type'

@app.after_request
def after_request_func(response):
    # CORS section
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response
# end CORS section

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