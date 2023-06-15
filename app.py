from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # enable CORS

# Mock data
cards_data = {
    "data": [
        {
        "name": "Mixmax",
        "budget_name": "Software subscription",
        "owner_id": 1,
        "spent": {
            "value": 100,
            "currency": "SGD"
        },
        "available_to_spend": {
            "value": 1000,
            "currency": "SGD"
        },
        "card_type": "burner",
        "expiry": "9 Feb",
        "limit": 100,
        "status": "active"
        },
        {
        "name": "Quickbooks",
        "budget_name": "Software subscription",
        "owner_id": 2,
        "spent": {
            "value": 50,
            "currency": "SGD"
        },
        "available_to_spend": {
            "value": 250,
            "currency": "SGD"
        },
        "card_type": "subscription",
        "limit": 10,
        "status": "active"
        }
    ],
    'page': 1,
    'per_page': 10,
    'total': 100
}

@app.route('/cards', methods=['GET'])
def get_cards():
    page = request.args.get('page', default=1, type=int)
    search_term = request.args.get('search', default='', type=str)
    filter_type = request.args.get('filter', default='', type=str)

    local_data = cards_data['data'].copy()  # Create a copy of the data

    # Implement search
    if search_term:
        local_data = list(filter(lambda card: search_term.lower() in card['name'].lower(), local_data))
    
    # Implement filtering
    if filter_type:
        local_data = list(filter(lambda card: card['card_type'] == filter_type, local_data))

    # Implement pagination
    start_index = (page - 1) * cards_data['per_page']
    end_index = start_index + cards_data['per_page']
    paginated_data = local_data[start_index:end_index]

    response = {
        'data': paginated_data,
        'page': page,
        'per_page': cards_data['per_page'],
        'total': len(local_data)
    }

    return jsonify(response)

if __name__ == "__main__":
    app.run(port=5000)