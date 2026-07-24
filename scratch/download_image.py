import urllib.request

url = 'https://i.postimg.cc/tTV24RhD/win-11-4.png'
target_path = '01-Windows-ISO/win-11-4.png'

try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=10) as response:
        with open(target_path, 'wb') as out_file:
            out_file.write(response.read())
    print("Downloaded successfully to", target_path)
except Exception as e:
    print("Error downloading image:", str(e))
