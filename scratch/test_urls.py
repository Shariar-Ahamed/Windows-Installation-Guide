import urllib.request
url = 'https://i.postimg.cc/tTV24RhD/win-11-4.png'
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    res = urllib.request.urlopen(req, timeout=5)
    print("Code:", res.getcode())
    print("Content-Type:", res.headers.get('Content-Type'))
    print("Length:", res.headers.get('Content-Length'))
    # Read a few bytes
    print("First 20 bytes:", res.read(20))
except Exception as e:
    print("Error:", str(e))
