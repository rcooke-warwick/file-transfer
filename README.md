# file-block
**Block to simplify sending and receiving files from your balena device**


## Setup and configuration

Use this as standalone with the button below:

[![template block deploy with balena](https://balena.io/deploy.svg)](https://dashboard.balena-cloud.com/deploy?repoUrl=https://github.com/balenablocks/file-block)

Or add the following service to your `docker-compose.yml`:

```yaml
version: "2.1"
volumes:
  files:
services:
  template:
    restart: always
    image: ghcr.io/balena-io-playground/file-block:latest
    volumes:
      - 'files:/data'
    ports:
      - "80:3000"
```

> If you want to use a webserver exposing a public facing page, you will need to remove the exposed port 80

## Documentation

Head over to our [docs](https://balenablocks.io/file-block/docs/) for detailed installation and usage instructions, customization options and more!

## Motivation

This block has 2 endpoints, to allow you to send and receive files to and from a balena device. You must make sure that any service that you want to use with this block shares the `files` volume with it. 

To download files from your device using this block, move the files you want to retrieve into the `files` volume. 
You can then retreive a `.tar.gz` archive with all files in this volume using the `/download` endpoint of the block, for example:
```
curl DEVICE_URL/download --output files.tar.gz
```

To send files to the device, you must first create a `.tar.gz` archive with these files, for example:
```
tar -czvf files.tar.gz FOLDER_TO_UPLOAD/
```

then mae a POST to the `\upload` endpoint:
```
curl -X POST --data-binary @file.tar.gz DEVICE_URL/upload
```

## Getting Help

If you're having any problem, please [raise an issue](https://github.com/balenablocks/template/issues/new) on GitHub and we will be happy to help.

## Contributing

Do you want to help make balenablock-template better? Take a look at our [Contributing Guide](https://balenablocks.io/file-block/contributing). Hope to see you around!

## License

balenablock-template is free software, and may be redistributed under the terms specified in the [license](https://github.com/balenablockstemplate/blob/master/LICENSE).
