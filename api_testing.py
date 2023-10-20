import requests
import json
import unittest

from api.app import app


class TestFlaskAPI(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_predict_module(self):
        data = {
            'product_type': 'T-shirt Baselayer'  # Replace with the product type 
        }

        response = self.app.post('/predict', data=json.dumps(data), content_type='application/json')

        self.assertEqual(response.status_code, 200)  # Ensure the response status is 200 (OK)

        data = response.get_json()
        self.assertTrue('predicted_module' in data)
        self.assertTrue('total_smv' in data)
        self.assertTrue('max_smv' in data)
        self.assertTrue('min_smv' in data)

if __name__ == '__main__':
    unittest.main()
