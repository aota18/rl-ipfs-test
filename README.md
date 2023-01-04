# Third Party API
- Moralis (web3 library)
- Cuttly[https://cutt.ly/] (URL Shortener)
    - email : redletter888@gmail.com
    - password : Redletter@2022
    - API Docs : https://cutt.ly/api-documentation/regular-api
- Cloudinary (Image manipulation over API)




# Local Development Environment

```
./cli/start.sh docker
```

This commands enable **React app** on `localhost:9090` and **Nodejs** on `localhost:9092`.
See `.env` for more config variable.

# Deploy on Production Server

1. build

```
./cli/build-local.sh web
```

2. Upload to AWS Instance

```
scp -i ~/.ssh/redletter-key.pem /Users/sangwonseo/Dev/red-letter/redletter-mono/.tmp-no-git-working/build/tmp/dist-backend/redletter-final.deb ubuntu@54.149.255.174:/home/ubuntu/app-dir/
```

3. Unpack deb file

```
$ sudo dpkg -i xxx.deb
```

4. manage process with pm2

```
$ sudo pm2 ps

$ sudo pm2 logs ..

$ sudo pm2 stop all

$ sudo pm2 restart all

```

# TODO

- DB Instance init
- env variable

```
/etc/redletter/.env
```

- pm2 restart all
