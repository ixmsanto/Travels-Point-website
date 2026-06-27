function Swatch({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="grid gap-1.5">
            <span className="text-[12.5px] text-faint">{label}</span>
            <div className="flex items-center gap-2 rounded-[11px] border border-border-strong bg-surface-2 p-1.5">
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="size-8 cursor-pointer rounded border-0 bg-transparent p-0"
                />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-24 bg-transparent text-sm uppercase outline-none"
                />
            </div>
        </div>
    );
}

export default function TintPicker({
    tint0,
    tint1,
    onChange,
}: {
    tint0: string;
    tint1: string;
    onChange: (field: 'tint0' | 'tint1', value: string) => void;
}) {
    return (
        <div className="grid gap-3">
            <span className="text-[13px] font-bold text-soft">Card gradient</span>
            <div className="flex flex-wrap items-end gap-4">
                <Swatch
                    label="From"
                    value={tint0}
                    onChange={(v) => onChange('tint0', v)}
                />
                <Swatch
                    label="To"
                    value={tint1}
                    onChange={(v) => onChange('tint1', v)}
                />
                <div
                    className="h-16 min-w-[120px] flex-1 rounded-[12px] border border-border"
                    style={{
                        backgroundImage: `linear-gradient(135deg, ${tint0}, ${tint1})`,
                    }}
                />
            </div>
        </div>
    );
}
