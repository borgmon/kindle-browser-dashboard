# kindle-ha-dashboard
A HomeAssistant dashboard running on your kindle! (or any device that supports browser)

The website is based on pug, with purecss. AKA extremely tiny to run. NO js*. Optimized for e-ink devices.

*js only for refreshing the page with customizable intervals.

## Install
You will need a server to run this.
First clone the repo
```zsh
git clone https://github.com/borgmon/kindle-ha-dashboard
```
Then change the `docker-compose.dev.yml` to your liking.

The `HA_URL` should be `http://localhost:8123/api` or something

And run it!
```zsh
docker-compose up -d
```

## ENV Config
You can set `EXCLUDE_ENTITY` to blacklist entities you don’t want to add. Example: `light.basement_light,light.basement_door`

You can set `INTERVAL` to set the webpage refresh rate. default 1 min.

## Supported devices
Right now it only supports `['switch', 'light', 'climate', 'humidifier']`. There will be more in the future.

All kindles should be supported (unlike kindle-dash), because it's browser based.

## Do I need to jailbreak my kindle?
Depends. We use browsers here so no jailbreak features are needed. However you need to do some hacking to disable sleeping.

try this command in the search bar to disable screensaver. (many cases it doesn’t work anymore)
```
~ds
```

