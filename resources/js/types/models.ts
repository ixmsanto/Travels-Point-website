export type Tinted = {
    tint0: string;
    tint1: string;
    img: string | null;
};

export type Destination = Tinted & {
    id: number;
    name: string;
    country: string;
    price: number;
    tag: string;
    blurb: string;
    is_featured: boolean;
    sort_order: number;
    created_at?: string;
    updated_at?: string;
};

/** Region name — admin-managed, so any string the admin defines. */
export type PackageRegion = string;

export type Region = {
    id: number;
    name: string;
    icon: string | null;
    sort_order: number;
    packages_count?: number;
    created_at?: string;
    updated_at?: string;
};

export type TourPackage = Tinted & {
    id: number;
    title: string;
    location: string;
    region: PackageRegion;
    duration: string;
    price: number;
    rating: number;
    services: string[];
    is_featured: boolean;
    sort_order: number;
    created_at?: string;
    updated_at?: string;
};

export type OfferStatus = 'Active' | 'Scheduled' | 'Expired';

export type Offer = Tinted & {
    id: number;
    title: string;
    discount: number;
    description: string;
    expiry: string;
    cta: string;
    cta_url: string;
    status: OfferStatus;
    featured: boolean;
    sort_order: number;
    created_at?: string;
    updated_at?: string;
};

export type Testimonial = Tinted & {
    id: number;
    name: string;
    location: string;
    rating: number;
    review: string;
    is_published: boolean;
    sort_order: number;
    created_at?: string;
    updated_at?: string;
};

export type BannerPlacement = 'Hero' | 'Strip';

export type Banner = Tinted & {
    id: number;
    title: string;
    subtitle: string;
    placement: BannerPlacement;
    active: boolean;
    video?: string | null;
    sort_order: number;
    created_at?: string;
    updated_at?: string;
};

export type InquiryStatus = 'New' | 'Replied' | 'Closed';

export type Inquiry = {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    destination: string | null;
    travel_date: string | null;
    message: string;
    status: InquiryStatus;
    created_at: string;
    updated_at: string;
};

export type GalleryItem = Tinted & {
    id: number;
    topic: string;
    category: string;
    is_published: boolean;
    sort_order: number;
    created_at?: string;
    updated_at?: string;
};

export type ContactDetails = {
    address: string;
    phone: string;
    email: string;
};
