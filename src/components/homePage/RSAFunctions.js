// RSA ENCRYPTION AND DECRYPTION FUNCTIONS
// String to Array Buffer function
function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

// Encryption function
export async function encryptMessage(message, publicKey, privateKey) {
    // For output
    let results = [];
    let incorrectKeyType = false;
    
    // Stringifying JSON object to be able to encrypt it
    let msg = JSON.stringify(message)
    // Console logging
    console.log(typeof (msg))
    console.log('msg: ', msg)
    // Encoding message
    let enc = new TextEncoder();
    let encoded = enc.encode(msg)
    // Console logging
    console.log('length of encoded, ', encoded)

    // Convert public key PEM to array buffer
    let binaryDerString = window.atob(publicKey);
    const binaryDer = str2ab(binaryDerString);
    // Console logging
    console.log('binaryDer Encryption', binaryDer)

    // Variable to store the imported public key
    let importedKeyPub;

    // Get the imported public key
    await window.crypto.subtle.importKey(
        "spki",
        binaryDer,
        {
            name: "RSA-OAEP",
            hash: { name: "SHA-256" }
        },
        true,
        ["encrypt"]
    // Result of import
    ).then(function (result) {
        importedKeyPub = result;
        // Console logging
        console.log('importedKeyPub', importedKeyPub)
    // Capturing any errors
    }).catch(function (error) {
        // Setting the state incorrectKeyType to true
        incorrectKeyType = true;
        console.log('error is', error);
    })

    // If the key exists (IS A VALID PUBLIC KEY)
    if (importedKeyPub) {
        // Encrypt using imported public key
        let ciphertext = await window.crypto.subtle.encrypt(
            {
                name: "RSA-OAEP"
            },
            importedKeyPub,
            encoded
        );
        // Console logging
        console.log('ciphertext', ciphertext);
        // Decrypt the message
        results = await decryptMessage(privateKey, incorrectKeyType, ciphertext);
    }
    else {
        console.log('No imported public key');
        results[0] = true;
        results[1] = false;
        results[2] = false;
    }

    // Returning the array of results - whether or not the key is a key, if it's valid, and if overall success
    return results;
}

export async function decryptMessage(privateKey, incorrectKeyType, ciphertext) {
    // Variables for later state usage
    let invalidKey = false;
    let success = false;

    // Convert public key PEM to array buffer
    let binaryDerString = window.atob(privateKey);
    const binaryDer = str2ab(binaryDerString);
    console.log('binaryDer Decryption', binaryDer)

    let importedKeyPriv;
    // Importing private key object
    await window.crypto.subtle.importKey(
        "pkcs8",
        binaryDer,
        {
            name: "RSA-OAEP",
            hash: { name: "SHA-256" }
        },
        true,
        ["decrypt"]
    // Capturing result of import
    ).then(function (result) {
        importedKeyPriv = result;
        // Console logging
        console.log('importedKeyPriv', importedKeyPriv)
    // Catching the error
    }).catch(function (error) {
        // Setting the incorrectKeyType to true
        incorrectKeyType = true;
        invalidKey = true;
        console.log('error is', error)
    })

    // If key is valid (NOT LYIN)
    if (importedKeyPriv) {
        let decrypted;
        // Decrypt using user inputted public key
        await window.crypto.subtle.decrypt(
            {
                name: "RSA-OAEP"
            },
            importedKeyPriv,
            ciphertext
        // Getting the result of decryption
        ).then(function (result) {
            decrypted = result;
            console.log('decrypted', decrypted)
        // Catching error
        }).catch(function (error) {
            incorrectKeyType = true;
            invalidKey = true;
            console.log(error.name)
        })

        // If decryption valid, set success to true and decode text
        if (decrypted) {
            success = true;
            let dec = new TextDecoder();
            // JSON.parse() used to change the decoded string to a JSON object
            let decoded = JSON.parse(dec.decode(decrypted));
            console.log(decoded);
        }
        else
            console.log('No decryption')
    }
    else
        console.log('No imported private key');
    // Return array of results
    return [incorrectKeyType, invalidKey, success];
}