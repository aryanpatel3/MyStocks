import requests
from bs4 import BeautifulSoup
import json
import os
import config

print(os.environ)

API_KEY = ''


# USING ONLY THE PARAGRAPHS THAT CONTAIN THE COMPANY NAME MIGHT BE A GOOD CHOICE

# ['https://www.nytimes.com/2020/08/20/business/dealbook/apple-two-trillion-market-value.html',
# 'https://www.nytimes.com/2020/08/14/technology/apple-app-store-epic-games-fortnite.html',
# 'https://www.nytimes.com/2020/08/19/technology/apple-2-trillion.html',
# 'https://www.nytimes.com/2020/08/25/technology/fortnite-creator-tim-sweeney-apple-google.html',
# 'https://www.nytimes.com/2020/08/13/technology/apple-fortnite-ban.html',
# 'https://www.nytimes.com/2020/08/04/technology/apple-schiller-marketing-executive-departure.html',
# 'https://www.nytimes.com/2020/08/07/technology/facebook-apple-gaming-app-store.html',
# 'https://www.nytimes.com/2020/08/26/technology/personaltech/tiktok-data-apps.html',
# 'https://www.nytimes.com/2020/07/28/technology/apple-app-store-airbnb-classpass.html',
#  'https://www.nytimes.com/2020/08/18/business/dealbook/tiktok-huawei-china.html']
# [1885, 1434, 1187, 1468, 1352, 586, 850, 1272, 1256, 1384]


def get_all_urls(query):
    urls = []
    word_counts = []

    requestUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + \
        query + "&api-key=" + API_KEY

    page = requests.get(requestUrl)

    docs = page.json()['response']['docs']

    for item in docs:
        urls.append(item['web_url'])
        word_counts.append(item['word_count'])
        print(item)

    print(urls)
    print(word_counts)
    return urls


def get_all_articles():
    articles = []
    urls = get_all_urls('apple')

    for url in urls:
        article = get_article_data(url)
        articles.append(article)


def get_article_data(url):
  # extract this one article first
  # https://www.nytimes.com/2020/08/20/business/dealbook/apple-two-trillion-market-value.html
    paragraphs = []
    length = 0
    wordcount = 0
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    for item in soup.select('.StoryBodyCompanionColumn'):
        # print('first loop ran')
        try:
            print('-----------------------------------------------------------------------------------------------')
            for p_tag in item.find_all('p'):
                # print('second loop ran')
                text = p_tag.get_text()
                length = length + len(text.split())
                # print('len of text =', len(text))
                if 'Apple' in text:
                    wordcount += 1
                    print('\n\n=============================================================\n Apple here \n=============================================================\n\n')
                paragraphs.append(text)
                print(text)
            print('mid len =', length)
        except:
            print('error occured')

    print('final len =', length)
    print('word count =', wordcount)


if __name__ == "__main__":
    if(API_KEY == ''):
        get_article_data(
            'https://www.nytimes.com/2020/08/20/business/dealbook/apple-two-trillion-market-value.html')
    else:
        get_all_urls('apple')

# print()

# URL = 'https://www.monster.ca/jobs/search/?q=Software-Developer&where=Waterloo__2C-Ontario'

# page = requests.get(URL)

# soup = BeautifulSoup(page.content, 'html.parser')

# results = soup.find(id='ResultsContainer')

# web_jobs = results.find_all(
#     'h2', string=lambda text: 'web developer' in text.lower())

# for job in web_jobs:
#     link = job.find('a')['href']
#     print(job.text.strip())
#     print(f'Apply here: {link}\n')

# job_elems = results.find_all('section', class_='card-content')

# for job_elem in job_elems:
#     # Each job_elem is a new BeautifulSoup object.
#     # You can use the same methods on it as you did before.
#     title_elem = job_elem.find('h2', class_='title')
#     company_elem = job_elem.find('div', class_='company')
#     location_elem = job_elem.find('div', class_='location')
#     if None in (title_elem, company_elem, location_elem):
#         continue
    # print(title_elem.text.strip())
    # print(company_elem.text.strip())
    # print(location_elem.text.strip())
    # print()
