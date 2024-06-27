import { classNames } from 'shared/lib/classNames/classNames';

describe('classNames', () => {
    test('with only one param', () => {
        expect(classNames('someClass')).toBe('someClass');
    });

    test('with additional classes', () => {
        const expected = 'someClass cls1 cls2';
        expect(classNames('someClass', {}, ['cls1', 'cls2'])).toBe(expected);
    });

    test('with mods', () => {
        const expected = 'someClass cls1 cls2 hover active focus';
        expect(
            classNames(
                'someClass',
                { hover: true, active: true, focus: true },
                ['cls1', 'cls2'],
            ),
        ).toBe(expected);
    });

    test('with mods and false', () => {
        const expected = 'someClass cls1 cls2 hover focus';
        expect(
            classNames(
                'someClass',
                { hover: true, active: false, focus: true },
                ['cls1', 'cls2'],
            ),
        ).toBe(expected);
    });

    test('with mods undefine', () => {
        const expected = 'someClass cls1 cls2 hover';
        expect(
            classNames(
                'someClass',
                { hover: true, active: false, focus: undefined },
                ['cls1', 'cls2'],
            ),
        ).toBe(expected);
    });
});
