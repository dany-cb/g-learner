from requests_html import HTMLSession
from bs4 import BeautifulSoup as bs
from typing import List
import chromedriver_autoinstaller
from selenium import webdriver
from selenium.webdriver.common.by import By
import json
import requests
import re

class YTScraper:
    def __init__(self, keywords: List[str]):
        self.search_url = "https://www.youtube.com/results?search_query=" + \
            "+".join(keywords)
        self.video_data = []
        chromedriver_autoinstaller.install()
        self.driver = webdriver.Chrome()
        
        self.generate_video_data()

    def __retrieve_desc_from_link(self, video_link):
        soup = bs(requests.get(video_link).content, 'html.parser')
        pattern = re.compile('(?<=shortDescription":").*(?=","isCrawlable)')
        description = pattern.findall(str(soup))[0].replace('\\n','\n')
        # self.driver.execute_script("window.open('about:blank', 'secondtab');")
        # self.driver.switch_to.window("secondtab")
        # time.sleep(3)
        # self.driver.get(video_link)
        # description = self.driver.find_element(By.ID, 'description-inner')

        if description:
            return description
        return ""

    def __generate_soup(self, url):
        self.driver.get(url)
        html = self.driver.page_source
        
        soup = bs(html,'html.parser')
        return soup

    # def __generate_soup(self, url):
    #     source = requests.get(url).text
    #     soup = bs(source, "html.parser")
    #     return soup

    def generate_video_data(self):
        soup = self.__generate_soup(self.search_url)
        videos = self.driver.find_elements(By.XPATH,'//*[@id="contents"]/ytd-video-renderer')
        print("len", len(videos))
        videos = videos[:1]
        for video in videos:
            vid_link = video.find_element("id", 'video-title').get_attribute("href")
            self.driver.switch_to.window(self.driver.window_handles[0])
        
            self.video_data.append({
                "title": video.find_element(By.ID, "video-title").text.strip(),
                "link": vid_link,
                "duration": video.find_element(By.ID, "text").get_attribute("innerText").strip(),
                "description": self.__retrieve_desc_from_link(vid_link)
            })
            

    def get_video_data(self):
        return self.video_data
    
    def __del__(self):
        self.driver.close()


# scraper = YTScraper(
#     "sampling-distribution statistics central-limit-theorem density-curves probability sample-mean mean".split())

# print(scraper.get_video_data())
