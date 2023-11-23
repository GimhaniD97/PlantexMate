from flask import Flask, request, jsonify
import joblib
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from flask_cors import CORS  # Import CORS from flask_cors


app = Flask(__name__)
CORS(app, origins="*")


# Load the saved models
factory_model = joblib.load('factory_model.joblib')
team_model = joblib.load('team_model.joblib')
defect_model = joblib.load('defect_model.joblib')

# Load the data from the CSV file
df = pd.read_csv('Proddata.csv')

# Extract relevant features (Style) and target variables (Factory, Team, Defect)
X = df[['STYLE']]
y_factory = df['FACTORY']
y_team = df['TEAM']
y_defect = df['DefectName']

# One-hot encode the 'STYLE' column
column_transformer = ColumnTransformer(
    transformers=[('encoder', OneHotEncoder(), ['STYLE'])],
    remainder='passthrough'
)

X_encoded = column_transformer.fit_transform(X)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    style_to_predict = data['STYLE']

    # Move this line inside the predict function
    style_input = column_transformer.transform(pd.DataFrame({'STYLE': [style_to_predict]}))

    # Make predictions
    predicted_factory = factory_model.predict(style_input)[0]
    predicted_team = team_model.predict(style_input)[0]
    predicted_defect = defect_model.predict(style_input)[0]

    # Prepare the response
    response = {
        'STYLE': style_to_predict,
        'Predicted Best Factory': predicted_factory,
        'Predicted Team': predicted_team,
        'Predicted Most Common Defect': predicted_defect
    }

    return jsonify(response)

@app.after_request
def set_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'  # Allow Content-Type header
    return response

if __name__ == '__main__':
    app.run(port=5000, debug=True)
