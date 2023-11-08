const py_alapok = {
    tasks: [
        {
            type: "info",
            title: "Python nyelv<br>",
            text: 'Olvassa el a megjelölt hivatkozásokat!',
            img: "py.png",
            links: [
                { a: 'Python Wikipedia', href: 'https://hu.wikipedia.org/wiki/Python_(programoz%C3%A1si_nyelv)' },
                { a: 'Python W3Schools', href: 'https://www.w3schools.com/python/default.asp' },
                { a: 'Python W3Schools', href: 'https://www.w3schools.com/python/exercise.asp?filename=exercise_syntax1' }
            ],
        },
        {
            type: "info",
            title: "Python futtatása<br>",
            links: [
                { a: 'Atom', href: 'https://atom.io/' },
                { a: 'Visual Studio Code', href: 'https://code.visualstudio.com/' },
                { a: 'Plain Text', href: 'https://en.wikipedia.org/wiki/Plain_text' },
                { a: 'Chrome', href: 'https://www.google.com/chrome/' },
                { a: 'GitHub', href: 'https://github.com/' }
            ],
            exampleCode: `print('starting python script')`,
            text: `hello world példaprogram`,
        },
        {
            type: "info",
            title: "Kommentek<br>",
            links: [{ a: 'Comments on MDN', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Comments' }],
            exampleCode: `# Egysoros komment.\nx = 1\nx `,
            text: `A <i>Python</i>ban a kommenteket általában az egyes programrészek rövid bemutatására használjuk.<br>`
        },
        {
            type: "info",
            title: "Futtatás",
            exampleCode: `a = 2\n## a megoldást a két komment között adja majd meg\n\nresult = a\n\n##\n\nresult`,
            text: "<b>A teszt során az első és utolsó soron ne változtasson\nkülönben a teszt nem ad pontot a megoldására.</b> <br><br>\nAz első sorban a feladathoz tartozó bementei érték/értekek szerepelnek<br>\nAz utolsó sorban pedig a kimeneti érték, aminek fel kell vennie a megoldás eredményét."
        },
        {
            type: "code-1",
            title: "Kommentelje vagy törölje ki az alábbi programkódból...",
            text: "az <code> x = 1</code> utasítást tartalmazó sort, hogy az <code> x </code> változó a kezdeti bemeneti értékkel térjen vissza",
            links: [
                { a: 'Comments on MDN', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Comments' }
            ],
            testLine: `x = 5`,
            exampleCode: `x = 3\n\nprint(x)\nx = 1\n\nx`,
            code: `x = 3\n\nprint(x)\nx = 1
            \n\nx`,
            testResult: 5, result: 3
        },
        {
            type: "code-1",
            title: "Tegyük abc sorrendbe az autómárkákat...",
            text: " a <code> .sort() </code> utasítással!",
            exampleCode: `cars = ['VOLVO','TESLA','BMW']\n\n\ncars`,
            code: `cars = ['VOLVO','TESLA','BMW']\n\n\ncars`,
            result: `BMW,TESLA,VOLVO`,
            testLine: `cars = ['FORD','BMW','SUZUKI']`,
            testResult: `BMW,FORD,SUZUKI`,

        },
        {
            type: "info",
            title: "További tesztek gyakorlásra",
            text: " ",
            links: [
                { a: 'codingbat', href: 'https://codingbat.com/python' },
                { a: 'cses', href: 'https://cses.fi/' }
            ],
        }

    ],
}
/*
mezők:

type        3 lehet: info, code, button. Ez nem jelenik meg az oldalon
question
q2
img
links
links2
ecode
variables
tests
code
rans
options
goodo
tex

*/

export default py_alapok;