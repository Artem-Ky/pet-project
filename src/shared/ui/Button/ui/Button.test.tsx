import { render, screen } from '@testing-library/react';
import { ComponentRender } from 'shared/lib/tests/componentRender/ComponentRender';
import { Button, ButtonVariant } from './Button';

describe('Button', () => {
    test('Test render', () => {
        // eslint-disable-next-line i18next/no-literal-string
        ComponentRender(<Button>Test</Button>);
        expect(screen.getByText('Test')).toBeInTheDocument();
    });

    test('Test Clear Theme', () => {
        // eslint-disable-next-line i18next/no-literal-string
        ComponentRender(<Button variant={ButtonVariant.OUTLINE}>Test</Button>);
        expect(screen.getByText('Test')).toHaveClass('outline');
        screen.debug();
    });
});
