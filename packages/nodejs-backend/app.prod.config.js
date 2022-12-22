'use strict';

module.exports = {
  apps: [
    {
      name: 'wt-node-api-daemon',
      script:
        'cd /opt/redletter/source/backend-bundle && /usr/bin/node dist/main',
      env: {
        // NODE_ENV: 'production', will be loaded from env file /opt/rtplatform/.env
        NODE_BACKEND_PORT: 9090, // used for enginx
        ENV_FILE_DIR: '/etc/redletter',
      },
      restart_delay: 5000,
    },
  ],
};
