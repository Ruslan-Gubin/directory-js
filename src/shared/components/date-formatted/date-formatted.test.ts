import { beforeEach, describe, expect, it } from 'vitest';
import { render } from '../../../../test-setup/test-utils';
import { dateFormat } from '../../libs/utils/constants/dateFormat';


describe('DateFormatted', () => {
    const currentDate = new Date()
    
    beforeEach(async () => {
      await import('./index')
      render(`<date-formatted date="${currentDate}"></date-formatted>`)
    })
    
    
    it('Check the component rendering DOM', () => {
      const element = document.querySelector('date-formatted')
        expect(element).toBeInTheDocument()
    })

    it('Check DateFormatted structure', () => {
      const shadow = document.querySelector('date-formatted').shadowRoot
      const element = shadow.querySelector('.date-formatted')
        expect(shadow).not.toBeNull()
        expect(element).toBeInTheDocument()
        expect(element.textContent).toEqual(dateFormat(`${currentDate}`))
    })
})