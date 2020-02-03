---
path: "/docs/install-with-kurl/setup-tls-certs"
date: "2020-02-03"
weight: 13
linktitle: "TLS Certificates"
title: "Setting up TLS Certificates"
---

After kurl install has completed, you'll be prompted to setup the KOTS Admin Console by directing your browser to `http://<ip>:8800`.   Only after initial install you'll be presented a warning page:
<br><br><br>
![tls-certs-insecure](/tls-certs-insecure.png)

The page prompts you through a first-time setup of the TLS certificates.  Kurl installed unsigned TLS certificates which may be used by default.  Alternatively, you may choose upload your own signed TLS certificates.  In either case, follow the links to continue setup. 

The next page is the setup TLS certs page:
<br><br><br>
![tls-certs-setup](/tls-certs-setup.png)

To stay with the pre-installed unsigned TLS cert, click "skip & continue".  Otherwise upload your signed TLS certificates as describe on this page.  The hostname is an optional field.  You may also specify the hostname and use the default certificates.  In either case specifying a hostname will embed it into the kotsadm-tls secret and its used to redirect your browser to the specified host.  

Once you complete this process then you'll no longer be presented this page when logging into the KOTS Admin console.  If you direct your browser to `http://<ip>:8800` you'll always be redirected to `https://<ip>:8800`.  
    
## Uploading new TLS Certs

If you want to upload new TLS certificates, you must run this command to re-add the ability to upload new TLS certificates:

`kubectl -n default annotate secret kotsadm-tls acceptAnonymousUploads=1`

<span style="color:red">**Warning: adding this annotation opens the door for anyone to upload TLS certificates.**</span>

Then direct your browser to `http://<ip>:8800` and run through the upload process as described above.  Its best to complete this process as soon as possible to avoid anyone uploading a TLS cert.  
<br><br><br>