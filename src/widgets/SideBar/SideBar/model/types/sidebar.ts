import { SVGProps, VFC } from 'react';
import { IconTypeVariant } from 'shared/ui/Icon';

export interface SideBarItemType {
    path: string;
    text: string;
    Icon: VFC<SVGProps<SVGSVGElement>>;
    IconType: IconTypeVariant;
    authOnly?: boolean;
}
