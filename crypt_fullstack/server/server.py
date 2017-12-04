# server.py
from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin
from PyDictionary import PyDictionary
dictionary=PyDictionary()

import random
# import requests
import json
from collections import Counter
import re

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
#CORS(app)

url = "https://wordsapiv1.p.mashape.com/words/"
CORS(app, resources=r'/https://wordsapiv1.p.mashape.com/words/*');


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/hello")
def hello():
    return "Hello World!"


@app.route("/encrypt", methods = ["GET"])
# def encrypt(inString,mode,amount):
def encrypt():
    inString = request.args.get('arg1')
    mode = request.args.get('arg2')
    amount = request.args.get('arg3')

    strd = inString.decode("windows-1252")
    inString = strd.encode("utf8")
    strd = mode.decode("windows-1252")
    mode = strd.encode("utf8")
    mode = int(mode);
    strd = amount.decode("windows-1252")
    amount = strd.encode("utf8")
    amount = int(amount);

    # print(validate(inString))

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

        # urlTest = "{0}{1}/definitions".format(url, test[0])
        # check = validate(urlTest)
        check = validate(test[0]);

        if (test.__len__()>=2):
            # urlTest1 = "{0}{1}/definitions".format(url, test[1])
            # check2 = validate(urlTest1)
            check2 = validate(test[1])
            if (check  and check2):
                return outstring
            elif ((not check or not check2) and test.__len__()>=3):
                # urlTest2 = "{0}{1}/definitions".format(url, test[2])
                # check3 = validate(urlTest2)
                check3 = validate(test[2])
                if check3:
                    return outstring
        else:
            if (check):
                return outstring
    print("Your cipher may be unencryptable! Best guess is below :)")
    return first


def validate(word):
    diction = dictionary.meaning(word);
    return isinstance(diction, dict);


@app.route("/decrypt",methods=["GET"])
#def decrypt(inString,mode,key):
def decrypt():

    inString = request.args.get('arg1')
    mode = request.args.get('arg2')
    key = request.args.get('arg3')

    strd = inString.decode("windows-1252")
    inString = strd.encode("utf8")
    strd = mode.decode("windows-1252")
    mode = strd.encode("utf8")
    mode = int(mode);
    strd = key.decode("windows-1252")
    key = strd.encode("utf8")
    key = int(key);

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

# toEncrypt = "try words without fifth char"
# print("Original Message: "+toEncrypt)#toEncrypt)
# #               string,mode,amount
# enc = encrypt(toEncrypt,1,0)
# print("Encrypted: "+enc)
# #mode key: 0 = unknown; 1 = ceasar; 2=rot1; 3 = swap; 4 = reverse; 5 = monoalphabetic
# #           string,mode,key
# dec = decrypt(enc,1,0)
# print("Decrypted: "+dec)


if __name__ == "__main__":
    app.run()
