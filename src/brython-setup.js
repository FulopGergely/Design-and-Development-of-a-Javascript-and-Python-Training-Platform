export const brythonReady = new Promise((resolve) => {
    const script = document.createElement('script');
    script.setAttribute('src', 'path/to/your/brython.js');

    script.onload = () => {
        const stdlibScript = document.createElement('script');
        stdlibScript.setAttribute('src', 'path/to/your/brython_stdlib.js');

        stdlibScript.onload = () => {
            window.brython({ debug: true, indexedDB: false }, () => {
                resolve();
            });
        };

        document.head.appendChild(stdlibScript);
    };

    document.head.appendChild(script);
});