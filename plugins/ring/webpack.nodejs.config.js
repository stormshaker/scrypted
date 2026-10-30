const path = require('path');
const defaultConfig = require(process.env.SCRYPTED_DEFAULT_WEBPACK_CONFIG);

// external/ring-client-api (koush/ring) locks @eneris/push-receiver at 4.3.0, which
// cuts the FCM crypto-key header with slice(3). FCM now sends "dh=KEY; p256ecdsa=SIG",
// so the signature stays on the key and every push fails with
// ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY. 4.3.1 parses the header by name.
// Remove this, and the dependency, once the submodule carries 4.3.1 (koush/ring#6).
defaultConfig.resolve.alias['@eneris/push-receiver'] = path.resolve(__dirname, 'node_modules/@eneris/push-receiver');

module.exports = defaultConfig;
