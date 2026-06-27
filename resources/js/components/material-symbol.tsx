import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

type Props = {
    /** Material Symbols Outlined ligature name, e.g. "flight", "luggage". */
    name: string;
    className?: string;
    /** Optical size in px (sets font-size). */
    size?: number;
    /** Weight axis (100–700). */
    weight?: number;
    /** Filled variant. */
    fill?: boolean;
    style?: CSSProperties;
};

/**
 * Renders a Material Symbols Outlined glyph. The icon font is loaded globally
 * via the <link> in app.blade.php and the `.ms` base class in app.css.
 */
export default function MaterialSymbol({
    name,
    className,
    size,
    weight,
    fill,
    style,
}: Props) {
    const axes: string[] = [];
    axes.push(`'opsz' 24`);

    if (fill) {
        axes.push(`'FILL' 1`);
    }

    if (weight) {
        axes.push(`'wght' ${weight}`);
    }

    return (
        <span
            aria-hidden="true"
            className={cn('ms', className)}
            style={{
                fontSize: size ? `${size}px` : undefined,
                fontVariationSettings: axes.join(', '),
                ...style,
            }}
        >
            {name}
        </span>
    );
}
