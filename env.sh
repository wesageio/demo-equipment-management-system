#!/bin/sh
echo "window.env = {" > ./env-config.js
echo "'REACT_APP_ADMIN_API':'$REACT_APP_ADMIN_API'," >> ./env-config.js
echo "'REACT_APP_ADMIN_API_WEB_SOCKET':'$REACT_APP_ADMIN_API_WEB_SOCKET'," >> ./env-config.js
echo "}" >> ./env-config.js