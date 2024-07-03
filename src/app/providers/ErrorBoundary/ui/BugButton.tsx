import { useEffect, useState } from 'react';
import { Button } from 'shared/ui/Button';
import { ButtonVariant } from 'shared/ui/Button/ui/Button';

// компонент для тестирования errorBoundary
export const BugButton = () => {
    const [error, setError] = useState(false);

    const throwError = () => {
        setError((prev) => !prev);
    };

    useEffect(() => {
        if (error) {
            throw new Error();
        }
    }, [error]);

    return (
        <Button
            variant={ButtonVariant.CLEAR}
            onClick={throwError}
            // eslint-disable-next-line i18next/no-literal-string
        >
            throw error
        </Button>
    );
};
