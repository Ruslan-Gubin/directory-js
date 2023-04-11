import {beforeEach, describe, expect, it} from 'vitest';
import { render } from '../../../../test-setup/test-utils';



describe('input-search testing', () => {
    const currentSearch = 'test-input';

    beforeEach(async () => {
        await import('../index');
        render(`<input-search value="${currentSearch}"></input-search>`)
    })

    it('Check the input-search component rendering DOM', () => {
      const shadow = document.querySelector('input-search').shadowRoot
        const element = shadow.querySelector('.input-search')
        expect(element).toBeInTheDocument()
    })

    // it('Check input-search component structure', () => {
    //     const shadow = document.querySelector('input-search').shadowRoot
    //     const element = shadow.querySelector('.input-search')
    //     const value = element.getAttribute('value')
    //     element.textContent = currentSearch 

    //     expect(element.textContent).toBe('test-input')
    //     expect(shadow).not.toBe('test-input')
    //     // expect(element).toBeInTheDocument()
    //     // expect(document.querySelector('.'+currentClass)).toBeInTheDocument()
    //     // expect(href).toEqual(`${localServerAddress}${appConstants.routes.index}`)
    //     // expect(element.textContent).toEqual(currentTextLink)
    // })

})