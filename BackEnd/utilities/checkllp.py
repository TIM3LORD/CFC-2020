import requests
import urllib.parse
baseUrl = "http://www.mca.gov.in/mcafoportal/cinLookup.do?companyname="
headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36'}
companyName = input("Enter company name to search for: ")
r = requests.post(baseUrl+urllib.parse.quote_plus(companyName), headers=headers)
print(r.text)