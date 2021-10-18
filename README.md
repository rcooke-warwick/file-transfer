# file-transfer block
**Block to simplify sending and receiving files from your balena device**


## Setup and configuration

Use this as standalone with the button below:

[![template block deploy with balena](https://balena.io/deploy.svg)](https://dashboard.balena-cloud.com/deploy?repoUrl=https://github.com/rcooke-warwick/file-transfer)

Or add the following service to your `docker-compose.yml`:

```yaml
version: "2.1"
volumes:
  files:
services:
  file-transfer:
    restart: always
    image: ghcr.io/rcooke-warwick/file-transfer:latest
    volumes:
      - 'files:/data'
    ports:
      - "80:3000"
```

> If you want to use a webserver exposing a public facing page, you will need to remove the exposed port 80

## Documentation

This block has 2 endpoints, to allow you to send and receive files to and from a balena device. You must make sure that any service that you want to use with this block shares the `files` volume with it. 

### Downloading files from device

To download files from your device using this block, move the files you want to retrieve into the `download` directory in the `files` volume.
You can then retreive a `.tar.gz` archive with all files in this volume using the `/download` endpoint of the block, for example:

```bash
curl DEVICE_URL/download --output files.tar.gz
```

### Uploading files to your device

To send files to the device, you must first create a `.tar.gz` archive with these files, for example:

```bash
tar -czvf files.tar.gz FOLDER_TO_UPLOAD/
```

then make a POST to the `/upload` endpoint:

```bash
curl -X POST --data-binary @file.tar.gz DEVICE_URL/upload
```

Your files will then be available in the `upload` directory of the `files` volume.

## Getting Help

If you're having any problem, please [raise an issue](https://github.com/rcooke-warwick/file-transfer/issues/new) on GitHub and we will be happy to help.

## License

balenablock-template is free software, and may be redistributed under the terms specified in the [license](https://github.com/balenablockstemplate/blob/master/LICENSE).
