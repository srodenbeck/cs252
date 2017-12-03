import random
import requests
import json
from collections import Counter
import re

url = "https://wordsapiv1.p.mashape.com/words/"
@app.route("/encrypt", methods = ["POST"])
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
        #rotate every character by {added} i.e. if added = 4, 'a' becomes 'e'
        i = added + ord(c)
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
        #rotate every character backward by {key}
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
    #rotates every character up one (i.e. 'a' becomes 'b'
    return subtract(inString,key)

def reverse(inString):
    #reverse characters in every word in string
    words = inString.split(' ')
    outstring = ""
    for w in words:
        w=w[::-1]
        outstring+=w
        outstring+=" "
    return outstring

def swap(inString,amount):
    #switch every {amount} characters in string
    return ''.join([inString[x:x + amount][::-1] for x in range(0, len(inString), amount)])

#et tu, Brute?
def ceasarBrute(inString):
    #letters by frequency in english words:  etaoinshrdlcumwfgypbvkjxqz
    outstring = ""
    first = ""
    for c in "etaoinshrdlcumwfgypbvkjxqz":
        mostCommon = Counter("".join(re.findall("[a-z]+", inString))).most_common(5)
        key = ord(mostCommon[0][0]) - ord(c)
        outstring = subtract(inString, key)
        if c == 'e':
            first = outstring
        test = outstring.split(' ')
        urlTest = "{0}{1}/definitions".format(url, test[0])
        check = validate(urlTest)
        if (test.__len__()>=2):
            urlTest1 = "{0}{1}/definitions".format(url, test[1])
            check2 = validate(urlTest1)
            if (check == 200 and check2 == 200):
                return outstring
            elif ((check!=200 or check2!=200) and test.__len__()>=3):
                urlTest2 = "{0}{1}/definitions".format(url, test[2])
                check3 = validate(urlTest2)
                if check3 == 200:
                    return outstring
        else:
            if (check == 200):
                return outstring
    print("Your cipher may be unencryptable! Best guess is below :)")
    return first

def validate(urlTest):
    resp = requests.get(urlTest,
    headers={
        "X-Mashape-Key": "3xIPBh3pPrmshLyciGNwf1zWzEIHp1IumutjsnSKlkRXO606rS",
        "Accept": "application/json"})
    #200 if word found in dictionary; 404 otherwise
    return resp.status_code
@app.route("/decrypt",methods=["POST"])
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
            outstring = ceasarBrute(inString)
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

toEncrypt = "try words without fifth char"
print("Original Message: "+toEncrypt)#toEncrypt)
#               string,mode,amount
enc = encrypt(toEncrypt,1,0)
print("Encrypted: "+enc)
#mode key: 0 = unknown; 1 = ceasar; 2=rot1; 3 = swap; 4 = reverse; 5 = monoalphabetic
#           string,mode,key
dec = decrypt(enc,1,0)
print("Decrypted: "+dec)
