import{_ as n,c as s,o as t,ae as p}from"./chunks/framework.DJWEhhqZ.js";const b=JSON.parse('{"title":"多表联合查询","description":"","frontmatter":{},"headers":[],"relativePath":"mysql/MySQL/多表联合查询.md","filePath":"mysql/MySQL/多表联合查询.md"}'),e={name:"mysql/MySQL/多表联合查询.md"};function l(i,a,d,r,o,h){return t(),s("div",null,[...a[0]||(a[0]=[p(`<h1 id="多表联合查询" tabindex="-1">多表联合查询 <a class="header-anchor" href="#多表联合查询" aria-label="Permalink to &quot;多表联合查询&quot;">​</a></h1><p>很多时候在实际的业务中我们不只是查询一张表。</p><ol><li>在电子商务系统中，查询用户基本信息与购买产品信息。</li><li>银行中可能查询违规记录，同时查询出用户的身份信息</li><li>查询中奖信息和中奖人员的基本信息。</li></ol><p>以上只是列的情况我们就需要把两张表在一起进行查询。</p><p>而上述业务中需要多表联合在一起查询才能有结果，而多表联合查询的本质是：表连接。</p><p>当需要同时显示多个表中的字段时，就可以用表连接来实现这样的功能。</p><h2 id="连接类型-只取都存在的部分" tabindex="-1">连接类型 （只取都存在的部分） <a class="header-anchor" href="#连接类型-只取都存在的部分" aria-label="Permalink to &quot;连接类型 （只取都存在的部分）&quot;">​</a></h2><p>连接可分为以下几类：</p><table tabindex="0"><thead><tr><th>类型</th><th>子类型</th><th>描述</th></tr></thead><tbody><tr><td>内连接</td><td></td><td>取得两个表中存在连接匹配关系的记录。内连接使用比较运算符根据每个表共有的列的值匹配两个表中的行。 例如，检索 students 和 courses 表中学生学号相同的所有行。</td></tr><tr><td></td><td>隐式的内连接</td><td>没有INNER JOIN，形成的中间表为两个表的笛卡尔积。</td></tr><tr><td></td><td>显式的内连接</td><td>有INNER JOIN，形成的中间表为两个表经过ON条件过滤后的笛卡尔积。</td></tr></tbody></table><table tabindex="0"><thead><tr><th>类型</th><th>子类型</th><th>描述</th></tr></thead><tbody><tr><td>外连接</td><td></td><td>外连接可以是左向外连接、右向外连接</td></tr><tr><td></td><td>左外连接</td><td>左表中的所有数据全部取出，然后到对应的右表去找数据，如果找不到数据补null</td></tr><tr><td></td><td>右外连接</td><td>右外连接是左外联接的反向联接，将返回右表的所有行，如果右表的某行在左表中没有匹配行，则将为左表返回空值。</td></tr></tbody></table><h2 id="内连接" tabindex="-1">内连接 <a class="header-anchor" href="#内连接" aria-label="Permalink to &quot;内连接&quot;">​</a></h2><table tabindex="0"><thead><tr><th>类别</th><th>详细解释</th></tr></thead><tbody><tr><td>隐式语法1</td><td>select 表1.字段 [as 别名],表n.字段 from 表1 [别名],表n where 条件;</td></tr><tr><td>显式语法2</td><td>select 表1.字段 [as 别名],表n.字段 from 表1 INNER JOIN 表n on 条件; （<strong>推荐使用</strong>）</td></tr></tbody></table><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- 內连 --&gt;</span></span>
<span class="line"><span>boy</span></span>
<span class="line"><span>+------+-----------+</span></span>
<span class="line"><span>| hid  | bname     |</span></span>
<span class="line"><span>+------+-----------+</span></span>
<span class="line"><span>| A    | 屌丝      |</span></span>
<span class="line"><span>| B    | 李雷      |</span></span>
<span class="line"><span>| C    | 霍建华    |</span></span>
<span class="line"><span>+------+-----------+</span></span>
<span class="line"><span></span></span>
<span class="line"><span>girl</span></span>
<span class="line"><span>+------+-----------+</span></span>
<span class="line"><span>| hid  | gname     |</span></span>
<span class="line"><span>+------+-----------+</span></span>
<span class="line"><span>| B    | 韩梅梅    |</span></span>
<span class="line"><span>| C    | 林心如    |</span></span>
<span class="line"><span>| D    | 女神      |</span></span>
<span class="line"><span>+------+-----------+</span></span>
<span class="line"><span>select boy.hid as bid,boy.bname,girl.hid as gid,girl.gname from boy,girl where boy.hid=girl.hid;</span></span>
<span class="line"><span>select boy.hid as bid,boy.bname,girl.hid as gid,girl.gname from girl inner join boy on boy.hid=girl.hid;</span></span>
<span class="line"><span>select boy.hid as bid,girl.gname,girl.hid as gid,boy.bname from girl inner join boy on boy.hid=girl.hid;</span></span>
<span class="line"><span>取出boy和girl表数据，相同者为一对</span></span>
<span class="line"><span>结果</span></span>
<span class="line"><span>+------+-----------+------+-----------+</span></span>
<span class="line"><span>| bid  | bname     | gid  | gname     |</span></span>
<span class="line"><span>+------+-----------+------+-----------+</span></span>
<span class="line"><span>| B    | 李雷      | B    | 韩梅梅    |</span></span>
<span class="line"><span>| C    | 霍建华    | C    | 林心如    |</span></span>
<span class="line"><span>+------+-----------+------+-----------+</span></span></code></pre></div><h2 id="外联接" tabindex="-1">外联接 <a class="header-anchor" href="#外联接" aria-label="Permalink to &quot;外联接&quot;">​</a></h2><h3 id="左向外联接" tabindex="-1">左向外联接 <a class="header-anchor" href="#左向外联接" aria-label="Permalink to &quot;左向外联接&quot;">​</a></h3><table tabindex="0"><thead><tr><th>说明</th><th>详解</th></tr></thead><tbody><tr><td>语法</td><td>select 表1.字段 [as 别名],表n.字段 from 表1 LEFT JOIN 表n on 条件;</td></tr></tbody></table><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql&gt; select boy.hid as bid,boy.bname,girl.hid as gid,girl.gname from boy left join girl on boy.hid=girl.hid;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>左表全部查出，右表没有以null补齐</span></span>
<span class="line"><span>+------+-----------+------+-----------+</span></span>
<span class="line"><span>| bid  | bname     | gid  | gname     |</span></span>
<span class="line"><span>+------+-----------+------+-----------+</span></span>
<span class="line"><span>| B    | 李雷       | B    | 韩梅梅    |</span></span>
<span class="line"><span>| C    | 霍建华     | C    | 林心如    |</span></span>
<span class="line"><span>| A    | 屌丝       | NULL | NULL      |</span></span>
<span class="line"><span>+------+-----------+------+-----------+</span></span></code></pre></div><h3 id="右向外联接" tabindex="-1">右向外联接 <a class="header-anchor" href="#右向外联接" aria-label="Permalink to &quot;右向外联接&quot;">​</a></h3><table tabindex="0"><thead><tr><th>说明</th><th>详解</th></tr></thead><tbody><tr><td>语法</td><td>select 表1.字段 [as 别名],表n.字段 from 表1 right JOIN 表n on 条件;</td></tr></tbody></table><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql&gt; select boy.hid as bid,boy.bname,girl.hid as gid,girl.gname from boy right join girl on girl.hid=boy.hid;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>右表全部查出，左表没有以null补齐</span></span>
<span class="line"><span>+------+-----------+------+-----------+</span></span>
<span class="line"><span>| bid  | bname     | gid  | gname     |</span></span>
<span class="line"><span>+------+-----------+------+-----------+</span></span>
<span class="line"><span>| B    | 李雷       | B    | 韩梅梅     |</span></span>
<span class="line"><span>| C    | 霍建华     | C    | 林心如     |</span></span>
<span class="line"><span>| NULL | NULL      | D    | 女神       |</span></span>
<span class="line"><span>+------+-----------+------+-----------+</span></span></code></pre></div>`,20)])])}const g=n(e,[["render",l]]);export{b as __pageData,g as default};
