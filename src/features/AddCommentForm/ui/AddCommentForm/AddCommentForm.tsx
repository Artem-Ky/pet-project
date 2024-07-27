import { FC, memo, useCallback } from 'react';
import cnBind from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button';
import { ButtonSize, ButtonVariant } from 'shared/ui/Button/ui/Button';
import { TextArea } from 'shared/ui/TextArea';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    addCommentFormActions,
    addCommentFormReducer,
} from '../../model/slices/addCommentFormSlice';
import {
    getAddCommentFormError,
    getAddCommentFormText,
} from '../../model/selectors/AddCommentFormSelectors';
import cls from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
    classNames?: string[];
    onSendComment: (comment: string) => void;
}

const AddCommentForm: FC<AddCommentFormProps> = memo(
    (props: AddCommentFormProps) => {
        const { classNames = [], onSendComment } = props;
        const cn = cnBind.bind(cls);
        const { t } = useTranslation();
        const dispatch = useAppDispatch();
        const comment = useSelector(getAddCommentFormText) || '';
        const error = useSelector(getAddCommentFormError);

        const handleCommentChange = useCallback(
            (value: string) => {
                dispatch(addCommentFormActions.setText(value));
            },
            [dispatch],
        );

        const onSendHnadler = useCallback(
            () => {
                onSendComment(comment);
                handleCommentChange('');
            },
            [handleCommentChange, onSendComment, comment],
        );

        const reducerList: ReducersList = {
            addCommentForm: addCommentFormReducer,
        };

        return (
            <DynamicModuleLoader reducers={reducerList} removeAfterUnmount>
                <div
                    className={cn(
                        cls.AddCommentForm,
                        ...classNames.map((clsName) => cls[clsName] || clsName),
                    )}
                >
                    <label className="sr-only" htmlFor="comment">
                        {t('Введите текст комментария')}
                    </label>
                    <TextArea
                        fullWidth
                        id="comment"
                        placeholder="ваш комментарий..."
                        value={comment}
                        onChange={handleCommentChange}
                    />
                    <Button
                        classNames={[cls.addCommentButton]}
                        variant={ButtonVariant.OUTLINE}
                        size={ButtonSize.LARGE}
                        onClick={onSendHnadler}
                    >
                        {t('отправить')}
                    </Button>
                </div>
            </DynamicModuleLoader>
        );
    },
);

export default AddCommentForm;
