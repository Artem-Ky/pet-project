const interfaceConst = 'interface';

module.exports = (componentName) => `import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './${componentName}.module.scss';
import { memo } from 'react';
import cnBind from 'classnames/bind'

${interfaceConst} ${componentName}Props {
    classNames?: string[];
}

export const ${componentName}:FC<${componentName}Props> = memo((props: ${componentName}Props) => {
    const { classNames = [] } = props;
    const { t } = useTranslation();
    const cn = cnBind.bind(cls);
    
    return (
        <div className={cn(cls.${componentName}, ...classNames.map(clsName => cls[clsName] || clsName))}>
           
        </div>
    );
});`;
