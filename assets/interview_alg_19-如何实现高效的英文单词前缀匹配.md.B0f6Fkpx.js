import{_ as a,c as i,o as n,ae as l}from"./chunks/framework.DJWEhhqZ.js";const c=JSON.parse('{"title":"如何实现高效的英文单词前缀匹配","description":"","frontmatter":{},"headers":[],"relativePath":"interview/alg/19-如何实现高效的英文单词前缀匹配.md","filePath":"interview/alg/19-如何实现高效的英文单词前缀匹配.md"}'),p={name:"interview/alg/19-如何实现高效的英文单词前缀匹配.md"};function e(h,s,t,E,k,d){return n(),i("div",null,[...s[0]||(s[0]=[l(`<h1 id="如何实现高效的英文单词前缀匹配" tabindex="-1">如何实现高效的英文单词前缀匹配 <a class="header-anchor" href="#如何实现高效的英文单词前缀匹配" aria-label="Permalink to &quot;如何实现高效的英文单词前缀匹配&quot;">​</a></h1><ul><li>有一个英文单词库(数组)，里面有几十万个英文单词</li><li>输入一个字符串，快速判断是不是某一个单词的前缀</li></ul><h2 id="常规思路" tabindex="-1">常规思路 <a class="header-anchor" href="#常规思路" aria-label="Permalink to &quot;常规思路&quot;">​</a></h2><p>拿当前的单词，遍历词库数组，通过 <code>indexOf</code> 来前缀匹配。</p><p>性能分析:</p><ul><li>算法思路的时间复杂度是 <code>O(n)</code></li><li>外加 <code>indexOf</code> 也需要时间复杂度。实际的复杂度要超过 <code>O(n)</code></li></ul><h2 id="优化数据结构" tabindex="-1">优化数据结构 <a class="header-anchor" href="#优化数据结构" aria-label="Permalink to &quot;优化数据结构&quot;">​</a></h2><p>英文字母一共 26 个，可按照第一个字母分组，分为 26 组。这样搜索次数就减少很多。</p><p>可按照第一个字母分组，那也可以按照第二个、第三个字母分组。<br> 即，在程序初始化时，把数组变成一个树，然后按照字母顺序在树中查找。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> obj</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    a: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        a: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            a: {}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        b: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            a: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                a: {}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            b: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                a: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                    a: {}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                b: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                    a: {}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    b: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        a: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            a: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                a: {}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            b: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                a: {}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 更多...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 对象取值 (如：取单词：and)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">obj.a.n.d</span></span></code></pre></div><p>这样时间复杂度就大幅度减少，从 <code>O(n)</code> 降低到 <code>O(m)</code> （<code>m</code> 是单词的最大长度）</p>`,11)])])}const o=a(p,[["render",e]]);export{c as __pageData,o as default};
