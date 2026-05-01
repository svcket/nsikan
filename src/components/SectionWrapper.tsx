import { forwardRef, ReactNode, ElementType, Ref } from 'react';
import { isSectionEnabled, type SectionId } from '@/config/sections';
import { cn } from '@/lib/utils';

export interface SectionWrapperProps {
    id: SectionId;
    children: ReactNode;
    className?: string;
    as?: ElementType;
}

export const SectionWrapper = forwardRef(function SectionWrapper(
    {
        id,
        children,
        className,
        as: Component = 'section',
    }: SectionWrapperProps,
    ref: Ref<any>
) {
    // Check registry if this section should be rendered
    const enabled = isSectionEnabled(id);

    if (!enabled) {
        return null;
    }

    return (
        <Component
            ref={ref}
            id={id.replace('.', '-')}
            data-section={id}
            className={cn('w-full relative', className)}
        >
            {children}
        </Component>
    );
});
