module.exports = {
    id: '1',
    title: 'Informatika kvíz',
    author: 'Dr. Németh Tamás',
    date: '2020. március 31.',
    pht: [
        {ph: 0, eval:'elégtelen (1)'},
        {ph: 2, eval:'elégséges (2)'},
        {ph: 4, eval:'közepes (3)'},
        {ph: 6, eval:'jó (4)'},
        {ph: 8, eval:'jeles (5)'}
    ],
    autoid: true,
    tasks: [
        {
            type: "order",
            q2: '<br><br>',
            question: "Rendezd abc sorrendbe!<br>",
            img: "f01.jpg",
            options: ["USB", "UTP", "FTC", "FTP", "BNC", "RSA", "BTS"],
            goodo: ["USB", "UTP", "FTC", "FTP", "BNC", "RSA", "BTS"].sort()
        },
        {
            type: "buttons",
            q2: '<br><br>',
            question: "Milyen kábel látható az alábbi képen?<br>",
            links: [{a: 'Computer Cable types', href:'https://hardsoft-support.kayako.com/article/66-computer-cable-types-and-descriptions'}],
            img: "f01.jpg",
            options: ["USB", "UTP", "FTC", "FTP", "BNC", "RSA", "BTS"].sort(),
            goodo: "UTP"
        },
        {
            type: "info",
            question: "Számrendszerek<br>",
            links: [{a: 'Wikipedia', href: 'https://hu.wikipedia.org/wiki/Tizenhatos_sz%C3%A1mrendszer'}],
            q2: `A tizenhatos (hexadecimális) számrendszer a 16-os számon alapuló számrendszer, az informatika kulcsfontosságú
                 számrendszere (zsargonban: hexa).<hr>
                 A tizenhatos számrendszer a <code>"0", "1", "2", "3", "4", "5", "6", "7", "8", "9"</code>
                 számjegyeken kívül az <code>"A", "B", "C", "D", "E", "F"</code> karaktereket használja számjegyként, 
                 ezek segítségével ábrázolja a számokat.<br>
                 A 0–9 számjegyek használata értelemszerű (azaz: a tízes számrendszernek megfelelő), az A számjegy 10-et,
                 a B számjegy 11-et, a C számjegy 12-t, a D számjegy 13-at, 
                 az E számjegy 14-et és az F számjegy 15–öt jelöl (ez összesen 16 számjegy, tekintettel arra,
                 hogy a nulla az első).<hr>
                 Az eltérő számrendszer használatára általában a szám után írt <sub>h</sub> betű utal, például: <code>C9<sub>h</sub></code>,<br>
                 vagy a szám elé írt $ jel, pl.: <code>$C9</code>.`
        },
        {
            type: "info",
            question: "Átváltás számrednszerek között<br>",
            links: [{a: 'Wikipedia', href: 'https://hu.wikipedia.org/wiki/Tizenhatos_sz%C3%A1mrendszer'}],
            q2: `A tizenhatos számrendszerben leírt szám számjegyei tulajdonképpen a tizenhatos szám 0-val kezdődő és
            számjegyenként eggyel növekvő exponensei a szám
            legkisebb helyiértékű számjegyeitől haladva a legnagyobb helyiértékűekig (azaz jobbról balra).<br>
            Például 3F8H a tízes számrendszerben
            1016 (= 3×162 + 15×161 + 8×160 = 3×256 + 15×16 + 8×1 = 768+ 240 + 8 = 1016).<hr>`,
            img: "f02.jpg",
        },
        {
            type: "number",
            links: [{a: 'Wikipedia', href: 'https://hu.wikipedia.org/wiki/Tizenhatos_sz%C3%A1mrendszer'}],
            img: "f02.jpg",
            question: "Mennyi a 1F hexadecimális szám 10-es számrendszerbeli értéke?<br>",
            rans: 31
        },
        {
            type: "order",
            question: "Tegye növekvő sorrendbe az alábbi mennyiségeket!",
            q2: "<br><br><br>",
            img: "f03.jpg",
            options: ["1000 kByte", "10 MByte", "10 GByte", "1 TByte", "1/100 PByte"].sort(),
            goodo: ["1000 kByte", "10 MByte", "10 GByte", "1 TByte", "1/100 PByte"]
        },
        {
            type: "multiselect",
            question: "Az alábbiak közül melyek programozási nyelvek?",
            img: "f05.jpg",
            links: [{a: 'List of programming languages', href:'https://en.wikipedia.org/wiki/List_of_programming_languages'}],
            options: ["JS", "GS", "F#", "A++", "C++", "C", "C#", "J++"].sort(),
            goodo: ["JS", "GS", "F#", "A++", "C++", "C", "C#", "J++"]
        },
        {
            type: "buttons",
            question: "Mennyi a 3200 kbit/s átvitelis sebesség MByte/s -ban mérve?",
            img: "f06.png",
            options: ["0,39", "3,125", "25", "400", "4000", "40 000"],
            goodo: "0,39"
        },
        {
            type: "buttons",
            question: "Mi az alábbi js kifejezés visszatérési értéke?",
            q2: "A visszatérési érték típusa is meghatározandó",
            code: `'9' + 1`,
            options: ['10', '91', '"10"', '"91"', '9', '1' ],
            goodo: '"91"'
        },
        {
            type: "number",
            question: "Mi az alábbi js kifejezés visszatérési értéke?",
            links: [
                {a: 'filter', href:'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill'},
                {a: 'reduce', href:'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length'}
            ],
            code: `Array(3).fill(2).length`,
            min: 0,
            max: 10,
            rans: 3
        },
        {
            type: "number",
            question: "Mi az alábbi js kifejezés visszatérési értéke?",
            links: [
                {a: 'sort', href:'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort'}
            ],
            code: `Array(20,1,10,2,30,3).sort( ( a, b ) => a - b )[1]`,
            min: 0,
            max: 30,
            rans: 2
        },
        {
            type: "number",
            question: "Mi az alábbi js kifejezés visszatérési értéke?",
            links: [
                {a: 'filter', href:'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter'},
                {a: 'reduce', href:'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce'}
            ],
            code: `[ 0, 1, 2, 3, 4 ]\t.filter( v => v > 2 )\n\t\t\t\t\t.reduce( ( o,v ) => o += v, 0 )`,
            min: 0,
            max: 10,
            rans: 7
        },
        {
            type: "code",
            question: "Módosítsa a programot!",
            q2: "Az új program határozza meg v tömbben a 3-nál nagyobb számok összegét!",
            links: [
                {a: 'filter', href:'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter'},
                {a: 'reduce', href:'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce'}
            ],
            tex: '\\sum _{i=1}^n\\:x^2_i|x_i>3',
            variables: [{ name: 'v', value: '[1, 2, 3, 4, 5 ]'}],
            tests: [{ name: 'v', value: '[1, 2, 3, 4, 5, 6, 1, 2, 1, 2, 4 ]'}],
            ecode: `v\t.filter( v => v > 2)\n\t.reduce( ( o,v ) => o += v, 1 )`,
            code: `v\t.filter( v => v > 2)\n\t.reduce( ( o,v ) => o += v, 1 )`,
            rans: 19, fans: 9
        },
        {
            type: "code",
            question: "Módosítsa a programot!",
            q2: "Az új program határozza meg v tömbben szereplő pozitív számok szorzatát!",
            tex: '\\prod_{i=1}^n\\:x_i|x_i>0',
            links: [
                {a: 'filter', href:'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter'},
                {a: 'reduce', href:'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce'}
            ],
            variables: [{ name: 'v', value: '[0, 1, 2, 3, 4 ]'}],
            tests: [{ name: 'v', value: '[1, 2, 3, 1, 5, 0, 1, 2, 1, 2, 0 ]'}],
            code: `v\t.filter( v => v > 2 )\n\t.reduce( ( o,v ) => o += v, 0 )`,
            ecode: `v\t.filter( v => v > 2 )\n\t.reduce( ( o,v ) => o += v, 0 )`,
            rans: 120, fans: 24
        },
        {
            type: "code",
            question: "Írjon programot mely meghatározza...",
            q2: "a v tömb 3. legnagyobb elemét",
            links: [
                {a: 'sort', href:'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort'}
            ],
            variables: [{ name: 'v', value: '[1, 4, 3, 14, 5, -3 ]'}],
            tests: [{ name: 'v', value: '[11, 2, 3, 4, 5, 6, 1, 2, 1, 2, 4 ]'}],
            ecode: `v[2]`,
            code: `v.`,
            rans: 2, fans: 3
        }
  ]
}