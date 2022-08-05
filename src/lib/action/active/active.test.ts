import { render, screen } from "@testing-library/svelte";
import Active from './Active.test.svelte'

describe('Test action/active', async () => {
    it('should give the action class to the correct link', async () => {
        render(Active);

        let activeLink = screen.getByText('Active');
        expect(activeLink).toHaveClass('active');
        
        let inactiveLink = screen.getByText('Inactive');
        expect(inactiveLink).not.toHaveClass('active');
    })
})