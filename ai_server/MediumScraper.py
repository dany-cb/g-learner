from bs4 import BeautifulSoup as bs
from typing import List
import chromedriver_autoinstaller
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import requests
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import re
from selenium.common.exceptions import TimeoutException

class YTScraper:
    def __init__(self, keywords: str, no_vid:int):
        self.search_url = "https://medium.com/search?q=" + \
            "+".join(keywords.split())
        self.video_data = []
        self.no_vid = no_vid
        print(no_vid)
        # chromedriver_autoinstaller.install()
        self.driver = webdriver.Chrome()
        
        self.generate_video_data()

    def generate_video_data(self):
        self.driver.get(self.search_url)

        delay = 3
        try:
            WebDriverWait(self.driver, delay).until(EC.presence_of_element_located((By.TAG_NAME, 'article')))
            print("Page is ready!")
        except TimeoutException:
            print ("Loading took too much time!")

        videos = self.driver.find_elements(By.TAG_NAME,'article')
        print("len", len(videos))
        videos = videos[:self.no_vid]
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
