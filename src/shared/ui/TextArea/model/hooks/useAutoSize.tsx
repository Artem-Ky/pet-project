import {
    useEffect, useLayoutEffect, useRef, useState,
} from 'react';

import {
    INITIAL_SCROLL_LINE_HEIGHT,
    MAX_ROWS,
    PADDING_COMPENSATION,
} from '../constants/constants';

export const useAutoSize = (valueText: string, maxRows: number = MAX_ROWS) => {
    const [isOverflowAuto, setIsOverflowAuto] = useState(false);
    const [currentLineHeight, setCurrentLineHeight] = useState(
        INITIAL_SCROLL_LINE_HEIGHT,
    );
    const [currentScrollHeight, setCurrentScrollHeight] = useState(
        INITIAL_SCROLL_LINE_HEIGHT,
    );
    const [textAreaHeight, setTextAreaHeight] = useState('auto');

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const currentMaxHeightRef = useRef<number>(0);

    const currentMaxRows = maxRows ?? MAX_ROWS;

    useEffect(() => {
        if (!textAreaRef.current) return;

        const lineHeight = parseInt(
            getComputedStyle(textAreaRef.current)?.lineHeight,
            10,
        );
        const scrollHeight = textAreaRef.current?.scrollHeight;

        setCurrentLineHeight(lineHeight);
        setCurrentScrollHeight(scrollHeight);

        currentMaxHeightRef.current = lineHeight * currentMaxRows;
    }, [currentMaxRows, maxRows]);

    useLayoutEffect(() => {
        if (!textAreaRef.current) return;

        const { scrollHeight } = textAreaRef.current;
        const newHeight = scrollHeight - PADDING_COMPENSATION;

        const currentCountRows = Math.floor(newHeight / currentLineHeight);

        if (currentCountRows < currentMaxRows) {
            setTextAreaHeight(`${scrollHeight * 2}px`);
            setIsOverflowAuto(false);
        } else {
            setTextAreaHeight(`${currentMaxHeightRef.current}px`);
            setIsOverflowAuto(true);
        }
    }, [valueText, currentLineHeight, currentScrollHeight, currentMaxRows]);

    return {
        isOverflowAuto,
        setTextAreaHeight,
        textAreaHeight,
        textAreaRef,
    };
};
