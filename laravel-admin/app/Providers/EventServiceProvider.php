<?php

namespace App\Providers;

use App\Events\AdminAddedEvent;
use App\Events\OrderCompletedEvent;
use App\Events\ProductUpdatedEvent;
use App\Listeners\NotifyAdminAddedListener;
use App\Listeners\NotifyAdminListener;
use App\Listeners\NotifyInfluencerListener;
use App\Listeners\ProductCacheFlushListener;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        OrderCompletedEvent::class => [
            NotifyAdminListener::class,
            NotifyInfluencerListener::class
        ],
        AdminAddedEvent::class => [
            NotifyAdminAddedListener::class
        ],
        ProductUpdatedEvent::class => [
            ProductCacheFlushListener::class
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
