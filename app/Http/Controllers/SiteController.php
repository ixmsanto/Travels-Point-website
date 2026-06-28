<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\BlogPost;
use App\Models\Destination;
use App\Models\GalleryItem;
use App\Models\Inquiry;
use App\Models\Offer;
use App\Models\Region;
use App\Models\TeamMember;
use App\Models\Testimonial;
use App\Models\TourPackage;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class SiteController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('public/home', [
            'banners' => Banner::where('active', true)->orderBy('sort_order')->get(),
            'destinations' => Destination::where('is_featured', true)->orderBy('sort_order')->get(),
            'packages' => TourPackage::where('is_featured', true)->orderBy('sort_order')->get(),
            'offers' => Offer::where('status', 'Active')->orderBy('sort_order')->get(),
            'testimonials' => Testimonial::where('is_published', true)->orderBy('sort_order')->get(),
            'gallery' => GalleryItem::where('is_published', true)->orderBy('sort_order')->get(),
            'posts' => $this->publishedPosts()->take(3)->get(),
        ]);
    }

    public function packages(): Response
    {
        return Inertia::render('public/packages', [
            'packages' => TourPackage::orderBy('sort_order')->get(),
            'regions' => Region::orderBy('sort_order')->orderBy('name')->get(['id', 'name', 'icon']),
            'offers' => Offer::where('status', 'Active')->orderBy('sort_order')->get(),
        ]);
    }

    public function gallery(): Response
    {
        return Inertia::render('public/gallery', [
            'gallery' => GalleryItem::where('is_published', true)->orderBy('sort_order')->get(),
        ]);
    }

    public function about(): Response
    {
        return Inertia::render('public/about', [
            'testimonials' => Testimonial::where('is_published', true)->orderBy('sort_order')->get(),
            'destinationCount' => Destination::count(),
            'team' => TeamMember::where('is_published', true)->orderBy('sort_order')->get(),
        ]);
    }

    public function contact(): Response
    {
        return Inertia::render('public/contact', [
            'destinations' => Destination::orderBy('sort_order')->pluck('name'),
        ]);
    }

    public function blog(): Response
    {
        return Inertia::render('public/blog', [
            'posts' => $this->publishedPosts()->get(),
        ]);
    }

    public function blogPost(BlogPost $post): Response|HttpResponse
    {
        abort_unless($post->is_published, 404);

        return Inertia::render('public/blog-show', [
            'post' => $post,
            'related' => $this->publishedPosts()
                ->whereKeyNot($post->id)
                ->take(3)
                ->get(),
        ]);
    }

    /**
     * Base query for published blog posts, newest first.
     */
    private function publishedPosts(): Builder
    {
        return BlogPost::query()
            ->where('is_published', true)
            ->orderByDesc('published_at')
            ->orderBy('sort_order')
            ->latest('id');
    }

    public function submitInquiry(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:160'],
            'phone' => ['nullable', 'string', 'max:60'],
            'destination' => ['nullable', 'string', 'max:120'],
            'travel_date' => ['nullable', 'date'],
            'message' => ['required', 'string', 'max:2000'],
        ]);

        Inquiry::create($validated + ['status' => 'New']);

        return back()->with('success', 'Thanks! Our travel team will be in touch within 24 hours.');
    }
}
