from flask import Flask, render_template, request, jsonify
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

def main(query):
    ai = apiai.ApiAI(CLIENT_ACCESS_TOKEN)

    request = ai.text_request()

    request.lang = 'en'  # optional, default value equal 'en'

    request.session_id = my_id
    request.query = query

    response = request.getresponse().read().decode('UTF-8');jsonobj = json.loads(response);return jsonobj;

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('main.html')


@app.route('/process', methods=['POST'])
def _get_data():
	print("post received");
	#print(request.form)
	print('input:',request.form['name'])
	out = main(request.form['name'])
	print('output:',str(out['result']['fulfillment']['speech']))
	#print('output2:',str(out['result']['fulfillment']['messages']))
	if (out): return jsonify({'output' : str(out['result']['fulfillment']['speech'])})
	return jsonify({'error' : 'Missing data!'})


if __name__ == "__main__":
	app.run(debug=True, port=4790)