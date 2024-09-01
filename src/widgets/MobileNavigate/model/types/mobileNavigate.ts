import { SVGProps, VFC } from 'react';
import { IconTypeVariant } from '@/shared/ui/Icon';

export interface mobileNavigateItemType {
    path: string;
    text: string;
    Icon: VFC<SVGProps<SVGSVGElement>>;
    IconType: IconTypeVariant;
    authOnly?: boolean;
}
