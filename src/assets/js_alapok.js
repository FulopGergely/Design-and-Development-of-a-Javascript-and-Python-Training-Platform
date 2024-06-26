const js_alapok = {
    tasks: [
        {
            type: "info",
            title: "JavaScript nyelv<br>",
            text: 'Olvassa el a megjelölt hivatkozásokat!',
            img: "/js.png",
            links: [
                { a: 'JavaScript Wikipedia', href: 'https://hu.wikipedia.org/wiki/JavaScript' },
                { a: 'JavaScript W3Schools', href: 'https://www.w3schools.com/js/' },
                { a: 'JavaScript W3Schools', href: 'https://www.w3schools.com/js/exercise_js.asp?filename=exercise_js_variables1' }
            ],
        },
        {
            type: "info",
            title: "JavaScript futtatása<br>",
            links: [
                { a: 'Atom', href: 'https://atom.io/' },
                { a: 'Visual Studio Code', href: 'https://code.visualstudio.com/' },
                { a: 'Plain Text', href: 'https://en.wikipedia.org/wiki/Plain_text' },
                { a: 'Chrome', href: 'https://www.google.com/chrome/' },
                { a: 'GitHub', href: 'https://github.com/' }
            ],
            exampleCode: `document.write('Hello World!');`,
            text: `A JavaScript nyelven írt programok futtatására sok lehetőség létezik, a legegyszerűbb, hogy közvetlenül a böngészőben futtatjuk.<br>
                 Ehhez készítsünk egy valami.html fájlt az alábbi tartalommal,
                 majd egyszerűen húzzuk bele egy böngésző ablakba. A fájl létrehozásához és szerkesztéséhez plain text szerkesztőre lesz szükségünk.
                 Ehhez az Atom vagy a Microsoft Visual Studio Code is jó választás, mindkét program ingyenes, minden platformon elérhető és számos
                 kiegészítő funkcióval rendelkezik. (Syntax highlighting, Markdown preview, Github és GitLab támogatás, ...)`,
        },
        {
            type: "info",
            title: "JavaScript futtatása<br>",
            links: [
                { a: 'NodeJS', href: 'https://nodejs.org/en/' },
                { a: 'Visual Studio Code', href: 'https://code.visualstudio.com/' },
                { a: 'Atom', href: 'https://atom.io/' },
                { a: 'Plain Text', href: 'https://en.wikipedia.org/wiki/Plain_text' }
            ],
            exampleCode: `console.log('Hello World!');`,
            text: `Egy másik lehetőség a node.js használata. Ehhez a node.js és a text editor telepítése után hozzunk létre egy valami.js fájlt az alábbi taralommal. 
                A kód futtatására ezután a node
                terminal paranccsal lesz lehetőségünk:<br><br>><code>node valami.js</code><br><br>A .js fájlnak természetesen ekkor az aktuális könyvtárban kell lennie.`
        },
        {
            type: "info",
            title: "Kommentek<br>",
            links: [{ a: 'Comments on MDN', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Comments' }],
            exampleCode: `// Egysoros komment.\nvar x = 1; // Egysoros komment kódsor mögött.\n/* \nTöbbsoros \nkomment. \n*/\nconsole.log( x + 1 );`,
            text: `
            A <i>JavaScript</i>ben a kommenteket általában az egyes programrészek rövid bemutatására használjuk.<br>
            A kommentbe helyezett programsorok nem hajtódnak végre, így tesztelés céljából is praktikus a használata.<br> 
            Az egysoros kommentek a <code>//</code> jellel kezdődnek.           
            <br>Bármi amit utána írunk, nem hajtódik végre.<hr>A többsoros kommentek a <code>/* ... */</code> jelek közé kell szúrni.
            <br>Bármi amit a két jel közé szírunk be, nem hajtódik végre.`
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
        {
            type: "info",
            title: "Változók deklarációja<br>",
            links: [{ a: 'Declarations', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Declarations' }],
            exampleCode: `var s = 'cica'; \nlet obj12 = {a: 1};\nconst arr = [];\narr[0] = "mango"\nconsole.log(s);\nconsole.log(obj12.a);\nconsole.log(arr[0]);`,
            text: `A változókat tekinthetjük egy olyan absztraktciónak a programon belül, melyhez tetszőleges (típusú) értéket rendelhetünk.<br>
            A változó nevét azonosítónak hívjuk és az elnevezés formája szabályokhoz van kötve:<br>
            <li>a kezdő karakter egy tetszőleges UniCode betű, vagy _ jel, vagy $ jel lehet,</li>
            <li>a további karakterek a fentieken túl (0-9) számjegyek is lehetnek.</li><hr>
            Változókat a <code>var</code>, <code>let</code> vagy a <code>const</code>kulcsszó segítségével deklarálhatunk:`
        },
        {
            type: "code-1",
            title: "Definiáljon egy zebra azonosítójú változót...",
            text: "a változó vegye fel a <code>3</code> numerikus értéket! A deklarációt a return parancs elé írja!",
            links: [
                { a: 'Comments on MDN', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Comments' }
            ],
            variables: [{ name: 'csík', value: 6 }],
            tests: [{ name: 'csík', value: 12 }],
            exampleCode: `var zebra = 3;\nreturn zebra + csík;`,
            code: `//ide írja a deklarációt!\nreturn zebra + csík;`,
            testResult: 15, result: 9
        },
        {
            type: "info",
            title: "Típusok<br>",
            links: [{ a: 'Standard defined tasksJS stuctures and types', href: 'https://developer.mozilla.org/hu/docs/Web/JavaScript/Guide/Grammar_and_types' }],
            exampleCode: "var logikai = true;\nvar szám = 4;\nvar szöveg = 'cica';\nvar objektum = {};\nvar tömb = [1, 2, 3];\nconsole.log(`\n ${ typeof logikai } ${ typeof szám } ${ typeof szöveg } ${ typeof objektum } ${ typeof tömb }\n `); ",
            text: `A változó típusát az értékadás határozza meg.<br>Az alábbi pédaprogram rendre a következő változókat definiálja:
                <br><li>logikai</li><li>szám</li><li>szöveges</li><li>objektum</li><li>tömb (javascriptben a tömbök az objektumok egy speciális típusa)</li>`
        },
        {
            type: "buttons",
            text: 'A kifejezések kiértékelése balról jobbra történik.<br>Olvassa el az operátorokról szóló részt, majd tippelje meg mit ír ki a megadott pédaprogram!',
            title: "Kifejezések<br>",
            links: [
                { a: 'Operators', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators' },
                { a: 'Operators', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Exponentiation' }
            ],
            code: "var ↀ = 3, ↈ=11;\nconsole.log(\n\tↀ**ↀ--*ↀ-++ↈ\n);",
            options: [
                { label: 22, isSelected: false, isCorrect: false, disableButton: false },
                { label: 0, isSelected: false, isCorrect: false, disableButton: false },
                { label: 11, isSelected: false, isCorrect: false, disableButton: false },
                { label: 42, isSelected: false, isCorrect: true, disableButton: false },
                { label: 72, isSelected: false, isCorrect: false, disableButton: false },
                { label: 112, isSelected: false, isCorrect: false, disableButton: false },
            ],
            result: 42
        },
        {
            type: "info",
            title: "JavaScript alapjai<br>",
            links: [
                { a: 'MDN', href: 'https://developer.mozilla.org/hu/docs/Web/JavaScript' },
                { a: 'JavaScript - PP', href: 'http://ctp.mkprog.eu/hu/javascript' },
                { a: 'JavaScript - ELTE', href: 'http://nyelvek.inf.elte.hu/leirasok/JavaScript/index.php?chapter=1' },
                { a: 'JavaScript - Kozma', href: 'http://users.atw.hu/javascript/' }
            ],
            text: `Olvassa el a hivatkozások tananyagát, majd a tanultakat próbálja ki a saját programozási környezetében!<br>
                 A következő feladatok megoldása során ezeket és bármilyen más segédanyagot felhasználhat!`
        },
        {
            type: "info",
            title: "JavaScript Objektumok<br>",
            links: [
                { a: 'MDN Object', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object' },
                { a: 'Object-oriented programming', href: 'https://en.wikipedia.org/wiki/Object-oriented_programming' },
            ],
            text: `Az objektum megadásához a <code>{}</code> karakter használható. Az objektum nagyon fontos szerepet tölt be a JavaScript nyelvben és
                 a programozásban általában is. Gyakorlatilag minden önállóan azonosítható entitás, tehát bármi ami létezhet, objektumnak tekinthető.\n
                 Egy objektumnak lehetnek tulajsonságai és metódusai, melyekre a JavaScript-ben <code>.</code>-tal hivatkozunk.`,
            exampleCode: "var o = { \n\tname: 'John Doe',\n\tage: 39,\n\töregszik( év = 1 ) { \n\t\tthis.age += év \n\t}\n};\no.öregszik( 3 ); \t// az o objektum öregszik metódusának meghívása\nconsole.log(\n\to.age \t\t\t// az o objektum age tulajdonságának elérése\n);"
        },
        {
            type: "buttons",
            title: 'Értelmezze az alábbi programrészletet!',
            text: "Az alábbi program mit logol a console-ra?<br>",
            options: [
                { label: 39, isSelected: false, isCorrect: false, disableButton: false },
                { label: "John Doe", isSelected: false, isCorrect: false, disableButton: false },
                { label: 40, isSelected: false, isCorrect: false, disableButton: false },
                { label: 42, isSelected: false, isCorrect: true, disableButton: false },
                { label: 3, isSelected: false, isCorrect: false, disableButton: false },
                { label: "cica", isSelected: false, isCorrect: false, disableButton: false },
                { label: "öregszik", isSelected: false, isCorrect: false, disableButton: false },
                { label: 0, isSelected: false, isCorrect: false, disableButton: false },
                { label: 'age', isSelected: false, isCorrect: false, disableButton: false },
                { label: 'o.age', isSelected: false, isCorrect: false, disableButton: false },
            ],
            code: "var o = { \n\tname: 'John Doe',\n\tage: 39,\n\töregszik( év = 1 ) { \n\t\tthis.age += év \n\t}\n};\no.öregszik( 3 ); \t// az o objektum öregszik metódusának meghívása\nconsole.log(\n\to.age \t\t\t// az o objektum age tulajdonságának elérése\n);",
            result: 42
        },
        {
            type: "code-2",
            title: "JavaScript Függvények<br>",
            links: [
                { a: 'MDN Object', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions' },
            ],
            text: `Egy függvény úgy fogható fel, mint egy matematikai gép, ami a bemenetén kapott értékeket (bemeneti paraméterek) a kivánt kimeneti értékké konvertálja (visszatérési érték).\n
            Egy objektum egy metódusa is fügvvény. A visszatérési értéket a <code>return</code> utasítással állíthatjuk be.<br>
            Módosítsa az f metódust, hogy a visszatérési érték a két bemeneti változó összege legyen!<br>A leckében a továbbiakban megjelenő feladatok mind ezt a behelyettesítési  metódust követik majd.`,
            variables: [{ name: 'a', value: 3 }, { name: 'b', value: 5 }],
            tests: [{ name: 'a', value: 2 }, { name: 'b', value: 4 }],
            exampleCode: `f(a,b) {\n\tvar c=...;\n\treturn c;\n}`,
            code: `\n`,
            testResult: 6, result: 8
        },
        {
            type: "info",
            title: "JavaScript Stringek<br>",
            links: [
                { a: 'MDN String', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String' },
            ],
            text: `A stringek megadásához használhatjuk a <code>"idézőjel"</code>, az <code>'aposztróf'</code>,
                vagy a <code>\`lierál\`</code> karaktereket.<br>
                A literál több soros stringet is tartalmazhat és használható benne a template szintaxis: <code>\${ v }</code>,
                ami változó értékének behelyettesítését végzi.
                `,
            exampleCode: "var macs = 'cica';\nconsole.log(`\nEgy ${ macs }, két ${ macs }, száz ${ macs }, haj!\nAzt hiszi, hogy megfogja az egeret.\n`); "
        },
        {
            type: "code-1",
            title: "Stringek mint objektumok.",
            links: [
                { a: 'MDN String -> length', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length' },
            ],
            text: `Mivel a JavaScript-ben a primitív típusok is objektumok, egyes jellemzőik és metódusaik az objektumokra jellemző módon hivatkozhatóak.<br>
            adja meg az s string hosszát az objektumoknál ismertetett módszerrel! A string hosszát a String objektum <code>length</code> jellemzőének kiolvasásával kérdezhetjük le.`,
            variables: [{ name: 's', value: 'indul a görög aludni' }],
            tests: [{ name: 's', value: '`géza kék az ég`' }],
            code: 'return ',
            testResult: 14, result: 20
        },
        {
            type: "info",
            title: "JavaScript Tömbök<br>",
            links: [
                { a: 'MDN Array -> fill', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill' },
                { a: 'MDN Array -> map', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map' }
            ],
            text: `A tömb megadásához a <code>[]</code> karakter vagy az <code>Array()</code> konstruktor használható. A tömb is objektumként viselkedik,
            ezért a t1 és t2 definíció ekvivalens.\n
            A t2 definíciójában az Array(10) létrehoz egy 10 elemű tömböt, majd feltölti 0-val. A map metódus ezt a 10 darab nullát (0) tartalmazó
            tömböt módosítja a paraméterben kapott függvény végrehajtásával. Az Array objektum map metódusa egy függvényt vár paraméterként, melynek az első bemeneti változója
            az aktuális tömb-elem értéke, a második paraméter pedig ennek indexe. Mivel az első tömb-elem indexe 0, ezért az első értéket 0+1=1 értékre állítja be és így tovább.`,
            exampleCode: "var t1 = [1 ,2 ,3, 4, 5, 6, 7, 8, 9, 10];\nvar t2 = Array(10).fill(0).map((v,i)=>i+1);\nconsole.log(t1)\nconsole.log(t2)"
        },
        {
            type: "info",
            title: "JavaScript Tömbök<br>",
            links: [
                { a: 'MDN Array -> fill', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill' },
                { a: 'MDN Array -> map', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map' },
                { a: 'MDN Array -> sort', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort' },
                { a: 'MDN Array -> slice', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice' },
                { a: 'MDN Math -> random', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random' }
            ],
            text: `Az alábbi kódrészlet a jövő heti 5-ös lottó nyerőszámait számítja ki. A megértéshez olvassa el az MDN súgót a felhasznált metódusokról,
                 majd próbálgassa ki őket külön-külön is a saját fejlesztői környezetében!`,
            exampleCode: "var t1 = Array( 90 )\n\t\t\t.fill( 0 )\n\t\t\t.map( ( v, i ) => i + 1 )\n\t\t\t.sort( () => Math.random() - 0.5 )\n\t\t\t.slice( 0, 5 )\n\t\t\t.sort( ( a, b ) => a - b );\nconsole.log(t1)"
        },
        {
            type: "code-1",
            title: "Az s string számadatokat tartalmaz, pontosvesszővel elválasztva.",
            text: "Határozza meg az adatok darabszámát!",
            links: [
                { a: 'MDN String -> split', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split' },
                { a: 'MDN Array -> length', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length' },
                { a: 'MDN Number', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number' }
            ],
            variables: [{ name: 's', value: '`6;2;3;5;7;1;2;4;6;2;3;17;2;3`' }],
            tests: [{ name: 's', value: '`1;12;23;5;7;1;2;4;-6;3`' }],
            code: `let db = 1;\n//ide írja a megoldás kódját\nreturn db`,
            testResult: 10, result: 14
        },
        {
            type: "code-1",
            title: "Az s string számadatokat tartalmaz, pontosvesszővel elválasztva.",
            text: `Határozza meg a legnagyobb elem értékét! A megoldáshoz a tömbbé alakítás után használhatja a sort metódust a csökkenő rendezéshez, majd az így kapott tömb 0. eleme a legnagyobb.
            `,
            links: [
                { a: 'MDN String -> split', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split' },
                { a: 'MDN Array -> length', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort' },
                { a: 'MDN Number', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number' }
            ],
            variables: [{ name: 's', value: '`6;2;3;5;7;1;2;4;6;2;3;17;2;3`' }],
            tests: [{ name: 's', value: '`1;12;23;5;7;1;2;4;-6;3`' }],
            code: `//ide írja a kódot\n\nreturn eredmeny`,
            testResult: 23, result: 17
        },
        {
            type: "code-1",
            title: "Az s string számadatokat tartalmaz, pontosvesszővel elválasztva.",
            text: `Határozza meg a legnagyobb elem helyzetét, azaz azt, hogy hanyadik adat a legnagyobb adat!<br>
                 A megadott példaprogram egy kiindulási átalakítást végez a bemeneti adatokon, amely a megoldást karnyújtásnyi közelségbe helyezi.<br>
                 Próbálja előbb megérteni a pédaprogram működését!`,
            links: [
                { a: 'MDN String -> split', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split' },
                { a: 'MDN Array -> length', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort' },
                { a: 'MDN Number', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number' }
            ],
            variables: [{ name: 's', value: '`6;2;3;5;17;1;2`' }],
            tests: [{ name: 's', value: '`1;12;23;5;7;1;2;4;-6;3`' }],
            exampleCode: `s\t.split(';')\n\t.map((v,i)=>[i+1,Number(v)])\n\t.sort((a,b)=>b[1]-a[1]);`,
            code: `s\t.split(';')\n\t.map((v,i)=>[i+1,Number(v)])\n\t.sort((a,b)=>b[1]-a[1]);`,
            testResult: 3, result: 5
        },
        {
            type: "code-1",
            title: "Az s string számokat tartalmaz, pontosvesszővel elválasztva.",
            text: `Határozza meg a számok összegét!<br>A megadott példaprogram a tömbben előforduló legnagyobb és legkisebb szám összegét adja meg.<br>
                 A megoldáshoz a reduce metódus alkalmazása javasolt.`,
            //tex: '\\sum _{i=1}^n\\:x_i',
            links: [
                { a: 'MDN String -> split', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split' },
                { a: 'MDN Array -> map', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map' },
                { a: 'MDN Number', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number' },
                { a: 'MDN Array -> reduce', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce' }
            ],
            variables: [{ name: 's', value: '6;2;3;5;7;1;2;4;6;2;3;17;2;3' }],
            tests: [{ name: 's', value: '1;12;23;5;7;1;2;4;-6;3' }],
            exampleCode: `var maxv = Math.max( ...s.split(';').map( v => Number( v ) ) )\nvar minv = Math.min( ...s.split(';').map( v => Number( v ) ) )\nreturn maxv + minv`,
            //code: `s.split(';').map( v => Number(v) ).reduce( (o, v) => o += v, 0 )`,
            code: `\r`,
            testResult: 52, result: 63
        },
        {
            type: "code-1",
            title: "Az s string számokat tartalmaz, pontosvesszővel elválasztva.",
            text: "Határozza meg a számok számtani közepét (átlagát) két tizedesjegy pontosságúra kerekítve!<br>A megadott példaprogram a számok összegét határozza meg.",
            //tex: '\\frac{\\sum _{i=1}^n\\:x_i}{n}',
            links: [
                { a: 'MDN String -> split', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split' },
                { a: 'MDN Array -> map', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map' },
                { a: 'MDN Number', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number' },
                { a: 'MDN Array -> reduce', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce' },
                { a: 'MDN Number -> toFixed', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed' }
            ],
            variables: [{ name: 's', value: '`6;2;3;5;7;1;2;4;6;2;3;-1;0;3`' }],
            tests: [{ name: 's', value: '`1;12;23;5;7;1;2;4;-6;3`' }],
            exampleCode: `var sum = s.split(';').map( v => Number(v) ).reduce( (o, v) => (o.o+=v,o.n++,o), {o:0,n:0} )\nreturn sum.o`,
            code: `var sum = s.split(';').map( v => Number(v) ).reduce( (o, v) => (o.o+=v,o.n++,o), {o:0,n:0} )\nreturn sum.o`,
            testResult: 5.2, result: 3.07
        },
        {
            type: "info",
            title: "Típusok<br>",
            links: [{ a: 'Standard defined tasksJS stuctures and types', href: 'https://developer.mozilla.org/hu/docs/Web/JavaScript/Guide/Grammar_and_types' }],
            exampleCode: `var x = 1; \nvar y = x; \ny++; \nconsole.log( x ); \n\nvar x = [1]; \nvar y = x; \ny[0]++; \nconsole.log( x[0] );`,
            text: `A JavaScript-ben gyakorlatilag minden típus objektum, de a primitívek másként viselkednek értékadás során mint az objektumok.
            Futtassa a pédaprogramot saját programozási környezetében és próbálja megérteni mitörténik és miért!`
        }
    ],
}
/*
mezők:

type        3 lehet: info, code, button. Ez nem jelenik meg az oldalon
title       főcím
text
img
links
links2
exampleCode
variables
tests
code
testResult
options
result
tex

*/

export default js_alapok;