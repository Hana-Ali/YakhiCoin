// Function to change from array buffer to base 64
export function arrayBufferToBase64(arrayBuffer) {
    var byteArray = new Uint8Array(arrayBuffer);
    var byteString = '';
    for (var i = 0; i < byteArray.byteLength; i++) {
        byteString += String.fromCharCode(byteArray[i]);
    }
    var b64 = window.btoa(byteString);

    return b64;
}

// Function to add new lines every 64 characters
export function addNewLines(str) {
    var finalString = '';
    while (str.length > 0) {
        finalString += str.substring(0, 64) + '\n';
        str = str.substring(64);
    }

    return finalString;
}

// Function to convert to PEM - calls the arrayBuffertoBase64 function
export function toPem(privateKey) {
    return arrayBufferToBase64(privateKey);
}

// Function to convert to PEM - calls the arrayBuffertoBase64 function
export function toPemP(publicKey) {
    return arrayBufferToBase64(publicKey);
}
