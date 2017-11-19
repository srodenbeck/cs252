import random
import requests
import json
from collections import Counter
import re
#import unirest

url = "https://wordsapiv1.p.mashape.com/words/"

def encrypt(inString,mode,amount):
    outString = ""
    inString = inString.lower()
    if (mode==0 or mode==1):
        if (amount==0):
            amount= random.randint(1,25)
        outString = add(inString,amount)
    elif (mode==2):
        outString = add(inString,1)
    elif (mode==3):
        if (amount==0 or amount < -1 or amount >= inString.__len__()):
            amount=2
        outString = swap(inString,amount)
    elif (mode==4):
        outString = reverse(inString)
    return outString

def add(inString,added):
    outString = ""
    for c in inString:
        i = added + ord(c)
        # print(i)
        if (c is ' ' or c < 'a' or c > 'z'):
            outString += c
        else:
            if (i > ord('z')):
                i -= 26
            elif (i < ord('a')):
                i += 26
            outString += chr(i)
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

def reverse(inString):
    words = inString.split(' ')
    outstring = ""
    for w in words:
        w=w[::-1]
        outstring+=w
        outstring+=" "
    return outstring

def swap(inString,amount):
    return ''.join([inString[x:x + amount][::-1] for x in range(0, len(inString), amount)])


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


def decrypt(inString,mode,key):
    inString = inString.lower()
    outstring = ""
    #unknown or caesar
    if (mode==1 or mode==0):
        #key known
        if key != 0:
            outstring = subtract(inString, key)
        #key not known
        else:
            likelyE = Counter("".join(re.findall("[a-z]+", inString))).most_common(5)
            key = ord(likelyE[0][0]) - ord('e')
            outstring = subtract(inString, key)
    #rot1
    elif (mode == 2):
        outstring = rot1(inString,1)
    #swap
    elif (mode == 3):
        outstring = swap(inString,key)
    #reverse
    elif (mode==4):
        outstring = reverse(inString)
    return outstring

toEncrypt = "reverse"
print("Original Message: "+toEncrypt)
#               string,mode,amount
enc = encrypt(toEncrypt,0,4)
print("Encrypted: "+enc)
#mode key: 0 = unknown; 1 = ceasar; 2=rot1; 3 = swap; 4 = reverse; 5 = monoalphabetic
#           string,mode,key
dec = decrypt(enc,0,0)
#if dec not validated && dec.len < 50 print try using a longer message
print("Decrypted: "+dec)
