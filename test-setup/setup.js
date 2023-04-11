import '@testing-library/jest-dom'
import { vi, beforeAll, beforeEach } from 'vitest'
import 'vi-fetch/setup'
import { prepareFetch,  mockFetch} from 'vi-fetch'

//@ts-ignore
global.fetch = vi.fn((url) => {
    return Promise.resolve({
        json: () => {
            console.log(`
            =======>
            =======>
            ${url}
            =======>
            =======>
            `)
            return Promise.resolve({})
        }
    })
})

beforeAll(()=>{
    prepareFetch(global, 'fetch')
})

beforeEach(()=>{
    mockFetch.clearAll();
})