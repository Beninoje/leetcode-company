from anyio import Path
import requests
import json
import os
url = "https://raw.githubusercontent.com/seanprashad/leetcode-patterns/main/src/data/questions.json"

project_root = Path(__file__).parent.parent

# Path to the data directory
data_dir = project_root / "src" / "data"
data_dir.mkdir(parents=True, exist_ok=True)  # make sure the directory exists

# Full path to save the JSON file
save_path = data_dir / "questions.json"
    

response = requests.get(url)
if response.status_code == 200:
    data = response.json()
    print("✅ Fetched JSON successfully")
    
    # Optional: save it locally
    with open(save_path, "w") as f:
        json.dump(data, f, indent=2)
        print(f"💾 Saved locally as {save_path}")
else:
    print(f"❌ Failed to fetch JSON. Status code: {response.status_code}")


