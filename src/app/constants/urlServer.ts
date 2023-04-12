const renderServer = 'https://web-compomponents.onrender.com/api';

const BACKEND_URL = import.meta.env.DEV ? 'http://localhost:4444/api' : renderServer

export { BACKEND_URL }