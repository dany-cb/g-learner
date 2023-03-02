from requests_html import HTMLSession
from bs4 import BeautifulSoup as bs
from typing import List


class YTScraper:
    def __init__(self, keywords: List[str]):
        self.search_url = "https://www.youtube.com/results?search_query=" + \
            "+".join(keywords)
        self.video_data = []
        self.generate_video_data()

    def __retrieve_desc_from_link(self, video_link):
        # get description of video from video link
        soup = self.__generate_soup(video_link)
        description = soup.find("div", id="description")

        if description:
            description = description.find(
                "span", class_="yt-core-attributed-string yt-core-attributed-string--white-space-pre-wrap")
            if description:
                return description.contents[0].strip()
        return ""

    def __generate_soup(self, url):
        session = HTMLSession()
        response = session.get(url)
        response.html.render(sleep=1, scrolldown=1, timeout=60)
        # response.html.render(scrolldown=1, timeout=60)
        soup = bs(response.html.html, "html.parser")
        return soup

    def generate_video_data(self):
        soup = self.__generate_soup(self.search_url)
        videos = soup.find_all('ytd-video-renderer',
                               class_="style-scope ytd-item-section-renderer")
        videos = videos[:1]
        for video in videos:
            vid_link = "https://www.youtube.com" + \
                video.find("a", id="video-title")["href"]
            self.video_data.append({
                "title": video.find("a", id="video-title").text.strip(),
                "link": vid_link,
                "img_link": video.find("img", class_="yt-core-image--fill-parent-height yt-core-image--fill-parent-width yt-core-image yt-core-image--content-mode-scale-aspect-fill yt-core-image--loaded")["src"],
                "duration": video.find("span", id="text").contents[0].strip() if video.find("span", id="text") else "",
                "description": self.__retrieve_desc_from_link(vid_link),
            })

    def get_video_data(self):
        return self.video_data


# scraper = YTScraper(
#     "sampling-distribution statistics central-limit-theorem density-curves probability sample-mean mean".split())

# print(scraper.get_video_data())
