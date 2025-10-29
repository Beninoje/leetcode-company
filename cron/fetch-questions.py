import requests
import json

# Raw URL of the JSON file on GitHub
url = "https://raw.githubusercontent.com/seanprashad/leetcode-patterns/main/src/data/questions.json"

# Fetch the file
response = requests.get(url)
if response.status_code == 200:
    data = response.json()
    print("✅ Fetched JSON successfully")
    
    # Optional: save it locally
    with open("questions.json", "w") as f:
        json.dump(data, f, indent=2)
        print("💾 Saved locally as questions.json")
else:
    print(f"❌ Failed to fetch JSON. Status code: {response.status_code}")


