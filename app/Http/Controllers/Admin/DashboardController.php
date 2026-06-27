<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\Destination;
use App\Models\Inquiry;
use App\Models\Offer;
use App\Models\Testimonial;
use App\Models\TourPackage;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'activeOffers' => Offer::where('status', 'Active')->count(),
                'destinations' => Destination::count(),
                'newInquiries' => Inquiry::where('status', 'New')->count(),
                'packages' => TourPackage::count(),
                'testimonials' => Testimonial::count(),
                'banners' => Banner::count(),
            ],
            'recentOffers' => Offer::orderBy('sort_order')->take(5)->get(),
            'recentInquiries' => Inquiry::latest()->take(5)->get(),
        ]);
    }
}
