
const BACKEND_URL = import.meta.env.DEV ? 'http://localhost:4444/api' : process.env['BACKEND_SERVER']

export { BACKEND_URL }