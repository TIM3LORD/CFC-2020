import math
import requests

def distance(origin, destination):
    #Using the Haversine formula to calculate the distance between 2 lat long coords
    lat1, lon1 = origin
    lat2, lon2 = destination
    radius = 6371 # radius of the Earth in km

    dlat = math.radians(lat2-lat1)
    dlon = math.radians(lon2-lon1)
    a = math.sin(dlat/2) * math.sin(dlat/2) + math.cos(math.radians(lat1)) \
        * math.cos(math.radians(lat2)) * math.sin(dlon/2) * math.sin(dlon/2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    d = radius * c

    return d

def addressSearch(lat, long):
    baseUrl = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat="+str(lat)+"&lon="+str(long)+"&zoom=18&addressdetails=1"
    headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36'}
    r = requests.post(baseUrl, headers=headers)
    return r.text


# origin = (15.204619, 74.107013)
# destination = (15.302095, 73.957470)
# print(distance(origin,destination))

print(addressSearch(15.204619,74.107013))