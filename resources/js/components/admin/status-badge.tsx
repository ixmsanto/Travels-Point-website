import { cn } from '@/lib/utils';

const tones: Record<string, string> = {
    Active: 'bg-green-soft text-green-deep',
    Replied: 'bg-green-soft text-green-deep',
    Scheduled: 'bg-gold-soft text-gold',
    New: 'bg-primary-soft text-primary-deep',
    Hero: 'bg-primary-soft text-primary-deep',
    Strip: 'bg-gold-soft text-gold',
    Closed: 'bg-muted text-faint',
    Expired: 'bg-muted text-faint',
    Inactive: 'bg-muted text-faint',
};

export default function StatusBadge({ status }: { status: string }) {
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full px-[11px] py-1 text-[11.5px] font-bold',
                tones[status] ?? 'bg-muted text-faint',
            )}
        >
            {status}
        </span>
    );
}
