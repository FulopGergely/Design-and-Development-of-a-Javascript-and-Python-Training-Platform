<template>
  <div class="o">
      <div class="slide">
        <div v-if="side===0">
            <div class="feladat">
                <div class="cim">- = | SZTE | = -</div>
                <br><hr>
                <div class="cim" v-html="config.title" />
                <hr>
                {{ config.author }}
                <br>
                <br>
                <hr>
                <br>
                Bejelentkezés
                <br>
                <br>
                <img src="gl.png" class="btn" @click="signIn" />
                <div v-if="name">
                    <br>
                    Név:
                    <br>
                    {{ name }}
                </div>
            </div>
            <p>{{ (new Date()).toISOString().split("T")[0] }}</p>
        </div>
        <span v-for="task in config.tasks" :key="task.id">
            <div v-if="side===task.id">
                <div class="feladat">
                    <span v-html="task.question" />
                    <hr>
                    <div v-if="task.q2" class="q2" v-html="task.q2" />
                    <img v-if="task.img" class="rajz" :src="'./' + task.img" />
                    <div v-if="task.links" class="small">
                        <span v-for="(link, i) in task.links" :key="i+'link.a'">
                            | <a :href="link.href" :target="i+'link.a'">{{ link.a }}</a> |
                        </span>
                    </div>
                    <img v-if="task.img2" class="rajz" :src="'./' + task.img2" />
                    <div v-if="task.links2" class="small">
                        <span v-for="(link, i) in task.links2" :key="i+'link.a'">
                            | <a :href="link.href" :target="i+'link.a'">{{ link.a }}</a> |
                        </span>
                    </div>
                    <div v-if="task.tex" >
                        <hr>
                        <span class="katex" v-katex="task.tex" />
                        <hr>
                    </div>
                    <div v-if="task.variables" >
                        <span class="katex" v-html="task.variables.map( v => `${ v.name } = ${ v.value }` ).join('; ')" />
                    <hr>
                    </div>
                    <div v-if="task.ecode">
                    <span  class="kcim">Példaprogram:</span>
                    <prism-editor
                        class="ec"
                        v-model="task.ecode"
                        language="js"
                        :readonly="true" />
                    </div>
                    <div v-if="task.code">
                    <span v-if="task.type==='code'" class="kcim">Kérem adja meg a megoldás kódját:</span>
                    <span v-if="task.code && task.type!=='code'"><br><br></span>
                    <prism-editor
                        v-model="mycode"
                        language="js"
                        :readonly="task && task.type!=='code'"
                        @change="chc" />
                    </div>
                    <span v-if="task.code && task.type!=='code'"><br>Kérem adja meg a kód futásának eredményét!</span>
                    <div class="o" v-if="task.code" v-html="i1" />
                </div>
                <div v-if="task && task.type==='number'">
                    <span v-if="ich(task)">
                        <button class="p"  @click="side--">Vissza</button>
                        <div class="s40" />
                    </span>
                    <button class="p" @click="passz">Passz</button>
                    <span v-if="task && (task.min || task.max)">
                        <div class="s40" />
                        <button @click="deci1(task.min)">-</button>
                        <input :min="task.min" :max="task.max" type="range" v-model.number="i1">
                        <button @click="inci1(task.max)">+</button>
                        <div class="s40" />
                    </span>
                    <input v-else type="number" v-model.number="i1" @keyup.enter="check( task.rans )" />
                    <button class="send" :disabled="!i1" @click="check( task.rans )">Megad</button>
                </div>
                <div v-if="task && task.type==='buttons'">
                        <button v-if="ich(task)" class="p"  @click="side--">Vissza</button>
                        <div class="s20" />
                        <button class="p" @click="passz">Passz</button>
                        <div class="s20" />
                        <span v-for="opt in task.options" :key="opt">
                            <button class="send" v-if="task.goodo === opt" @click="jo">{{ opt }}</button>
                            <button class="send" v-else @click="rossz">{{ opt }}</button>
                        </span>
                </div>
                <div v-if="task && task.type==='code'">
                        <span v-if="ich(task)" class="o">
                            <button class="p"  @click="side--">Vissza</button>
                            <div class="s20" />
                        </span>
                         <span>
                            <button v-if="t1[0]!=='c1e3'" class="p" @click="passz">Passz</button>
                            <button v-else class="send" @click="jo()">Tovább</button>
                            <div class="s40" />
                        </span>
                        <span class="o">
                            <button @click="mycode=task.code">Reset</button>
                            <div class="s20" />
                        </span>
                        <span class="run" v-if="task.ecode">
                            <button @click="run(task.ecode, task.variables, task.tests, task.rans, task.fans)">Péda futtatása</button>
                            <div class="s20" />
                        </span>
                        <span>
                            <button
                                @click="run(mycode, task.variables, task.tests, task.rans, task.fans)"
                                :class="t1[0]!=='c1e3'?'send':''">Megoldás próbája</button>
                            <div class="s40" />
                        </span>
                        <span>
                            <button :class="t1[0]!=='c1e3'?'':'send'" :disabled="t1[0]!=='c1e3'" @click="jo()">Tovább</button>
                        </span>
                </div>
                <div v-if="task && task.type==='multiselect'">
                    <button v-if="ich(task)" class="p"  @click="side--">Vissza</button>
                    <div class="s20" />
                    <button class="p" @click="passz">Passz</button>
                    <div class="s20" />
                    <span v-for="opt in task.options" :key="opt">
                        <button :class="getms( opt )" @click="click(opt)">{{ opt }}</button>
                    </span>
                    <div class="s20" />
                    <button :class="t1.length?'send':''" :disabled="!t1.length" @click="checkms( t1, task.goodo )">KÉSZ</button>
                </div>
                <div v-if="task && task.type==='order'"><div class="s20" />
                    <span v-if="ich(task)">
                        <button class="p"  @click="side--">Vissza</button>
                        <div class="s20" />
                    </span>
                    <button class="p" @click="passz">Passz</button><div class="s20" />
                    <draggable v-model="task.options" animation="150" class="db">
                        <button
                            v-for="e in task.options"
                            :key="e"
                            v-html="e" />
                    </draggable>
                    <div class="s20" />
                    <button class="send" @click="checkord( task.options, task.goodo )">KÉSZ</button>
                </div>
                <div v-if="task && task.type==='info'">
                    <span v-if="ich(task)">
                        <button class="p"  @click="side--,skip--,lc()">Vissza</button>
                        <div class="s40" />
                    </span>
                  <span v-if="side === 1">
                  <button class="send"  @click="side++,skip++,lc()">Javascript</button>
                  <button class="send"  @click="side++,skip++,lc()">Python</button>
                  </span>
                  <span v-else>
                    <button class="send" @click="side++,skip++,lc()">Tovább</button>
                  </span>
                </div>
            </div>
        </span>

        <div v-if="side>maxid">
            <div class="feladat">
                <div>Értékelés</div>
                <div class="cim">
                    {{ name }}: {{ sz( opsz, p.length ) }} ({{ opsz }}/{{ p.length }})
                    <span class="jegy">{{jegy(opsz)}}</span>
                </div>
                <hr>
                <table class="x">
                    <td>
                        <ul style="text-align:left;">
                        <li v-for="(v, i) in p" :key="i" v-html="(i+1) + '. feladat: ' + xv( i, v )" />
                        </ul>
                    </td>
                </table>
                <span v-if="dupl">Teljesítés rögzítve</span>
                <span v-else>Teljesítés rögzítése...</span>
                <br>
                <span v-if="dupl"></span>
                <span v-else>
                    <qrcode-vue :value="'pontszám-'+opsz" size="80" level="H" foreground="#63271B" background="transparent" class="q" />
                    <div class="s40" />
                    <qrcode-vue :value="name" size="70" level="H" foreground="#13575B" background="transparent" class="q" />
                    <div class="s40" />
                    <qrcode-vue :value="jegy(opsz)" size="70" level="H" foreground="#777700" background="transparent" class="q" />
                    <div class="s40" />
                    <qrcode-vue :value="fd()" size="70" level="H" foreground="#13575B" background="transparent" class="q" />
                    <div class="s40" />
                    <qrcode-vue :value="'csum-'+(name+jegy(opsz)+opsz).split('').map( v => v.charCodeAt(0) ).reduce( (o, v) => o+=v, 0 )"
                                size="80" level="H" foreground="#63271B" background="transparent" class="q" />
                </span>
            </div>
        </div>
        <div class="o" v-if="debug" >{{ debug }}</div>
        <my-Video v-if="false" :sources="[{ src: './abi.mp4', type: 'video/mp4' }]"></my-Video>

        <div v-if="false" class="katex" v-katex="'\\frac{a_i}{1+x}'" />
      </div>
  </div>
