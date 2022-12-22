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
