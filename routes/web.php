<?php

use App\Http\Controllers\Admin\BannerController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DestinationController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\InquiryController;
use App\Http\Controllers\Admin\OfferController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\TourPackageController;
use App\Http\Controllers\SiteController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public marketing site
|--------------------------------------------------------------------------
*/
Route::get('/', [SiteController::class, 'home'])->name('home');
Route::get('/packages', [SiteController::class, 'packages'])->name('packages');
Route::get('/gallery', [SiteController::class, 'gallery'])->name('gallery');
Route::get('/about', [SiteController::class, 'about'])->name('about');
Route::get('/contact', [SiteController::class, 'contact'])->name('contact');
Route::post('/contact', [SiteController::class, 'submitInquiry'])->name('contact.submit');

/*
|--------------------------------------------------------------------------
| Admin console (authenticated)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        Route::resource('destinations', DestinationController::class)->except('show');
        Route::resource('packages', TourPackageController::class)->except('show');
        Route::resource('offers', OfferController::class)->except('show');
        Route::resource('testimonials', TestimonialController::class)->except('show');
        Route::resource('banners', BannerController::class)->except('show');
        Route::resource('gallery', GalleryController::class)->except('show');

        Route::get('inquiries', [InquiryController::class, 'index'])->name('inquiries.index');
        Route::patch('inquiries/{inquiry}', [InquiryController::class, 'update'])->name('inquiries.update');
        Route::delete('inquiries/{inquiry}', [InquiryController::class, 'destroy'])->name('inquiries.destroy');
    });

// Keep the `dashboard` route name (referenced by the auth starter kit) pointing at the admin home.
Route::middleware(['auth', 'verified'])
    ->get('dashboard', fn () => redirect()->route('admin.dashboard'))
    ->name('dashboard');

require __DIR__.'/settings.php';