</template>

<script>
//import config from './assets/próbateszt.js'
import Vue from 'vue'
import config from './assets/js_alapok_1.js'
import myVideo from 'vue-video'
import PrismEditor from 'vue-prism-editor'
import QrcodeVue from 'qrcode.vue'
import "prismjs"
import "prismjs/themes/prism-tomorrow.css"
import draggable from "vuedraggable";
if ( config.autoid ) config.tasks = config.tasks.map( (v,i) => v={ id:i+1, ...v } )
const maxid = config.tasks.sort( ( a, b ) => b.id - a.id )[0].id
export default {
    components: {
        myVideo, PrismEditor, QrcodeVue, draggable
    },
    data() {
        return {
            side: 1, p: [], i1: null, opsz: 0, name: '',email: '', rogz: null,
            config, maxid, debug: '', mycode: 'null', skip: 0, kitid: null,
            t1: [], jv: [], uv: [], code: '', kdate: '', vdate: '', dupl: null,
            testx: ['cica','kutya','alma','narancs'].map( (v, id) => ({v, id}) )
        }
    },
    mounted() {
        var bid = localStorage.getItem('id')
        this.kitid = localStorage.getItem('kitid')
        this.config.pht.sort( ( a, b ) => b.ph - a.ph )
        if (!this.kitid) {
            this.kitid = document.domain + ':'+ Math.trunc( Math.random()*90000000+10000000 ).toFixed()
            localStorage.setItem( 'kitid',this.kitid )
        }
        if ( bid ) {
            if (bid == this.config.id) {
                this.name = localStorage.getItem('name')
                this.skip = Number( localStorage.getItem('skip') ) || 0
                if (localStorage.getItem('kdate')) this.kdate = localStorage.getItem('kdate')
                if (localStorage.getItem('vdate')) this.vdate = localStorage.getItem('vdate')
                if (this.name) {
                    this.side++
                    if ( localStorage.getItem('p') ) this.p=localStorage.getItem('p').split('|')
                    if (this.p) {
                        if (this.p.length) this.side = this.p.length + 1
                        this.side += this.skip
                        if (config.tasks.sort( ( a, b ) => a.id - b.id )[this.side-1])
                            this.mycode = config.tasks.sort( ( a, b ) => a.id - b.id )[this.side-1].code
                        this.opsz = this.p.filter( v => v>0 ).join('').length
                        if (this.p[this.side-1]>0) {
                            this.t1[0]='c1e3'
                        }
                        this.lc()
                    }
                }
            } else {
                localStorage.clear()
            }
        }
        localStorage.setItem( 'id',this.config.id )
    },
    methods: {
        signIn() {
            Vue.googleAuth().directAccess()
            Vue.googleAuth().signIn(
                user => {
                    console.log( user.Pt.CU+" "+user.Pt.BW,user.Pt.yu );
                    this.side++,this.lc()
                    this.name = user.Pt.CU+" "+user.Pt.BW
                    this.email= user.Pt.yu
                    localStorage.setItem('name', this.name)
                    if ( !localStorage.getItem('kdate') ) {
                        this.kdate = (new Date()).toISOString()
                        localStorage.setItem('kdate', this.kdate)
                    }
                },
                reject => console.log( reject )
            )
        },
        ich () {
            var rv
            if (this.config.tasks.length) {
                rv = this.config.tasks.find( v => v.id===this.side-1)
                if (rv) return rv.type==='info'
                else return false
            } else return false
        },
        fd() {
            var kds, vds
            if ( this.kdate )
                kds = this.kdate.split('T')[1].split('.')[0].split(':').slice(0,2).join(':')
            if ( this.vdate )
                vds = this.vdate.split('T')[1].split('.')[0].split(':').slice(0,2).join(':')
            return `${ kds } | ${ vds }`
        },
        inci1(mc) {
            if (this.i1<mc) this.i1++
        },
        deci1(mc) {
            if (this.i1>mc) this.i1--
        },
        chc() {
            this.i1=' '
        },/*
        lset() {
            this.name = this.setname
            localStorage.setItem('name', this.name)
            if ( !localStorage.getItem('kdate') ) {
                this.kdate = (new Date()).toISOString()
                localStorage.setItem('kdate', this.kdate)
            }
        },*/
        run(code, p, pt, mo , fo) {
            var ok = false, jomo, torun
            if ( code.includes('return') )
                torun = q => q?`${ q.map( v => `${ v.name } = ${ v.value }` ).join('\n') }\n${code}`:code
            else
                torun = q => q?`${ q.map( v => `${ v.name } = ${ v.value }` ).join('\n') }\n return ${code}`:`return ${code}`
            try {
                var f = new Function( torun(p) )
                jomo = f(p)
                if (jomo == fo) {
                    this.i1 = jomo + '<div class="o2">( A tesztváltozó és a mintaváltozó különbözik! )</div>'
                    ok = true
                } else this.i1 = jomo
             } catch( err ) {
                this.i1 = err
            }
            if (ok)
            try {
                var g = new Function( torun(pt) )
                if (g(pt) == mo) {
                    this.t1[0] = 'c1e3'
                    this.i1 = jomo
                }
            } catch( err ) {
                return err
            }
        },
        check(v) {
          if (this.i1) {
            this.jv.push(v)
            if (this.i1==v) {
                this.jo()
                this.uv.push(v)
            }
            else this.rossz()
            this.uv.push(this.i1)
            this.i1=null
          }
          this.lc()
        },
        checkord( t1, t2 ) {
            var jp = 0
            t1.forEach( ( v, i ) => {
                if (t1[i] === t2[i]) jp++
            })
            if ( jp == t1.length ) this.jo()
            else this.rossz()
        },
        checkms( t1, t2 ) {
          if ( t1.length === t2.length ) {
              var ch = t1.length
              t2.forEach( v => {
                  if ( t1.includes( v ) ) ch--
              })
              this.jv.push(t1)
              this.uv.push(t2)
              if (ch)  this.rossz()
              else this.jo()
          }
          else {
              this.jv.push(t1)
              this.uv.push(t2)
              this.rossz()
          }
          this.lc()
        },
        jo() {
          this.t1=[]
          this.p.push(1)
          this.side++
          this.opsz++
          this.i1=''
          this.lc()
        },
        rossz() {
          this.t1=[]
          this.p.push(-1)
          this.side++
          this.opsz--
          this.i1=''
          this.lc()
        },
        passz() {
          this.t1=[]
          this.p.push(0)
          this.side++
          this.i1=''
          this.lc()
        },
        lc() {
            var pp = config.tasks.filter( v => v.id === this.side)[0]
            if (pp) {
                this.mycode = pp.code
                if (pp.type==='number' && typeof pp.min == "number" && typeof pp.max == "number")
                    this.i1 = ( pp.min + pp.max ) / 2
            }
            localStorage.setItem('p',this.p.join('|'))
            localStorage.setItem('skip',this.skip)
        },
        xv(i, v) {
          if (v>0) return `<span class="jo">helyes válasz (${ v } pont)</span>`
          else if (v<0) return `<span class="nemjo">hibás válasz (${ v } pont)</span>`
          else return `<span class="nemjo">passzolt (${ v } pont)</span>`
        },
        sz( opsz, len ) {
            var rv = 100 * opsz / len
            if ( rv<0 ) rv = 'negatív!'
            else rv = rv.toFixed() + "%"
            if (this.vdate)
                this.axios
                    .post(
                        'http://inf.u-szeged.hu/~tnemeth/server.php',
                        {
                            p:'insert',
                            data: {
                                tid:    this.config.id,
                                kitid:  this.kitid,
                                name:   this.name,
                                email:  this.email,
                                p:      this.p.join(','),
                                kdate:  this.kdate,
                                vdate:  this.vdate,
                                psz:    this.opsz,
                                jegy:   this.jegy( this.opsz )
                            }
                        }
                    )
                    .then( v => {
                        console.log(v.data)
                        this.dupl = v.data.duplicate
                    } )
                    .catch( err =>
                        console.log(err)
                    )
            return rv
        },
        click(opt) {
            if ( this.t1.includes( opt ) ) this.t1 = this.t1.filter( v => v !== opt)
            else this.t1.push( opt )
        },
        getms(opt) {
            if ( this.t1.includes( opt ) ) return 'pushed'
            else return ''
        },
        jegy( psz ) {
            if ( !localStorage.getItem('vdate') ) {
                this.vdate = (new Date()).toISOString()
                localStorage.setItem('vdate', this.vdate)
            }
            return this.config.pht.find( v => v.ph <= psz ).eval
        }
    }
}
</script>

