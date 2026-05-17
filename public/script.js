(function () {
    const scriptTag = document.currentScript;
    const website_id = scriptTag?.getAttribute('data-website-id');
    const api_endpoint = scriptTag?.getAttribute('data-api') || 'https://api.tf.saifulalom.com/api/collect';

    if (!website_id || !api_endpoint) return;

    const sessionStorageKey = "trackflow_session_id"

    function getOrCreateSessionId() {
        // 1. Try to get an existing session ID from sessionStorage
        let sessionId = sessionStorage.getItem(sessionStorageKey);

        // 2. If it doesn't exist, generate a new cryptographically secure UUID
        if (!sessionId) {
            sessionId = crypto.randomUUID();
            sessionStorage.setItem(sessionStorageKey, sessionId);
        }

        return sessionId;
    }

    const eventData = {
        website_id,
        params: Object.fromEntries(new URLSearchParams(window.location.search)),
        tf_session_id: getOrCreateSessionId(),
        path: window.location.pathname,
        page_title: document.title,
        event: {
            type: "page_view",
            value: "",
            currency: ""
        },
        screen: {
            width: window.screen.width,
            height: window.screen.height
        },
        lang: navigator.language,
    }

    fetch(api_endpoint, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(eventData),
        keepalive: true
    });



    // // Settings
    // const STORAGE_KEY = 'tf_uid';
    // const BATCH_SIZE = 5;
    // let eventBuffer = [];
    // let flushTimer = null;

    // // 1. Get/Create Anonymous Visitor ID
    // const getVisitorId = () => {
    //     let uid = localStorage.getItem(STORAGE_KEY);
    //     if (!uid) {
    //         uid = crypto.randomUUID();
    //         try { localStorage.setItem(STORAGE_KEY, uid); } catch (e) {}
    //     }
    //     return uid;
    // };

    // const getVisitorSessionId = () => {
    //     let uid = sessionStorage.getItem(STORAGE_KEY);
    //     if (!uid) {
    //         uid = crypto.randomUUID();
    //         try { localStorage.setItem(STORAGE_KEY, uid); } catch (e) {}
    //     }
    //     return uid;
    // };



    // // 2. Gather Environment Info
    // const getPageMeta = () => ({
    //     sw: window.screen.width,
    //     sh: window.screen.height,
    //     lang: navigator.language,
    //     tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    //     ref: document.referrer || 'direct'
    // });

    // // 3. Send Data to Backend
    // const flushEvents = () => {
    //     if (!eventBuffer.length) return;

    //     const payload = JSON.stringify({
    //         cid: customerId,
    //         vid: getVisitorId(),
    //         meta: getPageMeta(),
    //         events: eventBuffer
    //     });

    //     // Use sendBeacon for reliability when closing the tab
    //     if (navigator.sendBeacon) {
    //         navigator.sendBeacon(apiEndpoint, payload);
    //     } else {
    //         fetch(apiEndpoint, { method: 'POST', body: payload, keepalive: true });
    //     }

    //     eventBuffer = [];
    //     clearTimeout(flushTimer);
    //     flushTimer = null;
    // };

    // // 4. Track Event Function
    // window.trackEvent = (eventName, customData = {}) => {
    //     eventBuffer.push({
    //         name: eventName,
    //         url: window.location.pathname,
    //         ts: Date.now(),
    //         data: customData
    //     });

    //     // Flush immediately if buffer is full, otherwise wait 5 seconds
    //     if (eventBuffer.length >= BATCH_SIZE) {
    //         flushEvents();
    //     } else if (!flushTimer) {
    //         flushTimer = setTimeout(flushEvents, 5000);
    //     }
    // };

    // // --- Initial Events ---
    // trackEvent('page_view');

    // // --- Auto-capture Clicks ---
    // document.addEventListener('click', (e) => {
    //     const target = e.target.closest('[data-tf-convert]');
    //     if (target) {
    //         trackEvent('conversion', { goal: target.getAttribute('data-tf-convert') });
    //     }
    // });

    // // --- Flush on Exit ---
    // window.addEventListener('visibilitychange', () => {
    //     if (document.visibilityState === 'hidden') flushEvents();
    // });
})();