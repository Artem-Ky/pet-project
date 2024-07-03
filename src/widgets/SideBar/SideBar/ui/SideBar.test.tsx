import { fireEvent, screen } from '@testing-library/react';
// eslint-disable-next-line max-len
import { ComponentRender } from 'shared/lib/tests/componentRender/ComponentRender';
import { SideBar } from './SideBar';

describe('SideBar', () => {
    test('Test render sidebar', () => {
        ComponentRender(<SideBar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('Test toggle close/open', () => {
        ComponentRender(<SideBar />);
        const toggleBtn = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        fireEvent.click(toggleBtn);
        expect(screen.getByTestId('sidebar')).toHaveClass('Close');
    });
});
