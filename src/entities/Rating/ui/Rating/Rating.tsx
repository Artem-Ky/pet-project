import {
    FC, memo, useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextAlign, TextSize } from '@/shared/ui/Text';
import { StarRating } from '@/shared/ui/StarRating';
import { Modal } from '@/shared/ui/Modal';
import { TextArea } from '@/shared/ui/TextArea';
import {
    Button,
    ButtonOutlineColor,
    ButtonSize,
    ButtonVariant,
} from '@/shared/ui/Button';
import { Drawer } from '@/shared/ui/Drawer';

interface RatingProps {
    classNames?: string[];
    title?: string;
    rate?: number;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
}

export const Rating: FC<RatingProps> = memo((props: RatingProps) => {
    const {
        classNames = [],
        title,
        feedbackTitle,
        hasFeedback,
        onCancel,
        onAccept,
        rate = 0,
    } = props;
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount);
            if (hasFeedback) {
                setIsModalOpen(true);
            } else {
                onAccept?.(selectedStarsCount);
            }
        },
        [hasFeedback, onAccept],
    );

    const acceptHandle = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandle = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <>
            <Text
                label={feedbackTitle}
                labelId="feedbackArea"
                align={TextAlign.CENTER}
            />
            <TextArea
                id="feedbackArea"
                value={feedback}
                onChange={setFeedback}
                placeholder={t('ваш отзыв...')}
                fullWidth
            />
        </>
    );

    return (
        <Card fullWidth classNames={classNames}>
            <VStack align="center" gap="8r" justify="center" fullHeight>
                <Text
                    title={starsCount ? t('Спасибо за оценку!') : title}
                    size={TextSize.XXL_TITLE}
                    align={TextAlign.CENTER}
                />
                <StarRating
                    selectedStars={starsCount}
                    size={40}
                    onSelect={onSelectStars}
                />
            </VStack>
            <BrowserView>
                <Modal isOpen={isModalOpen} lazy>
                    <VStack gap="16r" fullWidth>
                        {modalContent}
                        <HStack gap="16c" justify="end" fullWidth>
                            <Button
                                onClick={cancelHandle}
                                variant={ButtonVariant.OUTLINE}
                                size={ButtonSize.MEDIUM}
                                outlineColor={ButtonOutlineColor.Error}
                            >
                                {t('Закрыть')}
                            </Button>
                            <Button
                                onClick={acceptHandle}
                                variant={ButtonVariant.OUTLINE}
                                size={ButtonSize.MEDIUM}
                                outlineColor={ButtonOutlineColor.Success}
                            >
                                {t('Отправить')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} onClose={cancelHandle} lazy>
                    <VStack gap="16r" fullWidth>
                        {modalContent}
                        <HStack gap="16c" justify="end" fullWidth>
                            <Button
                                onClick={acceptHandle}
                                variant={ButtonVariant.OUTLINE}
                                size={ButtonSize.LARGE}
                                outlineColor={ButtonOutlineColor.Success}
                                fullWidth
                            >
                                {t('Отправить')}
                            </Button>
                        </HStack>
                    </VStack>
                </Drawer>
            </MobileView>
        </Card>
    );
});
