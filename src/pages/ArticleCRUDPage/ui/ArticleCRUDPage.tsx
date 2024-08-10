import { FC, memo } from 'react';
import cnBind from 'classnames/bind';
import { Page } from 'widgets/Page';
import { useParams } from 'react-router-dom';
import cls from './ArticleCRUDPage.module.scss';

interface ArticleCRUDPageProps {
    classNames?: string[];
}

const ArticleCRUDPage: FC<ArticleCRUDPageProps> = memo(
    (props: ArticleCRUDPageProps) => {
        const { classNames = [] } = props;
        const cn = cnBind.bind(cls);
        const { id } = useParams<{ id: string }>();
        const isEdit = Boolean(id);

        return (
            <Page classNames={[]}>{isEdit ? 'Edit page' : 'Create page'}</Page>
        );
    },
);

export default ArticleCRUDPage;
