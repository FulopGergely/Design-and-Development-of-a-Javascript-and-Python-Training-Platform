const tasksJS = {
    tasks: [
        {
            type: "info",
            question: "JavaScript és Python nyelv<br>",
            q2: 'Olvassa el a megjelölt hivatkozásokat!' ,
            img: "js.png",
            img2: "python.png",
            links: [
                {a: 'JavaScript Wikipedia', href: 'https://hu.wikipedia.org/wiki/JavaScript'},
                {a: 'JavaScript W3Schools', href: 'https://www.w3schools.com/js/'},
                {a: 'JavaScript W3Schools', href: 'https://www.w3schools.com/js/exercise_js.asp?filename=exercise_js_variables1'}
            ],
            links2: [
                {a: 'Python Wikipedia', href: 'https://hu.wikipedia.org/wiki/Python_(programoz%C3%A1si_nyelv)'},
                {a: 'Python W3Schools', href: 'https://www.w3schools.com/python/default.asp'},
                {a: 'Python W3Schools', href: 'https://www.w3schools.com/python/exercise.asp?filename=exercise_syntax1'}
            ]
        },
        {
            type: "info",
            question: "JavaScript futtatása<br>",
            links: [
                {a: 'Atom', href: 'https://atom.io/'},
                {a: 'Visual Studio Code', href: 'https://code.visualstudio.com/'},
                {a: 'Plain Text', href: 'https://en.wikipedia.org/wiki/Plain_text'},
                {a: 'Chrome', href: 'https://www.google.com/chrome/'},
                {a: 'GitHub', href: 'https://github.com/'}
            ],
            ecode: `<script>\n\n    document.write('Hello World!');\n\n</script>`,
            q2: `A JavaScript nyelven írt programok futtatására sok lehetőség létezik, a legegyszerűbb, hogy közvetlebül a böngészőben futtatjuk.<br>
                 Ehhez készítsünk egy valami.html fájlt az alábbi tartalommal,
                 majd egyszerűen húzzuk bele egy böngésző ablakba. A fájl létrehozásához és szerkesztéséhez plain text szerkesztőre lesz szükségünk.
                 Ehhez az Atom vagy a Microsoft Visual Studio Code is jó választás, mindkét program ingyenes, minden platformon elérhető és számos
                 kiegészítő funkcióval rendelkezik. (Syntax highlighting, Markdown preview, Github és GitLab támogatás, ...)`
        },
    ]
}


export default tasksJS;