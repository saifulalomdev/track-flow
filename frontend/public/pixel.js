(function () {
    const scriptTag = document.currentScript;
    const customerId = scriptTag?.getAttribute('data-tid');
    let apiEndpoint = scriptTag?.getAttribute('data-tapi') || 'https://api.tf.saifulalom.com/api/collect';
    
    if (!customerId) return;

    // Environment Detection
    const hostname = window.location.hostname;
    const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
    const isDebug = new URLSearchParams(window.location.search).has('tf_debug');

    if (isLocal) apiEndpoint = 'http://localhost:8787/api/collect';
    if (isDebug) apiEndpoint = 'https://api.staging.tf.saifulalom.com/api/collect';

    // Settings
    const STORAGE_KEY = 'tf_uid';
    const BATCH_SIZE = 5;
    let eventBuffer = [];
    let flushTimer = null;

    // 1. Get/Create Anonymous Visitor ID
    const getVisitorId = () => {
        let uid = localStorage.getItem(STORAGE_KEY);
        if (!uid) {
            uid = crypto.randomUUID();
            try { localStorage.setItem(STORAGE_KEY, uid); } catch (e) {}
        }
        return uid;
    };

    // 2. Gather Environment Info
    const getPageMeta = () => ({
        sw: window.screen.width,
        sh: window.screen.height,
        lang: navigator.language,
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
        ref: document.referrer || 'direct'
    });

    // 3. Send Data to Backend
    const flushEvents = () => {
        if (!eventBuffer.length) return;

        const payload = JSON.stringify({
            cid: customerId,
            vid: getVisitorId(),
            meta: getPageMeta(),
            events: eventBuffer
        });

        // Use sendBeacon for reliability when closing the tab
        if (navigator.sendBeacon) {
            navigator.sendBeacon(apiEndpoint, payload);
        } else {
            fetch(apiEndpoint, { method: 'POST', body: payload, keepalive: true });
        }

        eventBuffer = [];
        clearTimeout(flushTimer);
        flushTimer = null;
    };

    // 4. Track Event Function
    window.trackEvent = (eventName, customData = {}) => {
        eventBuffer.push({
            name: eventName,
            url: window.location.pathname,
            ts: Date.now(),
            data: customData
        });

        // Flush immediately if buffer is full, otherwise wait 5 seconds
        if (eventBuffer.length >= BATCH_SIZE) {
            flushEvents();
        } else if (!flushTimer) {
            flushTimer = setTimeout(flushEvents, 5000);
        }
    };

    // --- Initial Events ---
    trackEvent('page_view');

    // --- Auto-capture Clicks ---
    document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-tf-convert]');
        if (target) {
            trackEvent('conversion', { goal: target.getAttribute('data-tf-convert') });
        }
    });

    // --- Flush on Exit ---
    window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') flushEvents();
    });
})();