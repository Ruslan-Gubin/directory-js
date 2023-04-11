import {beforeEach, describe, expect, it} from 'vitest';
import { localServerAddress, render } from '../../../../test-setup/test-utils';
import appConstants from '../../../app/constants/appConstants';


describe('header-link testing', () => {
    const currentHref = appConstants.routes.index
    const currentTextLink = 'Home'
    const currentClass = 'home-link'

    beforeEach(async () => {
        await import('../index');
        render(`<header-link 
        href="${currentHref}" 
        text="${currentTextLink}"
        class="${currentClass}"
        ></header-link>`)
    })

    it('Check the header-link component rendering DOM', () => {
        const element = document.querySelector('header-link')
        expect(element).toBeInTheDocument()
    })

    it('Check header-link component structure', () => {
        const shadow = document.querySelector('header-link').shadowRoot
        const element = shadow.querySelector('a')
        const href = element.href

        expect(shadow).not.toBeNull()
        expect(element).toBeInTheDocument()
        expect(document.querySelector('.'+currentClass)).toBeInTheDocument()
        expect(href).toEqual(`${localServerAddress}${appConstants.routes.index}`)
        expect(element.textContent).toEqual(currentTextLink)
    })

})