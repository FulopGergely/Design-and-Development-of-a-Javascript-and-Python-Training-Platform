// eslint-disable-next-line no-undef
module.exports = {
    id: '2',
    title: 'JavaScript alapok',
    author: 'Dr. Németh Tamás',
    date: '2020. április 31.',
    pht: [
        {ph: 0, eval:'elégtelen (1)'},
        {ph: 3, eval:'elégséges (2)'},
        {ph: 5, eval:'közepes (3)'  },
        {ph: 7, eval:'jó (4)'       },
        {ph: 9, eval:'jeles (5)'    }
    ],
    autoid: true,
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
        {
            type: "info",
            question: "JavaScript futtatása<br>",
            links: [
                {a: 'NodeJS', href: 'https://nodejs.org/en/'},
                {a: 'Visual Studio Code', href: 'https://code.visualstudio.com/'},
                {a: 'Atom', href: 'https://atom.io/'},
                {a: 'Plain Text', href: 'https://en.wikipedia.org/wiki/Plain_text'}
            ],
            ecode: `console.log('Hello World!');`,
            q2: `Egy másik lehetőség a node.js használata. Ehhez a node.js és a text editor telepítése után hozzunk létre egy valami.js fájlt az alábbi taralommal. 
                A kód futtatására ezután a node
                terminal paranccsal lesz lehetőségünk:<br><br>><code>node valami.js</code><br><br>A .js fájlnak természetesen ekkor az aktuális könyvtárban kell lennie.`
        },
        {
            type: "info",
            question: "Kommentek<br>",
            links: [{a: 'Comments on MDN', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Comments'}],
            ecode: `// Egysoros komment.\nvar x = 1; // Egysoros komment kódsor mögött.\n/* \nTöbbsoros \nkomment. \n*/\nconsole.log( x + 1 );`,
            q2: `
            A <i>JavaScript</i>ben a kommenteket általában az egyes programrészek rövid bemutatására használjuk.<br>
            A kommentbe helyezett programsorok nem hajtódnak végre, így tesztelés céljából is praktikus a használata.<br> 
            Az egysoros kommentek a <code>//</code> jellel kezdődnek.           
            <br>Bármi amit utána írunk, nem hajtódik végre.<hr>A többsoros kommentek a <code>/* ... */</code> jelek közé kell szúrni.
            <br>Bármi amit a két jel közé szírunk be, nem hajtódik végre.`
        },
        {
            type: "code",
            question: "Kommentelje ki az alábbi programkódból...",
            q2: "az <code> a++;</code> utasítást tartalmazó sort!",
            links: [
                {a: 'Comments on MDN', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Comments'}
            ],
            variables: [{ name: 'b', value: 6}],
            tests: [{ name: 'b', value: 8 }],
            ecode: `var a=b+5;\na++;\nreturn a`,
            code: `var a=b+5;\na++;\nreturn a`,
            rans: 13, fans: 11
        },
        {
            type: "info",
            question: "Változók deklarációja<br>",
            links: [{a: 'Declarations', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Declarations'}],
            ecode: `var s = 'cica'; \nvar a, b, c = 1;\nvar obj12 = {}, arr = [];\n`,
            q2: `A változókat tekinthetjük egy olyan absztraktciónak a programon belül, melyhez tetszőleges (típusú) értéket rendelhetünk.<br>
            A változó nevét azonosítónak hívjuk és az elnevezés formája szabályokhoz van kötve:<br>
            <li>a kezdő karakter egy tetszőleges UniCode betű, vagy _ jel, vagy $ jel lehet,</li>
            <li>a további karakterek a fentieken túl (0-9) számjegyek is lehetnek.</li><hr>
            Változókat a <code>var</code>, <code>let</code> vagy a <code>const</code>kulcsszó segítségével deklarálhatunk:`
        },
        {
            type: "code",
            question: "Definiáljon egy zebra azonosítójú változót...",
            q2: "a változó vegye fel a <code>3</code> numerikus értéket! A deklarációt a return parancs elé írja!",
            links: [
                {a: 'Comments on MDN', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Comments'}
            ],
            variables: [{ name: 'csík', value: 6}],
            tests: [{ name: 'csík', value: 12}],
            ecode: `var zebra = 3;\nreturn zebra + csík;`,
            code: `//ide írja a deklarációt!\nreturn zebra + csík;`,
            rans: 15, fans: 9
        },
        {
            type: "info",
            question: "Típusok<br>",
            links: [{a: 'Standard defined data stuctures and types', href: 'https://developer.mozilla.org/hu/docs/Web/JavaScript/Guide/Grammar_and_types'}],
            ecode: `var logikai = true;\nvar szám = 4;\nvar szöveg = 'cica';\nvar objektum = {};\nvar tömb = [1, 2, 3];\n`,
            q2: `A változó típusát az értékadás határozza meg.<br>Az alábbi pédaprogram rendre a következő változókat definiálja:
                <br><li>logikai</li><li>szám</li><li>szöveges</li><li>objektum</li><li>tömb</li>`
        },
        {
            type: "buttons",
            q2: 'A kifejezések kiértékelése balról jobbra történik.<br>Olvassa el az operátorokról szóló részt, majd tippelje meg mit ír ki a megadott pédaprogram!',
            question: "Kifejezések<br>",
            links: [
                {a: 'Operators', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators'},
                {a: 'Operators', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Exponentiation'}
            ],
            ecode: "var ↀ = 3, ↈ=11;\nconsole.log(\n\tↀ**ↀ--*ↀ-++ↈ\n);",
            options: [22, 0, 11, 42, 72, 112, NaN].sort(),
            goodo: 42
        },
        {
            type: "info",
            question: "JavaScript alapjai<br>",
            links: [
                {a: 'MDN', href: 'https://developer.mozilla.org/hu/docs/Web/JavaScript'},
                {a: 'JavaScript - PP', href: 'http://ctp.mkprog.eu/hu/javascript'},
                {a: 'JavaScript - ELTE', href: 'http://nyelvek.inf.elte.hu/leirasok/JavaScript/index.php?chapter=1'},
                {a: 'JavaScript - Kozma', href: 'http://users.atw.hu/javascript/'}
            ],
            q2: `Olvassa el a hivatkozások tananyagát, majd a tanultakat próbálja ki a saját programozási környezetében!<br>
                 A következő feladatok megoldása során ezeket és bármilyen más segédanyagot felhasználhat!`
        },
        {
            type: "info",
            question: "JavaScript Objektumok<br>",
            links: [
                {a: 'MDN Object', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object'},
                {a: 'Object-oriented programming', href: 'https://en.wikipedia.org/wiki/Object-oriented_programming'},
            ],
            q2: `Az objektum megadásához a <code>{}</code> karakter használható. Az objektum nagyon fontos szerepet tölt be a JavaScript nyelvben és
                 a programozásban általában is. Gyakorlatilag minden önállóan azonosítható entitás, tehát bármi ami létezhet, objektumnak tekinthető.\n
                 Egy objektumnak lehetnek tulajsonságai és metódusai, melyekre a JavaScript-ben <code>.</code>-tal hivatkozunk.`,
            ecode: "var o = { \n\tname: 'John Doe',\n\tage: 39,\n\töregszik( év = 1 ) { \n\t\tthis.age += év \n\t}\n};\no.öregszik( 3 ); \t// az o objektum öregszik metódusának meghívása\nconsole.log(\n\to.age \t\t\t// az o objektum age tulajdonságának elérése\n);"
        },
        {
            type: "buttons",
            question: 'Értelmezze az alábbi programrészletet!',
            q2: "Az alábbi program mit logol a console-ra?<br>",
            options: [39, "John Doe", 40, 42, 3, "cica", "öregszik", 0, 'age', 'o.age'].sort(),
            ecode: "var o = { \n\tname: 'John Doe',\n\tage: 39,\n\töregszik( év = 1 ) { \n\t\tthis.age += év \n\t}\n};\no.öregszik( 3 ); \t// az o objektum öregszik metódusának meghívása\nconsole.log(\n\to.age \t\t\t// az o objektum age tulajdonságának elérése\n);",
            goodo: 42
        },
        {
            type: "code",
            question: "JavaScript Függvények<br>",
            links: [
                {a: 'MDN Object', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions'},
            ],
            q2: `Egy függvény úgy fogható fel, mint egy matematikai gép, ami a bemenetén kapott értékeket (bemeneti paraméterek) a kivánt kimeneti értékké konvertálja (visszatérési érték).\n
            Egy objektum egy metódusa is fügvvény. A visszatérési értéket a <code>return</code> utasítással állíthatjuk be.<br>
            Módosítsa az f metódust, hogy a visszatérési érték a két bemeneti változó összege legyen!<br>A leckében a továbbiakban megjelenő feladatok mind ezt a behelyettesítési  metódust követik majd.`,
            variables: [{ name: 'a', value: 3 }, { name: 'b', value: 5 }],
            tests: [{ name: 'a', value: 2 }, { name: 'b', value: 4 }],
            ecode: `f(a,b) {\n\tvar c=...;\n\treturn c;\n}`,
            code: `a*b`,
            rans: 6, fans: 8
        },
        {
            type: "info",
            question: "JavaScript Stringek<br>",
            links: [
                {a: 'MDN String', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'},
            ],
            q2: `A stringek megadásához használhatjuk a <code>"idézőjel"</code>, az <code>'aposztróf'</code>,
                vagy a <code>\`lierál\`</code> karaktereket.<br>
                A literál több soros stringet is tartalmazhat és használható benne a template szintaxis: <code>\${ v }</code>,
                ami változó értékének behelyettesítését végzi.
                `,
            ecode: "var macs = 'cica';\nconsole.log(`\nEgy ${ macs }, két ${ macs }, száz ${ macs }, haj!\nAzt hiszi, hogy megfogja az egeret.\n`); "
        },
        {
            type: "code",
            question: "Módosítsa a programot...",
            links: [
                {a: 'MDN String', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'},
            ],
            q2: `hogy a visszatérési érték a <code>cica</code> karaktersorozat legyen!`,
            ecode: `return 'csacsi'`,
            code: `return 'csacsi'`,
            rans: 'cica', fans: 'cica'
        },
        {
            type: "code",
            question: "Stringek mint objektumok.",
            links: [
                {a: 'MDN String -> length', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length'},
            ],
            q2: `Mivel a JavaScript-ben a primitív típusok is objektumok, egyes jellemzőik és metódusaik az objektumokra jellemző módon hivatkozhatóak.<br>
            adja meg az s string hosszát az objektumoknál ismertetett módszerrel! A stinrg hosszát a String objektum <code>length</code> jellemzőének kiolvasásával kérdezhetjük le.`,
            variables: [{ name: 's', value: '"indul a görög aludni"' }],
            tests: [{ name: 's', value: '`géza kék az ég`' }],
            code: '\r',
            rans: 14, fans: 20
        },
        {
            type: "info",
            question: "JavaScript Tömbök<br>",
            links: [
                {a: 'MDN Array -> fill', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill'},
                {a: 'MDN Array -> map',  href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map'}
            ],
            q2: `A tömb megadásához a <code>[]</code> karakter vagy az <code>Array()</code> konstruktor használható. A tömb is objektumként viselkedik,
            ezért a t1 és t2 definíció ekvivalens.\n
            A t2 definíciójában az Array(10) létrehoz egy 10 elemű tömböt, majd feltölti 0-val. A map metódus ezt a 10 darab nullát (0) tartalmazó
            tömböt módosítja a paraméterben kapott függvény végrehajtásával. Az Array objektum map metódusa egy függvényt vár paraméterként, melynek az első bemeneti változója
            az aktuális tömb-elem értéke, a második paraméter pedig ennek indexe. Mivel az első tömb-elem indexe 0, ezért az első értéket 0+1=1 értékre állítja be és így tovább.`,
            ecode: "var t1 = [1 ,2 ,3, 4, 5, 6, 7, 8, 9, 10];\nvar t2 = Array(10).fill(0).map((v,i)=>i+1);"
        },
        {
            type: "info",
            question: "JavaScript Tömbök<br>",
            links: [
                {a: 'MDN Array -> fill',  href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill'},
                {a: 'MDN Array -> map',   href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map'},
                {a: 'MDN Array -> sort',  href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort'},
                {a: 'MDN Array -> slice', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice'},
                {a: 'MDN Math -> random', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random'}
            ],
            q2: `Az alábbi kódrészlet a jövő heti 5-ös lottó nyerőszámait számítja ki. A megértéshez olvassa el az MDN súgót a felhasznált metódusokról,
                 majd próbálgassa ki őket külön-külön is a saját fejlesztői környezetében!`,
            ecode: "var t1 = Array( 90 )\n\t\t\t.fill( 0 )\n\t\t\t.map( ( v, i ) => i + 1 )\n\t\t\t.sort( () => Math.random() - 0.5 )\n\t\t\t.slice( 0, 5 )\n\t\t\t.sort( ( a, b ) => a - b );"
        },
        {
            type: "code",
            question: "Az s string számadatokat tartalmaz, pontosvesszővel elválasztva.",
            q2: "Határozza meg az adatok darabszámát!",
            links: [
                {a: 'MDN String -> split', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split'},
                {a: 'MDN Array -> length', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length'},
                {a: 'MDN Number',          href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number'}
            ],
            variables: [{ name: 's', value: '`6;2;3;5;7;1;2;4;6;2;3;17;2;3`'}],
            tests: [{ name: 's', value: '`1;12;23;5;7;1;2;4;-6;3`'}],
            code: `\r`,
            rans: 10, fans: 14
        },
        {
            type: "code",
            question: "Az s string számadatokat tartalmaz, pontosvesszővel elválasztva.",
            q2: `Határozza meg a legnagyobb elem értékét! A megoldáshoz a tömbbé alakítás után használhatja a sort metódust a csökkenő rendezéshez, majd az így lapott tömb 0. eleme a legnagyobb.
            `,
            links: [
                {a: 'MDN String -> split', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split'},
                {a: 'MDN Array -> length', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort'},
                {a: 'MDN Number',          href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number'}
            ],
            variables: [{ name: 's', value: '`6;2;3;5;7;1;2;4;6;2;3;17;2;3`'}],
            tests: [{ name: 's', value: '`1;12;23;5;7;1;2;4;-6;3`'}],
            code: `\r`,
            rans: 23, fans: 17
        },
        {
            type: "code",
            question: "Az s string számadatokat tartalmaz, pontosvesszővel elválasztva.",
            q2: `Határozza meg a legnagyobb elem helyzetét, azaz azt, hogy hanyadik adat a legnagyobb adat!<br>
                 A megadott példaprogram egy kiindulási átalakítást végez a bemeneti adatokon, amely a megoldást karnyújtásnyi közelségbe helyezi.<br>
                 Próbálja előbb megérteni a pédaprogram működését!`,
            links: [
                {a: 'MDN String -> split', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split'},
                {a: 'MDN Array -> length', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort'},
                {a: 'MDN Number', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number'}
            ],
            variables: [{ name: 's', value: '`6;2;3;5;17;1;2`'}],
            tests: [{ name: 's', value: '`1;12;23;5;7;1;2;4;-6;3`'}],
            ecode: `s\t.split(';')\n\t.map((v,i)=>[i+1,Number(v)])\n\t.sort((a,b)=>b[1]-a[1]);`,
            code: `s\t.split(';')\n\t.map((v,i)=>[i+1,Number(v)])\n\t.sort((a,b)=>b[1]-a[1]);`,
            rans: 3, fans: 5
        },
        {
            type: "code",
            question: "Az s string számokat tartalmaz, pontosvesszővel elválasztva.",
            q2: `Határozza meg a számok összegét!<br>A megadott példaprogram a tömbben előforduló legnagyobb és legkisebb szám összegét adja meg.<br>
                 A megoldáshoz a reduce metódus alkalmazása javasolt.`,
            tex: '\\sum _{i=1}^n\\:x_i',
            links: [
                {a: 'MDN String -> split', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split'},
                {a: 'MDN Array -> map',    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map'},
                {a: 'MDN Number',          href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number'},
                {a: 'MDN Array -> reduce', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce'}
            ],
            variables: [{ name: 's', value: '`6;2;3;5;7;1;2;4;6;2;3;17;2;3`'}],
            tests: [{ name: 's', value: '`1;12;23;5;7;1;2;4;-6;3`'}],
            ecode: `var maxv = Math.max( ...s.split(';').map( v => Number( v ) ) )\nvar minv = Math.min( ...s.split(';').map( v => Number( v ) ) )\nreturn maxv + minv`,
            //code: `s.split(';').map( v => Number(v) ).reduce( (o, v) => o += v, 0 )`,
            code: `\r`,
            rans: 52, fans: 63
        },
        {
            type: "code",
            question: "Az s string számokat tartalmaz, pontosvesszővel elválasztva.",
            q2: "Határozza meg a számok számtani közepét (átlagát) két tizedesjegy pontosságúra kerekítve!<br>A megadott példaprogram a számok összegét határozza meg.",
            tex: '\\frac{\\sum _{i=1}^n\\:x_i}{n}',
            links: [
                {a: 'MDN String -> split',   href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split'},
                {a: 'MDN Array -> map',      href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map'},
                {a: 'MDN Number',            href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number'},
                {a: 'MDN Array -> reduce',   href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce'},
                {a: 'MDN Number -> toFixed', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed'}
            ],
            variables: [{ name: 's', value: '`6;2;3;5;7;1;2;4;6;2;3;-1;0;3`'}],
            tests: [{ name: 's', value: '`1;12;23;5;7;1;2;4;-6;3`'}],
            ecode: `var sum = s.split(';').map( v => Number(v) ).reduce( (o, v) => (o.o+=v,o.n++,o), {o:0,n:0} )\nreturn sum.o`,
            code: `var sum = s.split(';').map( v => Number(v) ).reduce( (o, v) => (o.o+=v,o.n++,o), {o:0,n:0} )\nreturn sum.o`,
            rans: 5.2, fans: 3.07
        },
        {
            type: "info",
            question: "Típusok<br>",
            links: [{a: 'Standard defined data stuctures and types', href: 'https://developer.mozilla.org/hu/docs/Web/JavaScript/Guide/Grammar_and_types'}],
            ecode: `var x = 1; \nvar y = x; \ny++; \nconsole.log( x ); \n\nvar x = [1]; \nvar y = x; \ny[0]++; \nconsole.log( x[0] );`,
            q2: `A JavaScript-ben gyakorlatilag minden típus objektum, de a primitívek másként viselkednek értékadás során mint az objektumok.
            Futtassa a pédaprogramot saját programozási környezetében és próbálja megérteni mitörténik és miért!`
        }
    ],
    tasksPy: [
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
            question: "Python futtatása<br>",
            links: [
                {a: 'Atom', href: 'https://atom.io/'},
                {a: 'Visual Studio Code', href: 'https://code.visualstudio.com/'},
                {a: 'Plain Text', href: 'https://en.wikipedia.org/wiki/Plain_text'},
                {a: 'Chrome', href: 'https://www.google.com/chrome/'},
                {a: 'GitHub', href: 'https://github.com/'}
            ],
            ecode: `\n\n    print("Hello World!")\n\n`,
            q2: `A Python nyelven írt programok futtatásához szükségünk van egy értelmezőre, ami az alábbi linken érhető el: <br><br> https://www.python.org/downloads/ <br><br>
                A telepítés sikerességét ellenőrizhetjük a parancssorban az alábbi paranccsal: (windows-on és linuxon): python --version

                <br>Hozzunk létre egy .py kiterjesztésű fájlt, szerkesztéséhez plain text szerkesztőre lesz szükségünk. Ehhez az Atom vagy a Microsoft Visual Studio Code is jó választás, mindkét program ingyenes, minden platformon elérhető és számos kiegészítő funkcióval rendelkezik. (Syntax highlighting, Markdown preview, Github és GitLab támogatás, ...)
`
        },
        {
            type: "info",
            question: "Kommentek<br>",
            links: [{a: 'Comments', href: 'https://www.w3schools.com/python/python_comments.asp'}],
            ecode: `#Egysoros komment.\nx = 4 #Egysoros komment kódsor mögött.\n""" \nTöbbsoros \nkomment. \n"""\nprint( x )`,
            q2: `
            A <i>Python</i>ban a kommenteket általában az egyes programrészek rövid bemutatására használjuk.<br>
            A kommentbe helyezett programsorok nem hajtódnak végre, így tesztelés céljából is praktikus a használata.<br> 
            Az egysoros kommentek a <code>#</code> jellel kezdődnek.           
            <br>Bármi amit utána írunk, nem hajtódik végre.<hr>A többsoros kommentek a <code>""" ... """</code> jelek közé kell szúrni.
            <br>Bármi amit a két jel közé szírunk be, nem hajtódik végre.`
        },
        {
            type: "info",
            question: "Kommentek<br>",
            links: [{a: 'Comments', href: 'https://www.w3schools.com/python/python_comments.asp'}],
            ecode: `// Egysoros komment.\nvar x = 1; // Egysoros komment kódsor mögött.\n/* \nTöbbsoros \nkomment. \n*/\nconsole.log( x + 1 );`,
            q2: `
            A <i>Python</i>ban a kommenteket általában az egyes programrészek rövid bemutatására használjuk.<br>
            A kommentbe helyezett programsorok nem hajtódnak végre, így tesztelés céljából is praktikus a használata.<br> 
            Az egysoros kommentek a <code>#</code> jellel kezdődnek.           
            <br>Bármi amit utána írunk, nem hajtódik végre.<hr>A többsoros kommentek a <code>""" ... """</code> jelek közé kell szúrni.
            <br>Bármi amit a két jel közé szírunk be, nem hajtódik végre.`
        },
        {
            type: "info",
            question: "Kommentek<br>",
            links: [{a: 'Comments', href: 'https://www.w3schools.com/python/python_comments.asp'}],
            ecode: `# This program adds two numbers
num1 = 1.5
num2 = 6.3
# Add two numbers
sum = num1 + num2
# Display the sum print('The sum of {0} and {1} is {2}'.format(num1, num2, sum))q2: `,
            q2: `
            A <i>Python</i>ban a kommenteket általában az egyes programrészek rövid bemutatására használjuk.<br>
            A kommentbe helyezett programsorok nem hajtódnak végre, így tesztelés céljából is praktikus a használata.<br> 
            Az egysoros kommentek a <code>#</code> jellel kezdődnek.           
            <br>Bármi amit utána írunk, nem hajtódik végre.<hr>A többsoros kommentek a <code>""" ... """</code> jelek közé kell szúrni.
            <br>Bármi amit a két jel közé szírunk be, nem hajtódik végre.`
        },
        {
            type: "code",
            question: "Kommentelje ki az alábbi programkódból...",
            q2: "az <code> a++;</code> utasítást tartalmazó sort!",
            links: [
                {a: 'Comments on MDN', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Comments'}
            ],
            variables: [{ name: 'b', value: 6}],
            tests: [{ name: 'b', value: 8 }],
            ecode: `var a=b+5;\na++;\nreturn a`,
            code: `var a=b+5;\na++;\nreturn a`,
            rans: 13, fans: 11
        },
]
}
