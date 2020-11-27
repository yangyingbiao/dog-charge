import { stringify } from "querystring";

export default () => ({
    mysql : {
        host : '127.0.0.1'
    },

    cache_null : '_', //如果从缓存中取到是_,则代表是数据不存在

    jwt : {
        secret : 'qwerty_uiopmnbvc&xzasdf&*(#%$#ghjk1324245vrfhgsthydgesrt0258123746132145615dcwtbdtg@%$@%@%&%&E#$^#^$lfdvbdrhbdegybs',
        expire : 86400,
        refresh_secret : ' s2345Erg84t#&ode51^%prsbxb(fe%bh@cty&wt$lg46$5wdk6y$@zth^%%n25s_h1&a214#gd@db3jd1273v#dd*tv&ri2$gmgycfhvfb%q0r1u#es',
        refresh_expire : 82800
    }

  });