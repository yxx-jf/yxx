import{_ as s,o as n,c as a,O as l}from"./chunks/framework.1d9da8ae.js";const F=JSON.parse('{"title":"Vue规范","description":"","frontmatter":{},"headers":[],"relativePath":"specification/Vue规范.md","filePath":"specification/Vue规范.md"}'),p={name:"specification/Vue规范.md"},o=l(`<h1 id="vue规范" tabindex="-1">Vue规范 <a class="header-anchor" href="#vue规范" aria-label="Permalink to &quot;Vue规范&quot;">​</a></h1><h2 id="_1-vue属性书写顺序" tabindex="-1"><strong>1. Vue属性书写顺序</strong> <a class="header-anchor" href="#_1-vue属性书写顺序" aria-label="Permalink to &quot;**1\\. Vue属性书写顺序**&quot;">​</a></h2><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">  mixins,</span></span>
<span class="line"><span style="color:#A6ACCD;">  data,</span></span>
<span class="line"><span style="color:#A6ACCD;">  props,</span></span>
<span class="line"><span style="color:#A6ACCD;">  store，</span></span>
<span class="line"><span style="color:#A6ACCD;">  computed，</span></span>
<span class="line"><span style="color:#A6ACCD;">  route,</span></span>
<span class="line"><span style="color:#A6ACCD;">  created，</span></span>
<span class="line"><span style="color:#A6ACCD;">  ready，    // =&gt; 生命周期顺序不赘述</span></span>
<span class="line"><span style="color:#A6ACCD;">  event,</span></span>
<span class="line"><span style="color:#A6ACCD;">  watch,</span></span>
<span class="line"><span style="color:#A6ACCD;">  components,</span></span>
<span class="line"><span style="color:#A6ACCD;">  methods</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>​</p><h2 id="_2-组件" tabindex="-1">2. 组件 <a class="header-anchor" href="#_2-组件" aria-label="Permalink to &quot;2\\. 组件&quot;">​</a></h2><h3 id="_2-1-组件以驼峰命名" tabindex="-1"><strong>2.1 组件以驼峰命名</strong> <a class="header-anchor" href="#_2-1-组件以驼峰命名" aria-label="Permalink to &quot;**2.1 组件以驼峰命名**&quot;">​</a></h3><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">my-components</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">my-components</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> myComponents </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./myComponents.vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">components</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      myComponents</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><h3 id="_2-2组件引用" tabindex="-1"><strong>2.2组件引用</strong> <a class="header-anchor" href="#_2-2组件引用" aria-label="Permalink to &quot;**2.2组件引用**&quot;">​</a></h3><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import myComponentsA from &#39;./myComponentsA.vue&#39;  </span></span>
<span class="line"><span style="color:#A6ACCD;">  import myComponentsB from &#39;./myComponentsB.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  import myComponentsC from &#39;./myComponentsC.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  import myComponentsD from &#39;./myComponentsD.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">    components: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      myComponentsA,</span></span>
<span class="line"><span style="color:#A6ACCD;">      myComponentsB,</span></span>
<span class="line"><span style="color:#A6ACCD;">      myComponentsC,</span></span>
<span class="line"><span style="color:#A6ACCD;">      myComponentsD,</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span></code></pre></div><h3 id="_2-3-事件" tabindex="-1"><strong>2.3. 事件</strong> <a class="header-anchor" href="#_2-3-事件" aria-label="Permalink to &quot;**2.3. 事件**&quot;">​</a></h3><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 不建议 --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">v-on</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">pass</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">pass</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 推荐 --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">pass</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">pass</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p><em>本文是为了以后项目易维护和加强可读性整理的。</em></p><p><strong>tips:</strong></p><blockquote><p>1, 函数参数超过3个，用对象的方式传递;<br> 2, span等行内元素不建议做为父元素；<br> 3，css样式命令用中杠<br> 4，文件与文件夹命名建议用中杠，内部组件用_下划线</p></blockquote>`,14),e=[o];function t(c,r,i,y,D,C){return n(),a("div",null,e)}const m=s(p,[["render",t]]);export{F as __pageData,m as default};
