import requests
from bs4 import BeautifulSoup
from config import NYT_API_KEY
from mongodb_config import articles_db, companies_db
from sentiment_analysis import analyze_all_articles
from datetime import datetime
from urllib.parse import quote


def get_info_nyt(company_name):
    urls = []
    headlines = []
    images = []
    snippets = []
    dates = []
    authors = []

    requestUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + \
        quote(company_name) + "&api-key=" + NYT_API_KEY

    try:
        page = requests.get(requestUrl).json()
    except requests.exceptions.RequestException as e:
        raise SystemExit(e)

    if (page['status'] == 'OK'):
        docs = page['response']['docs']

        for item in docs:
            if len(item['multimedia']) > 0:
                images.append('https://static01.nyt.com/' +
                              item['multimedia'][0]['url'])
            else:
                images.append('')

            if len(item['web_url']) > 0:
                urls.append(item['web_url'])
            else:
                urls.append('')

            if len(item['headline']) > 0:
                headlines.append(item['headline']['main'])
            else:
                headlines.append('')

            if len(item['snippet']) > 0:
                snippets.append(item['snippet'])
            else:
                snippets.append('')

            if len(item['pub_date']) > 0:
                date = datetime.strptime(
                    item['pub_date'][:10], "%Y-%m-%d").strftime("%B %d, %Y")
                dates.append(date)
            else:
                dates.append('')

            person = item['byline']['person']
            name = ''
            if len(person) > 0:
                if person[0]['firstname']:
                    name += person[0]['firstname']
                if person[0]['lastname']:
                    name += ' '
                    name += person[0]['lastname']
            authors.append(name)

    return urls, headlines, images, snippets, dates, authors


def get_all_articles(company_name):
    pairs = []

    print('\n\nsent a query to nyt for ' + company_name + '\n\n')

    urls, headlines, images, snippets, dates, authors = get_info_nyt(
        company_name)

    if urls and headlines and images and snippets and dates and authors:
        for i in range(len(urls)):
            article = get_article_data(urls[i])
            pairs.append({'url': urls[i], 'article': article, 'headline': headlines[i],
                          'image': images[i], 'snippet': snippets[i], 'date': dates[i], 'author': authors[i]})

        get_ratings(company_name, pairs)
    # if True:
    # else:
    #     print('\n\nfetched from database\n\n')

    #     article_doc = articles_db.find_one({'name': company_name})

    #     pairs = article_doc['pairs']

    # print('pairs = \n', pairs)


def get_ratings(company_name, pairs):
    print('\n\nsent a query to save to db for ' + company_name + '\n\n')

    ratings = analyze_all_articles(pairs)

    positives = []
    negatives = []

    if len(ratings) > 2:
        positives = ratings[:-3:-1]
        negatives = ratings[:2]

        for i in range(len(positives)):
            positives[i].pop('article', None)
            negatives[i].pop('article', None)

        companies_db.insert_one(
            {'name': company_name, 'positives': positives, 'negatives': negatives})


def get_article_data(url):

    paragraphs = []
    article = ''
    # length = 0
    # wordcount = 0
    try:
        page = requests.get(url)
    except requests.exceptions.RequestException as e:
        raise SystemExit(e)

    soup = BeautifulSoup(page.content, "html.parser")

    for item in soup.select('.StoryBodyCompanionColumn'):

        # print('-----------------------------------------------------------------------------------------------')
        for p_tag in item.find_all('p'):
            # print('second loop ran')
            text = p_tag.get_text()
            # length = length + len(text.split())
            # print('len of text =', len(text))
            paragraphs.append(text)
            # if 'Apple' in text:
            #     wordcount += 1
            # print('\n\n=============================================================\n Apple here \n=============================================================\n\n')

            # print(text)
        # print('mid len =', length)

    for p in paragraphs:
        article += p

    # print('===================================================\n\nfull article:\n\n', article)

    # print('final len =', length)
    # print()
    # print('word count =', wordcount)
    # print()

    # print('**************************************************************************************************')
    return article


def get_all_companies_articles():
    company_names = []
    with open('../CompanyNames.txt') as f:
        company_names = f.readlines()

    company_names = [x.rstrip('\n') for x in company_names]

    # print(company_names)
    for company in company_names:
        get_all_articles(company)


def test():
    print('\n\nfetched from database\n\n')

    article_doc = companies_db.remove("name")

    print(article_doc)
    # pairs = article_doc['pairs']

    # print('pairs = \n', pairs)

    # ster = quote('J.P. Morgan Chase & Co.')
    # print(type(ster))


if __name__ == "__main__":
    get_all_companies_articles()
    # get_all_articles('Apple')
    # test()
