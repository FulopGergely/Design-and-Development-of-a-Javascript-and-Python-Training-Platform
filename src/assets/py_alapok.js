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
            exampleCode: `print('starting python script')
a = 1
b = 2
print('finished python script')
c = a + b
# return value
c`,
            text: `hali`,
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