import os.path
import sys
import uuid
from uuid import UUID
import json

try:
    import apiai
except ImportError:
    sys.path.append(
        os.path.join(os.path.dirname(os.path.realpath(__file__)), os.pardir)
    )
    import apiai

CLIENT_ACCESS_TOKEN = '226071ee70a84d7097454a21fe48a65b'

class UUIDEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, UUID):
            # if the obj is uuid, we simply return the value of uuid
            return obj.hex
        return json.JSONEncoder.default(self, obj)
		
my_id = json.dumps(uuid.uuid1(), cls=UUIDEncoder)
print('id=',my_id)

def main():
    ai = apiai.ApiAI(CLIENT_ACCESS_TOKEN)

    request = ai.text_request()

    request.lang = 'de'  # optional, default value equal 'en'

    request.session_id = my_id

    request.query = "Hello"

    response = request.getresponse()

    print (response.read())


if __name__ == '__main__':
	main()