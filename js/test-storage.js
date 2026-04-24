window.TestStorage = (function () {
    const STORAGE_KEY = "ebu6305_test_page_state_v2";

    function save(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error("Failed to save quiz state:", error);
            return false;
        }
    }

    function load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (error) {
            console.error("Failed to load quiz state:", error);
            return null;
        }
    }

    function clear() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return true;
        } catch (error) {
            console.error("Failed to clear quiz state:", error);
            return false;
        }
    }

    return {
        save,
        load,
        clear
    };
})();