import random
import requests
import json
from collections import Counter
import re
import unirest


url = "https://wordsapiv1.p.mashape.com/words/"
added = 0
def encrypt(inString):
    inString = inString.lower()
    global added
    added= 1#random.randint(1,25)
    #print(added)
    #print(inString)
    outString = ""
    for c in inString:
        i = added+ord(c)
        #print(i)
        if (c is ' ' or c < 'a' or c > 'z'):
            outString+=c
        else:
            if (i > ord('z')):
                i -= 26
            elif (i < ord('a')):
                i+=26
            outString+=chr(i)
    return outString

def subtract(inString,key):
    outstring = ""
    for c in inString:
        i = ord(c) - key
        if (c is ' ' or c < 'a' or c > 'z'):
            outstring += c
        else:
            if (i < ord('a')):
                i += 26
            elif (i > ord('z')):
                i -= 26
            outstring += chr(i)
    return outstring

def rot1(inString,key):
    return subtract(inString,key)

#def reverse(inString):


#def ceasar(inString,key):

def validate(decrypted):
    resp = requests.get("https://wordsapiv1.p.mashape.com/words/example/definitions")
    #print(resp.status_code)
    if (resp.ok):
        jformat = json.loads(resp.content)
        print("the response contains {0} properties".format(len(jformat)))
        print("\n")
        for key in jformat:
            print(key+" : "+jformat[key])
    else:
        resp.raise_for_status()
    print(requests.get(url+"example"))


def decrypt(inString,key, mode):
    inString = inString.lower()
    outstring = ""
    #key known
    if key >= 1:
        outstring = subtract(inString,key)
    else:
        if (mode != 0):
            if (mode == 1):
                outstring = rot1(inString,1)
            #elif (mode==4):
                #outstring = reverse(inString)

        else:#Ceaser Cipher
            likelyE = Counter("".join(re.findall("[a-z]+",inString))).most_common(5)
            key = ord(likelyE[0][0])-ord('e')
            print(likelyE)
            #print(key)
            outstring = subtract(inString,key)
            #TODO: should validate with Words API
            #if not validated, try other common letters
            #if mode says want a ceaser cipher try brute force

        #TODO: monoalphabetic cipher

        #TODO: reverse

        #TODO: swap every two letters

        #TODO: vignere cipher
    return outstring

toEncrypt = "lead beat"
print("Original Message: "+toEncrypt)
enc = encrypt(toEncrypt)
print("Encrypted: "+enc)
#mode key: 0 = unknown; 1 = ceasar; 2=rot1; 3 = swap; 4 = reverse; 5 = monoalphabetic
dec = decrypt(enc,0,0)
#if dec not validated && dec.len < 50 print try using a longer message
print("Decrypted: "+dec)


