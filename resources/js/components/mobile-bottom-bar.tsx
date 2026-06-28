import { Link } from '@inertiajs/react';
import { Instagram } from 'lucide-react';
import MaterialSymbol from '@/components/material-symbol';
import type { ContactDetails } from '@/types';

// Brand glyph for WhatsApp — lucide has no official WhatsApp mark, so we inline
// the logo path. Sized to match the surrounding 22px icons.
function WhatsAppIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width={21}
            height={21}
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 0 0 1.506 5.26l-.999 3.648 3.992-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
    );
}

// Translucent dark pill matching the brand's floating-action styling. White
// outline glyphs read on the dark fill in both light and dark themes.
const item =
    'flex flex-1 flex-col items-center justify-center gap-0.5 text-white/85 transition-colors hover:text-white active:text-white';

/**
 * Compact mobile-only action bar pinned to the bottom of the viewport. Mirrors
 * the floating contact bar from the brand reference — quick access to Home and
 * the primary contact channels. Hidden on md+ where the header nav and footer
 * already surface these.
 */
export default function MobileBottomBar({ contact }: { contact: ContactDetails }) {
    const instagram = contact.socials?.instagram;
    const whatsappUrl = contact.whatsapp_url;

    return (
        <nav
            aria-label="Quick contact"
            className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(8px+env(safe-area-inset-bottom))] md:hidden"
        >
            <div className="mx-auto flex max-w-md items-center justify-around gap-1 rounded-full border border-white/10 bg-neutral-900/90 px-1.5 py-2 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.55)] backdrop-blur-md">
                <Link href="/" className={item} aria-label="Home">
                    <MaterialSymbol name="home" size={22} />
                </Link>

                {contact.phone && (
                    <a
                        href={`tel:${contact.phone}`}
                        className={item}
                        aria-label="Call us"
                    >
                        <MaterialSymbol name="call" size={22} />
                    </a>
                )}

                {whatsappUrl && (
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={item}
                        aria-label="WhatsApp"
                    >
                        <WhatsAppIcon />
                    </a>
                )}

                {instagram && (
                    <a
                        href={instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={item}
                        aria-label="Instagram"
                    >
                        <Instagram size={21} />
                    </a>
                )}

                {contact.email && (
                    <a
                        href={`mailto:${contact.email}`}
                        className={item}
                        aria-label="Email us"
                    >
                        <MaterialSymbol name="mail" size={22} />
                    </a>
                )}
            </div>
        </nav>
    );
}
