// import React
import React, { useState, useEffect } from 'react';
// import styled
import styled from 'styled-components';

const Wrapper = styled.div`
    margin: 0 auto;
`
let publicKeyF, privateKeyF; 

function arrayBufferToBase64(arrayBuffer) {
    console.log('arrayBuffer', arrayBuffer);
    var byteArray = new Uint8Array(arrayBuffer);
    var byteString = '';
    for(var i=0; i < byteArray.byteLength; i++) {
        byteString += String.fromCharCode(byteArray[i]);
    }
    var b64 = window.btoa(byteString);

    return b64;
}

function addNewLines(str) {
    var finalString = '';
    while(str.length > 0) {
        finalString += str.substring(0, 64) + '\n';
        str = str.substring(64);
    }

    return finalString;
}

function toPem(privateKey) {
    var b64 = addNewLines(arrayBufferToBase64(privateKey));
    var pem = "-----BEGIN PRIVATE KEY-----\n" + b64 + "-----END PRIVATE KEY-----";
    
    return pem;
}

function toPemP(publicKey) {
    var b64 = addNewLines(arrayBufferToBase64(publicKey));
    var pem = "-----BEGIN PUBLIC KEY-----\n" + b64 + "-----END PUBLIC KEY-----";
    
    return pem;
}

function getMessageEncoding() {
    let message = JSON.stringify({"Hana":"Hana"});
    console.log('message, ', message)
    let enc = new TextEncoder();
    return enc.encode(message);
  }

async function encryptMessage(key1, key2) {
    let encoded = getMessageEncoding();
    let ciphertext = await window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP"
      },
      key1,
      encoded
    );

    console.log('ciphertext', ciphertext);

    decryptMessage(key2, ciphertext);
  }

async function decryptMessage(key, ciphertext) {
    let decrypted = await window.crypto.subtle.decrypt(
        {
        name: "RSA-OAEP"
        },
        key,
        ciphertext);
    let dec = new TextDecoder();
    let decoded = dec.decode(decrypted)
    console.log(decoded);
    console.log(JSON.parse(decoded))
}

function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

function importPublicKey(pem) {
    // base64 decode the string to get the binary data
    // fetch the part of the PEM string between header and footer
    const pemHeader = "-----BEGIN PUBLIC KEY-----";
    const pemFooter = "-----END PUBLIC KEY-----";
    let pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length)
    pemContents = pemContents.replace(/\s/g, '');
    console.log('pemContents:', pemContents)
    let binaryDerString = window.atob(pemContents);
    // convert from a binary string to an ArrayBuffer
    const binaryDer = str2ab(binaryDerString);
    console.log('binaryDer', binaryDer)

    window.crypto.subtle.importKey(
        "spki",
        binaryDer,
        {
            name: "RSA-OAEP",
            hash: { name: "SHA-256" }
        },
        true,
        ["encrypt"]
    ).then(function(result) {
        console.log('result', result)
        return result;
    }).catch(function(err) {
        console.log('err: ', err);
    })
}

// Let's generate the key pair first
window.crypto.subtle.generateKey(
    {
        name: "RSA-OAEP",
        modulusLength: 2048, // can be 1024, 2048 or 4096
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: {name: "SHA-256"} // or SHA-512
    },
    true,
    ["encrypt", "decrypt"]
).then(function(keyPair) {
    /* now when the key pair is generated we are going
       to export it from the keypair object in pkcs8
    */
    console.log(keyPair);

    encryptMessage(keyPair.publicKey, keyPair.privateKey);

    window.crypto.subtle.exportKey(
        "pkcs8",
        keyPair.privateKey
    ).then(function(exportedPrivateKey) {
        // converting exported private key to PEM format
        var pem = toPem(exportedPrivateKey);
        console.log(pem);
    }).catch(function(err) {
        console.log(err);
    });

    window.crypto.subtle.exportKey(
        "spki",
        keyPair.publicKey
    ).then(function(exportedPublicKey) {
        // converting exported private key to PEM format
        var pem = toPemP(exportedPublicKey);
        console.log(pem);
        let resultingKey = importPublicKey(pem)
        console.log('keyPairPublic: ', keyPair.publicKey)
        console.log('resultingKey: ', resultingKey)

    }).catch(function(err) {
        console.log(err);
    });
});


function CreatePage(props) {

    return(
        <Wrapper />
    )
}

export default CreatePage;