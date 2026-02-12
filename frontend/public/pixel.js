/**
 * TrackFlow - Privacy-First Analytics Client
 */
(function () {
    const scriptTag = document.currentScript;
    const customerId = scriptTag?.getAttribute('data-tid');
    if (!customerId) return;

    // 1. Environment Detection
    const urlParams = new URLSearchParams(window.location.search);
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const isDebug = urlParams.has('tf_debug');

    let API_ENDPOINT = 'https://api.tf.saifulalom.com/api/collect';
    if (isLocal) API_ENDPOINT = 'http://localhost:8787/api/collect';
    if (isDebug) API_ENDPOINT = 'https://api.staging.tf.saifulalom.com/api/collect';

    const STORAGE_KEY = 'tf_uid';
    const BATCH_SIZE = 5;
    let eventBuffer = [];

    // 2. Anonymous Visitor ID (Privacy-First)
    const getVisitorId = () => {
        let uid = localStorage.getItem(STORAGE_KEY);
        if (!uid) {
            uid = crypto.randomUUID();
            localStorage.setItem(STORAGE_KEY, uid);
        }
        return uid;
    };

    // 3. Metadata Collection (For your Elegant Dashboard)
    const getMetadata = () => {
        return {
            sw: window.screen.width,   // Screen Width (Mobile vs Desktop)
            sh: window.screen.height,  // Screen Height
            lang: navigator.language,  // Browser Language
            tz: Intl.DateTimeFormat().resolvedOptions().timeZone // Timezone
        };
    };

    const flushEvents = () => {
        if (!eventBuffer.length) return;

        // Use Blob + sendBeacon for reliability on page close
        const payload = JSON.stringify({
            customer_id: customerId,
            events: eventBuffer
        });

        if (navigator.sendBeacon) {
            navigator.sendBeacon(API_ENDPOINT, payload);
        } else {
            fetch(API_ENDPOINT, { method: 'POST', body: payload, keepalive: true });
        }
        eventBuffer = [];
    };

    window.trackEvent = (eventName, customMeta = {}) => {
        eventBuffer.push({
            visitorId: getVisitorId(),
            eventname : eventName,
            url: window.location.pathname, 
            ref: document.referrer || 'direct',
            // UTMs
            source: urlParams.get('utm_source'),
            medium: urlParams.get('utm_medium'),
            campaign: urlParams.get('utm_campaign'),
            // Device info
            meta: { ...getMetadata(), ...customMeta },
            ts: Date.now()
        });

        if (eventBuffer.length >= BATCH_SIZE) flushEvents();
    };

    // Initial Events
    trackEvent('page_view');

    // Auto-capture Conversions (Example: clicks on anything with data-tf-convert)
    document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-tf-convert]');
        if (target) {
            trackEvent('conversion', { goal: target.getAttribute('data-tf-convert') });
        }
    });

    // Flush on exit
    window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') flushEvents();
    });
})();