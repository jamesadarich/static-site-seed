# Static Site Seed
A start point for creating static sites

## Setup

### Environment Variables

SITE_DOMAIN - website domain e.g. example.com or www.something-else.co.uk
LETSENCRYPT_USERNAME - username (email) for letsencrypt certificate creation

--- optional ---

HTTP_PORT - website challenge/redirect port (default 80)
HTTPS_PORT - website exposed port (default 443)
GOOGLE_TAG_MANAGER_ID - google tag manager id

### Google Tag Manger / Analytics

Ensure you set your `GOOGLE_TAG_MANAGER_ID` environment variable, if you don't want it though it won't be included if you don't set the variable.
