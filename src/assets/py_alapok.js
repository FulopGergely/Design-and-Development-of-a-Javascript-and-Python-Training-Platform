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
            text: `A <i>Python</i>ben a kommenteket általában az egyes programrészek rövid bemutatására használjuk.<br>`
        },
        {
            type: "code-1",
            title: "Kommentelje ki az alábbi programkódból...",
            text: "az <code> a++;</code> utasítást tartalmazó sort!",
            links: [
                { a: 'Comments on MDN', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Comments' }
            ],
            variables: [{ name: 'b', value: 6 }],
            tests: [{ name: 'b', value: 8 }],
            exampleCode: `x = 5
y = "John"
print(x)
print(y)`,
            code: `x = 5
y = "John"
print(x)
print(y)`,
            testResult: 13, result: 11
        },
        {
            type: "code-1",
            title: "Kommentelje ki az alábbi programkódból...",
            text: "az <code> a++;</code> utasítást tartalmazó sort!",
            links: [
                { a: 'Comments on MDN', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Comments' }
            ],
            variables: [{ name: 'b', value: 6 }],
            tests: [{ name: 'b', value: 8 }],
            exampleCode: `var a=b+5;\na++;\nreturn a`,
            code: `var a=b+5;\na++;\nreturn a`,
            testResult: 13, result: 11
        },
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