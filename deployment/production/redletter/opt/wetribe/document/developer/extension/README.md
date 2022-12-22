# Getting started

Wetribe is a platform service for everyone who wants to make their own mobile app, who wants to create thier extension for the people and who wants to be connected for every user on Wetribe.

This is a document page for the tribe owner, extension (tools) developer and anyone who wants to more deep about wetribe development.

## Tribe Owner

Tribe owner is a administrator of each tribe. Tribe owner owns the tribe and can edit the tribe information.

<b> Basic steps to get started</b>

1. Create a new account on wetribe.
2. Create a new tribe according to your preferrence.
    - (Optional) Create a new extension with extension tool.
3. Download your app and test it.

## Extension Tool Developer

Extension tool developer is a developer who can create the plug-in based app for anyone who wants to apply it on their tribe.

<b> How to Guides </b>

-   How to Create a Extension Tool.
-   How to apply OAuth authentication

# Extension

Any developer who wants to contribute our community can create their own extension and upload to our service.

## Upload Guide <br>

### 1. Get ready for your extension to upload

To upload your extension, these files are must be prepared: <br>

-   index.html (as an entry point)
-   manifest.json

```
In Package root folder
|
|-- index.html(entry)
|
|-- manifest.json (config file)
|
|-- (other files for production)
```

And this is an example for &nbsp;`manifest.json`:

```
{
    "domain": "com.wetribe.helloHTML",  // Domain name
    "version": "1.0.0",                 // Version Information
    "type": "html",                     // Extension Type
    "entry": "index.html",      // File name of enxtry point
    "covers": ["img/fire.png"], // Cover image file location
    "params": [                 // Parameters for extension
        {
            "keyType": "get",
            "keyName": "msg",
            "uiName": "Message",
            "dataType": "string",
            "example": "Hello World"
        },
        {
            "keyType": "get",
            "keyName": "fileType",
            "uiName": "File Type",
            "dataType": "select",
            "dataInfo": ["PDF", "PNG", "XML"],
            "example": "PDF"
        }
    ]
}
```

Detail properties of `manifest.json` would be documented soon. You can use this template for now.

<br>

### 2. Upload on Wetribe

If your extension is ready, Please go to [Extension page](http://wetribe.us/extension).

Follow these steps:

1. Click 'Create your extension'.
2. Write down your basic information of your extension.
3. On package, upload your <b>Packed Extension Zip</b>.

> If your extension was not packed, follow this instruction for the packing.

Then, click the Create button and it's done!

<br>

### 3. Check your Extension on Discover

If you successfully created your extension, please go to [Discover Page](http://wetribe.us/extension) and check your information is being shown correctly.

<br>

## Authentication with Wetribe

Some extensions might need authentication for their full access. Here's the guide how to integrate the auth feature with Wetribe.

### 1. Check your App ID

-   AppID : identify who use for wetribe mobile app integration service

<b>The method to check your App ID Will be announced later</b>

<br>

### 2. Call auth token

<br>

#### Webview <br><br>

With Javascript, can request to wetribe mobile app for user login.
On your script,

```
// Message Data to Call Auth
const msgData = {
    type: "AUTH",
    data: {
        appId: '<YOUR APP ID>'
    }
}

// Call Auth Event
window.ReactNativeWebView.postMessage(JSON.stringify(msgData));
```

Here's the example code to get the response from Native.

```
/* Wetribe onMessage handler function from Native */
function wetribeObserved (event) {
    const {type, data} = JSON.parse(event.data);

    // HANDLE DATA
}

/* Add EventListener */
window.addEventListener('message', wetribeObserved)

```

#### Web <br><br>

-   Base URL : `http://wetribe.io`
-   End Point :`/napi/latest/auth/user/info/current`
-   ## Query Params

```

```

### 3. Get token from the Response

```
/*
The Api Called Internally:
http://wetribe.io/napi/latest/auth/user/info/current?jtoken=[YOUR TOKEN]
*/

{"code": "000", "data": {"extra": {"expiresIn": "240h", "warn": "development version only", "whatIsInJWT": [Object]}, "jwt": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl93ZWJfeHh4Ijo4LCJncm91cElkIjoxMywiZXh0ZXJuQXBwSWQiOiJUQkQiLCJpYXQiOjE2NDU0OTYyODksImV4cCI6MTY0NjM2MDI4OX0.kW1BzxAwAuhf_uuqEiJbsCpQbI3llxmXhq6gFArlcwZrXPHtgphe2b8D449J3L_fbYcYt40o3lAn1w1g-JZGww"}}
```

### Full Example

```
<html>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <head>Webview Test</head>
    <body style="display: flex;
    flex-direction: column;
    justify-center: center;
    align-items: center;
    width: 100%;
    height: 50%;
    ">
        <p> <button id="btn">Login</button></p>
        Clicked:
        <div id="showMsg">No</div>
        <br/>
        Message:
        <div id="rnMsg"></div>
    </body>
    <script>
        const btn = document.getElementById('btn');
        btn.addEventListener('click', () => {
            const str = 'Yes';
            const target = document.getElementById('showMsg');
            target.innerHTML = str;

            const msgData = {
                type: "AUTH_REQUEST",
                data: "HELLO"
            }
            window.ReactNativeWebView.postMessage(JSON.stringify(msgData));
        });

          /* Wetribe onMessage handler function from Native */
    function wetribeObserved (event) {
        const {type, data} = JSON.parse(event.data);

        // HANDLE DATA
        const target = document.getElementById('rnMsg');
        target.innerHTML = data;
    }

    /* Add EventListener */
     window.addEventListener('message', wetribeObserved)
    </script>
</html>

```
