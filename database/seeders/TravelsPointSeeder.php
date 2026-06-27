<?php

namespace Database\Seeders;

use App\Models\Banner;
use App\Models\Destination;
use App\Models\GalleryItem;
use App\Models\Inquiry;
use App\Models\Offer;
use App\Models\Testimonial;
use App\Models\TourPackage;
use Illuminate\Database\Seeder;

class TravelsPointSeeder extends Seeder
{
    public function run(): void
    {
        Destination::query()->delete();
        TourPackage::query()->delete();
        Offer::query()->delete();
        Testimonial::query()->delete();
        Banner::query()->delete();
        GalleryItem::query()->delete();
        Inquiry::query()->delete();

        $destinations = [
            ['name' => 'Santorini', 'country' => 'Greece', 'price' => 1290, 'tag' => 'Island', 'blurb' => 'Whitewashed cliffs, caldera sunsets and the bluest Aegean.', 'tint0' => '#1769a8', 'tint1' => '#7cc4ea'],
            ['name' => 'Bali', 'country' => 'Indonesia', 'price' => 980, 'tag' => 'Tropical', 'blurb' => 'Emerald rice terraces, temple mornings and surf at dusk.', 'tint0' => '#1f7a55', 'tint1' => '#86c9a0'],
            ['name' => 'Dubai', 'country' => 'UAE', 'price' => 1450, 'tag' => 'City', 'blurb' => 'Desert dunes, sky-high views and gold-souk evenings.', 'tint0' => '#b07d2e', 'tint1' => '#f0c987'],
            ['name' => 'Maldives', 'country' => 'Indian Ocean', 'price' => 2190, 'tag' => 'Luxury', 'blurb' => 'Overwater villas above a warm, glass-clear lagoon.', 'tint0' => '#1690a8', 'tint1' => '#9fe0e8'],
            ['name' => 'Swiss Alps', 'country' => 'Switzerland', 'price' => 1680, 'tag' => 'Mountain', 'blurb' => 'Glacier railways, alpine lakes and storybook villages.', 'tint0' => '#46587a', 'tint1' => '#aebfd6'],
            ['name' => 'Kyoto', 'country' => 'Japan', 'price' => 1390, 'tag' => 'Culture', 'blurb' => 'Lantern lanes, bamboo groves and centuries-old shrines.', 'tint0' => '#8f4a60', 'tint1' => '#e3a9b6'],
        ];
        foreach ($destinations as $i => $row) {
            Destination::create($row + ['is_featured' => true, 'sort_order' => $i]);
        }

        $packages = [
            ['title' => 'Aegean Island Hopper', 'location' => 'Greece', 'region' => 'International', 'duration' => '8 Days · 3 Islands', 'price' => 2390, 'rating' => 4.9, 'services' => ['Flights', '4★ Hotels', 'Daily breakfast', 'Ferry passes'], 'tint0' => '#1769a8', 'tint1' => '#7cc4ea'],
            ['title' => 'Bali Beyond the Beaches', 'location' => 'Indonesia', 'region' => 'International', 'duration' => '6 Days · 5 Nights', 'price' => 1290, 'rating' => 4.8, 'services' => ['Villa stay', 'Private driver', 'Temple tours', 'Spa day'], 'tint0' => '#1f7a55', 'tint1' => '#86c9a0'],
            ['title' => 'Swiss Scenic Rail', 'location' => 'Switzerland', 'region' => 'International', 'duration' => '7 Days · 6 Nights', 'price' => 2790, 'rating' => 4.9, 'services' => ['Glacier Express', 'Lake cruises', 'Mountain passes', 'Breakfast'], 'tint0' => '#46587a', 'tint1' => '#aebfd6'],
            ['title' => 'Dubai Luxe Weekend', 'location' => 'UAE', 'region' => 'International', 'duration' => '4 Days · 3 Nights', 'price' => 1180, 'rating' => 4.7, 'services' => ['5★ Hotel', 'Desert safari', 'City tour', 'Transfers'], 'tint0' => '#b07d2e', 'tint1' => '#f0c987'],
            ['title' => 'Maldives Overwater', 'location' => 'Maldives', 'region' => 'International', 'duration' => '5 Days · 4 Nights', 'price' => 3290, 'rating' => 5.0, 'services' => ['Overwater villa', 'All-inclusive', 'Seaplane', 'Snorkel trip'], 'tint0' => '#1690a8', 'tint1' => '#9fe0e8'],
            ['title' => 'Kyoto & Tokyo Culture', 'location' => 'Japan', 'region' => 'International', 'duration' => '9 Days · 8 Nights', 'price' => 2980, 'rating' => 4.8, 'services' => ['Bullet train', 'Ryokan night', 'Guided shrines', 'JR Pass'], 'tint0' => '#8f4a60', 'tint1' => '#e3a9b6'],
            ['title' => 'Kerala Backwater Bliss', 'location' => 'Kerala', 'region' => 'India', 'duration' => '6 Days · 5 Nights', 'price' => 720, 'rating' => 4.8, 'services' => ['Houseboat stay', 'Munnar hills', 'Ayurveda spa', 'All transfers'], 'tint0' => '#1f7a55', 'tint1' => '#86c9a0'],
            ['title' => 'Goa Beaches & Heritage', 'location' => 'Goa', 'region' => 'India', 'duration' => '4 Days · 3 Nights', 'price' => 480, 'rating' => 4.6, 'services' => ['Beach resort', 'Old Goa tour', 'Cruise dinner', 'Breakfast'], 'tint0' => '#b07d2e', 'tint1' => '#f0c987'],
            ['title' => 'Royal Rajasthan Trail', 'location' => 'Rajasthan', 'region' => 'India', 'duration' => '8 Days · 7 Nights', 'price' => 1150, 'rating' => 4.9, 'services' => ['Heritage palaces', 'Desert camp', 'Jaipur & Udaipur', 'Guided forts'], 'tint0' => '#8f4a60', 'tint1' => '#e3a9b6'],
            ['title' => 'Himalayan Himachal', 'location' => 'Himachal Pradesh', 'region' => 'India', 'duration' => '7 Days · 6 Nights', 'price' => 690, 'rating' => 4.7, 'services' => ['Shimla & Manali', 'Volvo transfers', 'Snow point', 'Hill resort'], 'tint0' => '#46587a', 'tint1' => '#aebfd6'],
        ];
        foreach ($packages as $i => $row) {
            TourPackage::create($row + ['is_featured' => true, 'sort_order' => $i]);
        }

        $offers = [
            ['title' => 'Santorini Summer Escape', 'discount' => 30, 'description' => '5 nights cliffside in a caldera-view suite with a private sunset cruise.', 'expiry' => '2026-08-31', 'status' => 'Active', 'featured' => true, 'tint0' => '#1769a8', 'tint1' => '#7cc4ea'],
            ['title' => 'Bali Wellness Retreat', 'discount' => 25, 'description' => '7 nights with daily spa, sunrise yoga and private villa breakfasts.', 'expiry' => '2026-07-15', 'status' => 'Active', 'featured' => true, 'tint0' => '#1f7a55', 'tint1' => '#86c9a0'],
            ['title' => 'Maldives Honeymoon', 'discount' => 20, 'description' => 'Overwater villa, candlelit beach dinner and seaplane transfers included.', 'expiry' => '2026-09-30', 'status' => 'Active', 'featured' => false, 'tint0' => '#1690a8', 'tint1' => '#9fe0e8'],
            ['title' => 'Dubai City & Desert', 'discount' => 15, 'description' => '4 nights, dune safari, Burj Khalifa access and a marina dinner cruise.', 'expiry' => '2026-06-30', 'status' => 'Scheduled', 'featured' => false, 'tint0' => '#b07d2e', 'tint1' => '#f0c987'],
        ];
        foreach ($offers as $i => $row) {
            Offer::create($row + ['cta' => 'Book Now', 'cta_url' => '#', 'sort_order' => $i]);
        }

        $testimonials = [
            ['name' => 'Aarav & Meera S.', 'location' => 'Honeymoon · Maldives', 'rating' => 5, 'review' => 'From the seaplane to the overwater villa, every detail was handled. The most effortless trip we have ever taken.', 'tint0' => '#1690a8', 'tint1' => '#9fe0e8'],
            ['name' => 'Priya N.', 'location' => 'Family · Switzerland', 'rating' => 5, 'review' => 'Three generations, zero stress. The kids still talk about the glacier train. Travels Point thought of everything.', 'tint0' => '#46587a', 'tint1' => '#aebfd6'],
            ['name' => 'Daniel R.', 'location' => 'Group · Bali', 'rating' => 5, 'review' => 'Booked for twelve friends and it ran like clockwork — villas, drivers, dinners, all perfect.', 'tint0' => '#1f7a55', 'tint1' => '#86c9a0'],
            ['name' => 'Sofia & James', 'location' => 'Anniversary · Santorini', 'rating' => 5, 'review' => 'Our caldera suite at sunset was unreal. They upgraded us and remembered every little preference.', 'tint0' => '#1769a8', 'tint1' => '#7cc4ea'],
            ['name' => 'Hiroshi T.', 'location' => 'Solo · Kyoto', 'rating' => 5, 'review' => 'A beautifully paced cultural itinerary with just the right amount of freedom. Impeccable service throughout.', 'tint0' => '#8f4a60', 'tint1' => '#e3a9b6'],
        ];
        foreach ($testimonials as $i => $row) {
            Testimonial::create($row + ['is_published' => true, 'sort_order' => $i]);
        }

        $banners = [
            ['title' => 'Summer in the Cyclades', 'subtitle' => 'Greece · save up to 30%', 'placement' => 'Hero', 'active' => true, 'tint0' => '#1769a8', 'tint1' => '#7cc4ea'],
            ['title' => 'Monsoon Bali Deals', 'subtitle' => 'Indonesia · villas from $140/nt', 'placement' => 'Hero', 'active' => false, 'tint0' => '#1f7a55', 'tint1' => '#86c9a0'],
            ['title' => 'Festive Dubai', 'subtitle' => 'Strip banner · Dec campaign', 'placement' => 'Strip', 'active' => true, 'tint0' => '#b07d2e', 'tint1' => '#f0c987'],
        ];
        foreach ($banners as $i => $row) {
            Banner::create($row + ['sort_order' => $i]);
        }

        $gallery = [
            ['topic' => 'Caldera sunset, Oia', 'category' => 'Greece', 'tint0' => '#1769a8', 'tint1' => '#7cc4ea'],
            ['topic' => 'Rice terraces at dawn', 'category' => 'Bali', 'tint0' => '#1f7a55', 'tint1' => '#86c9a0'],
            ['topic' => 'Desert dunes at golden hour', 'category' => 'Dubai', 'tint0' => '#b07d2e', 'tint1' => '#f0c987'],
            ['topic' => 'Overwater villa morning', 'category' => 'Maldives', 'tint0' => '#1690a8', 'tint1' => '#9fe0e8'],
            ['topic' => 'Glacier express window', 'category' => 'Switzerland', 'tint0' => '#46587a', 'tint1' => '#aebfd6'],
            ['topic' => 'Lantern lanes of Gion', 'category' => 'Kyoto', 'tint0' => '#8f4a60', 'tint1' => '#e3a9b6'],
            ['topic' => 'Bamboo grove walk', 'category' => 'Japan', 'tint0' => '#3c7a52', 'tint1' => '#a7d8b4'],
            ['topic' => 'Marina skyline cruise', 'category' => 'UAE', 'tint0' => '#1a5a8c', 'tint1' => '#7fb6dd'],
        ];
        foreach ($gallery as $i => $row) {
            GalleryItem::create($row + ['is_published' => true, 'sort_order' => $i]);
        }

        $inquiries = [
            ['name' => 'Rohan Mehta', 'email' => 'rohan@example.com', 'phone' => '+91 98200 11223', 'destination' => 'Maldives', 'travel_date' => '2026-10-12', 'message' => 'Looking for an overwater villa for our anniversary in October. Around 6 nights, all-inclusive.', 'status' => 'New'],
            ['name' => 'Lisa Wong', 'email' => 'lisa.w@example.com', 'phone' => '+65 8123 4455', 'destination' => 'Swiss Alps', 'travel_date' => '2026-12-20', 'message' => 'Family of 5, would love the glacier rail trip over the winter holidays.', 'status' => 'Replied'],
            ['name' => 'Carlos Diaz', 'email' => 'carlos@example.com', 'phone' => '+34 612 998 221', 'destination' => 'Bali', 'travel_date' => '2026-09-05', 'message' => 'Group of 10 for a 30th birthday, mid budget, want villas close together.', 'status' => 'New'],
            ['name' => 'Fatima Noor', 'email' => 'fatima@example.com', 'phone' => '+971 50 222 7788', 'destination' => 'Dubai', 'travel_date' => '2026-11-02', 'message' => 'Corporate offsite for 25 people, need flights, hotel and an evening event.', 'status' => 'Closed'],
        ];
        foreach ($inquiries as $row) {
            Inquiry::create($row);
        }
    }
}
