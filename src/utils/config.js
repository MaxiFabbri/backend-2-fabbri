import * as url from 'url';

const config = {
    DIRNAME: url.fileURLToPath(new URL('..', import.meta.url)),

    get UPLOAD_DIR() {return `${this.DIRNAME}/public/uploads`},

    USERS_COLLECTION: 'users',
    CART_COLLECTION: 'carts',
    PRODUCTS_COLLECTION: 'products'

};

export default config;
