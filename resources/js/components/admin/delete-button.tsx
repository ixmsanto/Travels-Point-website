import { router } from '@inertiajs/react';
import { useState } from 'react';
import MaterialSymbol from '@/components/material-symbol';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

type Props = {
    /** Route to issue the DELETE request to. */
    action: string;
    /** Human label of the record, shown in the confirmation copy. */
    label: string;
    /** Optional custom trigger; defaults to a destructive icon button. */
    trigger?: React.ReactNode;
};

export default function DeleteButton({ action, label, trigger }: Props) {
    const [open, setOpen] = useState(false);
    const [processing, setProcessing] = useState(false);

    const onConfirm = () => {
        setProcessing(true);
        router.delete(action, {
            preserveScroll: true,
            onFinish: () => {
                setProcessing(false);
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ?? (
                    <button
                        type="button"
                        aria-label={`Delete ${label}`}
                        className="flex size-[34px] items-center justify-center rounded-[9px] border border-border-strong bg-surface-2 text-destructive transition hover:-translate-y-px hover:border-destructive hover:bg-destructive/10"
                    >
                        <MaterialSymbol name="delete" size={18} />
                    </button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete “{label}”?</DialogTitle>
                    <DialogDescription>
                        This action can’t be undone. The record will be
                        permanently removed.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={processing}
                    >
                        {processing ? 'Deleting…' : 'Delete'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
