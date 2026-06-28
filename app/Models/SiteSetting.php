<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

/**
 * Key/value store for editable, site-wide settings (contact channels and
 * social media links) managed from the admin console. The {@see self::DEFAULTS}
 * map is the canonical list of editable keys — anything not listed is ignored.
 */
class SiteSetting extends Model
{
    protected $fillable = ['key', 'value'];

    /**
     * Default values, also defining the full set of editable keys and their
     * order. Used as a fallback so the public site works before an admin has
     * saved anything.
     *
     * @var array<string, string>
     */
    public const DEFAULTS = [
        // Contact channels
        'phone' => '+971 4 555 0192',
        'whatsapp' => '+971 4 555 0192',
        'email' => 'hello@travelspoint.com',
        'address' => 'Office 1204, Marina Plaza, Dubai Marina, UAE',
        // Social media links
        'facebook' => '',
        'instagram' => '',
        'youtube' => '',
        'twitter' => '',
        'linkedin' => '',
        'tiktok' => '',
        // Per-link on/off flags ('1' = show the icon, '0' = hide it)
        'facebook_active' => '1',
        'instagram_active' => '1',
        'youtube_active' => '1',
        'twitter_active' => '1',
        'linkedin_active' => '1',
        'tiktok_active' => '1',
    ];

    /**
     * The social platforms that have an editable link + active toggle.
     *
     * @var list<string>
     */
    public const SOCIAL_PLATFORMS = [
        'facebook',
        'instagram',
        'youtube',
        'twitter',
        'linkedin',
        'tiktok',
    ];

    /**
     * The stored values merged over the defaults, keyed by setting name.
     *
     * @return array<string, string>
     */
    public static function map(): array
    {
        // Guard against the table not existing yet (e.g. before migrating).
        if (! Schema::hasTable('site_settings')) {
            return self::DEFAULTS;
        }

        $stored = self::query()->pluck('value', 'key')->all();

        return [...self::DEFAULTS, ...array_intersect_key($stored, self::DEFAULTS)];
    }

    /**
     * Persist the given key/value pairs, ignoring any unknown keys.
     *
     * @param  array<string, string|null>  $values
     */
    public static function putMany(array $values): void
    {
        foreach ($values as $key => $value) {
            if (! array_key_exists($key, self::DEFAULTS)) {
                continue;
            }

            self::query()->updateOrCreate(['key' => $key], ['value' => $value ?? '']);
        }
    }

    /**
     * The public-facing contact payload shared with the marketing site:
     * contact channels plus only the social links that have been filled in.
     *
     * @return array<string, mixed>
     */
    public static function contact(): array
    {
        $map = self::map();

        $socials = [];
        foreach (self::SOCIAL_PLATFORMS as $key) {
            $url = trim((string) ($map[$key] ?? ''));
            $active = ($map["{$key}_active"] ?? '1') !== '0';

            // Show the icon only when the link is filled in AND marked active.
            if ($url !== '' && $active) {
                $socials[$key] = $url;
            }
        }

        return [
            'phone' => $map['phone'],
            'whatsapp' => $map['whatsapp'],
            'whatsapp_url' => self::whatsappUrl($map['whatsapp']),
            'email' => $map['email'],
            'address' => $map['address'],
            'socials' => $socials,
        ];
    }

    /**
     * Build a wa.me link from a free-form phone number (strips everything but
     * digits). Returns null when no number is configured.
     */
    private static function whatsappUrl(?string $number): ?string
    {
        $digits = preg_replace('/\D+/', '', (string) $number);

        return $digits === '' ? null : "https://wa.me/{$digits}";
    }
}
