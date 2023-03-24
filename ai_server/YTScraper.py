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
from selenium.webdriver.chrome.options import Options


class YTScraper:
    def __init__(self):
    
        # chromedriver_autoinstaller.install()

        # CHROMEDRIVER_PATH = '/usr/local/bin/chromedriver'
        # WINDOW_SIZE = "1920,1080"
        # chrome_options = Options()
        # chrome_options.add_argument("--headless")
        # chrome_options.add_argument("--window-size=%s" % WINDOW_SIZE)
        # chrome_options.add_argument('--no-sandbox')
        # prefs = {"profile.managed_default_content_settings.images": 2}
        # chrome_options.add_experimental_option("prefs", prefs)
        # self.driver = webdriver.Chrome(executable_path=CHROMEDRIVER_PATH, options=chrome_options)
        
        CHROMEDRIVER_PATH = '/usr/local/bin/chromedriver'
        options = Options()
        options.headless = True

        chrome_options = webdriver.ChromeOptions()
        # this will disable image loading
        chrome_options.add_argument('--blink-settings=imagesEnabled=false')
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--window-size=%s" % "640,480")
        chrome_options.add_argument('--no-sandbox')
        # or alternatively we can set direct preference:
        chrome_options.add_experimental_option("prefs", {"profile.managed_default_content_settings.images": 2})
        self.driver = webdriver.Chrome(executable_path=CHROMEDRIVER_PATH, options=options, chrome_options=chrome_options)

        

    def __retrieve_desc_from_link(self, video_link):
        soup = bs(requests.get(video_link).content, 'html.parser')
        pattern = re.compile('(?<=shortDescription":").*(?=","isCrawlable)')
        description = pattern.findall(str(soup))[0].replace('\\n','\n')

        if description:
            return description
        return ""

    def generate_video_data(self, keywords: str, no_vid:int):
        self.search_url = "https://www.youtube.com/results?search_query=" + \
            "+".join(keywords.split())
        self.video_data = []
        self.no_vid = no_vid
        print(no_vid)
        self.driver.get(self.search_url)

        delay = 3
        try:
            myElem = WebDriverWait(self.driver, delay).until(EC.presence_of_element_located((By.ID, 'contents')))
            print("Page is ready!")
        except TimeoutException:
            print ("Loading took too much time!")

        videos = self.driver.find_elements(By.XPATH,'//*[@id="contents"]/ytd-video-renderer')
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