<style>
    @import "../node_modules/katex/dist/katex.min.css";
    @import url('https://fonts.googleapis.com/css?family=Sen&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');
    div.prism-editor-wrapper pre {
        margin: 6px;
        padding: 8px;
    }
    div.ec pre {
        background-color: #372710;
        cursor:pointer;
    }
    div.db {
         display: inline-block ;
    }
    div.s40 {
        display: inline-block ;
        width: 40px;
    }
    div.s20 {
        display: inline-block ;
        width: 20px;
    }
    body {
        background-color: rgb(38, 38, 38);
    }
    pre[class*="language-"] {
        border-radius: 10px;
        box-shadow: 1px 1px 3px black;
        font-size: 16px;
        user-select: none;
    }
    span.jegy {
        color:rgb(4, 100, 111);
    }
    span.katex {
        font-size: 24px;
        color: rgb(4, 100, 111);
    }
    div.q2 {
        font-size: 19px;
        text-align: justify;
        margin: 10px;
        padding: 10px;
        border-radius: 6px;
        box-shadow: 1px 1px 5px #8b9d88;
    }
    div.small {
        font-size: 15px;
    }
    div.menu {
        font-weight: bold;
        font-size: 40px;
        margin: 10px auto;
        padding: 20px;
        box-shadow: 1px 3px 3px black ;
        border-radius: 20px;
        background-color: #19696f;
        color: rgb(192, 225, 213);
        text-shadow: 1px 1px 4px white;
    }
    img.btn {
        width: 110px;
        box-shadow: 1px 3px 3px black ;
        border-radius: 20px;
        cursor: pointer;
    }
    img.rajz {
        height: 250px;
        width: 700px;
        box-shadow: 1px 3px 3px black ;
        border-radius: 20px;
    }
    img.menu {
        cursor: pointer;
        width: 300px;
        height: 180px;
        box-shadow: 1px 3px 3px black ;
        border-radius: 20px;
    }
    img.nyil {
        width: 100px;
        box-shadow: 1px 3px 3px black ;
        border-radius: 20px;
    }
    div.o2 {
        font-size: 20px;
    }
    div.o {
        text-align: center;
        height: 40px;
    }
    input {
        margin: 30px;
        padding: 6px;
        font-size: 20px;
        text-align: right;
    }
    input.n {
        text-align: left;
        width: 300px;
    }
    div.feladat {
        font-size: 26px;
        text-align: center;
        vertical-align: middle;
        min-height: 500px;
        margin: 10px auto;
        padding: 20px;
        box-shadow: 1px 3px 3px black ;
        border-radius: 20px;
        background-color: #e5e8cd;
        padding-top: 20px;
    }
    div.slide {
        font-family: 'Sen', sans-serif;
        width: 1000px;
        margin: 30px auto;
        padding: 20px;
        box-shadow: 1px 3px 3px black ;
        border-radius: 20px;
        background-color: #d3bbaf;
    }
    button {
        font-family: 'Sen', sans-serif;
        height: 50px;
        padding-left: 6px;
        padding-right: 6px;
        padding-top: 1px;
        padding-bottom: 1px;
        margin: 2px;
        box-shadow: 1px 3px 3px black ;
        border-radius: 10px;
        font-size: 18px;
        cursor: pointer;
        background-color: #d8ddc8;
    }
    button.p {
        background-color: #803231;
        color: white;
        user-select: none;
    }
    button.send {
        background-color: #4b6183;
        color: white;
    }
    button.pushed {
        background-color: #4f674f;
        color: white;
    }
    ul {
        margin-block-start: 0px;
        margin-block-end: 14px;
    }
    table.x {
        margin: 0 auto;
    }
    span.jo {
        color: #427450;
    }
    span.nemjo {
        color: #803231;
    }
    div.cim {
        font-size: 40px;
        color: #803231;
        text-shadow: 1px 1px 3px black;
        user-select: none;
    }
    span.kcim {
        font-size: 19px;
        color: #88671b;
        text-shadow: 1px 1px 3px rgb(126, 126, 126);
        user-select: none;
    }
    li {
        font-size: 18px;
    }
    select {
        margin-top: 20px;
        font-size: 20px;
    }
    div.q {
        margin: 5px auto;
        padding-left: 5px;
        padding-right: 5px;
        display: inline-block;
    }
    code {
        font-family: 'Courier Prime', monospace;
        background-color: #181a1c ;
        color: rgb(247, 227, 227);
        border-radius: 3px;
        padding: 3px;
    }
</style>
