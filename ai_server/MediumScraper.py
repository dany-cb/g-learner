from selenium import webdriver
from bs4 import BeautifulSoup
import time
from selenium.webdriver.common.by import By

# create a new Chrome browser instance
driver = webdriver.Chrome()

# navigate to the Medium homepage
driver.get('https://medium.com/search?q=nice')

articles = driver.find_elements(By.TAG_NAME, 'article')

for article in articles:
    # get the link to the article
    link = article.find_element(By.CSS_SELECTOR, 'a').get_attribute('href')
    
    # get the title of the article
    title = article.find_element(By.CSS_SELECTOR, 'h2').text

    # print the results
    print('Link:', link)
    print('Title:', title)
   

driver.quit()
