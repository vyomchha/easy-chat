import os.path
import sys
import uuid

try:
    import apiai
except ImportError:
    sys.path.append(
        os.path.join(os.path.dirname(os.path.realpath(__file__)), os.pardir)
    )
    import apiai

CLIENT_ACCESS_TOKEN = '8b95d7fdfe574e6786e9642bdd793f37'


def main():
    ai = apiai.ApiAI(CLIENT_ACCESS_TOKEN)

    request = ai.text_request()

    request.lang = 'de'  # optional, default value equal 'en'

    request.session_id = uuid.uuid1()

    request.query = "Hello"

    response = request.getresponse()

    print (response.read())


if __name__ == '__main__':
	main()