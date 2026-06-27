import { usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

/**
 * Fires sonner toasts for conventional Laravel session flash messages
 * (`->with('success', ...)` / `->with('error', ...)`) shared via Inertia props.
 *
 * Runs inside a page-context layout so `usePage()` updates on every visit.
 */
export function useFlashMessages(): void {
    const { flash } = usePage().props;
    const lastShown = useRef<string>('');

    useEffect(() => {
        if (flash?.success && flash.success !== lastShown.current) {
            lastShown.current = flash.success;
            toast.success(flash.success);
        }

        if (flash?.error && flash.error !== lastShown.current) {
            lastShown.current = flash.error;
            toast.error(flash.error);
        }
    }, [flash?.success, flash?.error]);
}
