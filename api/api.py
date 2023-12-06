from flask import Flask, request, jsonify
import joblib
import pandas as pd
from collections import Counter
from flask_cors import CORS  # Import CORS from flask_cors


app = Flask(__name__)
CORS(app, origins="*")

# Load the trained models
model_factory = joblib.load('model_factory.joblib')
model_team = joblib.load('model_team.joblib')

# Load the relevant data from CSV files
proddata = pd.read_csv("proddata.csv")
defectdata = pd.read_csv("defectdata.csv")

# Define the '/predict' endpoint
@app.route('/predict', methods=['POST'])
def predict():
    # Get input data from the request
    input_data = request.get_json()

    # Extract relevant features from the input data
    customer_input = input_data.get('CUSTOMER')
    style_family_input = input_data.get('STYLE_FAMILY')

    # Filter proddata based on customer and style family
    filtered_proddata = proddata[(proddata['CUSTOMER'] == customer_input) & 
                                 (proddata['STYLE FAMILY'] == style_family_input)]
    
    print(filtered_proddata)

    if not filtered_proddata.empty:
        # Get 'Quantity' from defectdata
        quantity_feature = defectdata[defectdata['STYLE'] == filtered_proddata['STYLE'].values[0]]['Quantity'].values[0]

        # Assuming 'LC. EFF' and 'C OUT EFF' are relevant features in proddata
        features_for_prediction = pd.DataFrame({
           'C OUT EFF': filtered_proddata['C OUT EFF'].values[0],
           'LC. EFF': filtered_proddata['LC. EFF'].values[0],
           'Quantity': quantity_feature
        }, index=[0])

        # Use the trained models for predictions
        # Only include the features used during training
        features_for_prediction = features_for_prediction[['Quantity']]

        predicted_factory = model_factory.predict(features_for_prediction)
        predicted_team = model_team.predict(features_for_prediction)

        # Find the most common defect name for the selected style
        selected_style = filtered_proddata['STYLE'].values[0]
        filtered_defectdata_style = defectdata[defectdata['STYLE'] == selected_style]
        most_common_defect = Counter(filtered_defectdata_style['DefectName']).most_common(1)[0][0]

        # Prepare the response
        response = {
            'Predicted_Factory': predicted_factory[0],
            'Predicted_Team': predicted_team[0],
            'Most_Common_Defect': most_common_defect
            # Add other relevant information to the response as needed
        }

        return jsonify(response)
    else:
        return jsonify({'error': 'No data matching the specified criteria'})

@app.after_request
def set_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'  # Allow Content-Type header
    return response

# Run the application
if __name__ == '__main__':
    app.run(debug=True)
