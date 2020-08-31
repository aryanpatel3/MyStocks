import json
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_watson.natural_language_understanding_v1 import Features, SentimentOptions
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from config import URL, IMB_API_KEY

# Authentication via IAM
authenticator = IAMAuthenticator(IMB_API_KEY)
service = NaturalLanguageUnderstandingV1(
    version='2019-07-12',
    authenticator=authenticator)
service.set_service_url(URL)


def analyze(text):
    response = service.analyze(
        text=text,
        features=Features(sentiment=SentimentOptions())).get_result()

    return response


def analyze_all_articles(pairs):
    ratings = []
    valid = True

    for item in pairs:
        article = item['article']
        if len(article) > 0:
            response = analyze(article)
            item["score"] = response['sentiment']['document']['score']
        else:
            item["score"] = 0

        ratings.append(item)
        # print('\n' + json.dumps(response, indent=2) + '\n')

    ratings.sort(key=comparision)
    return ratings


def comparision(response):
    return response['score']


# analyze_all_articles('Apple is the best company ever')

# print(json.dumps(response, indent=2))
