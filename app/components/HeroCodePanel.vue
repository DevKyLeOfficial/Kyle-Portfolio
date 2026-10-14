<script setup>
import { site } from '~/data/site'
</script>

<template>
  <div
    v-reveal="{ type: 'up', delay: 160 }"
    class="code-panel liquid-border min-w-0 max-w-full overflow-hidden rounded-2xl shadow-glass-lg"
  >
    <div class="flex items-center gap-2 border-b border-white/5 bg-slate-900 px-4 py-3">
      <span class="h-3 w-3 rounded-full bg-red-500/90" />
      <span class="h-3 w-3 rounded-full bg-amber-500/90" />
      <span class="h-3 w-3 rounded-full bg-emerald-500/90" />
      <span class="ml-2 font-mono text-xs text-slate-400">~/kyle/portfolio.ts</span>
    </div>
    <pre class="overflow-x-auto bg-slate-950 p-5 font-mono text-[13px] leading-relaxed text-slate-300 sm:text-sm"><code><span class="text-slate-400">// Hello World — entry point</span>
<span class="text-cyan-400">console</span>.<span class="text-blue-400">log</span>(<span class="text-emerald-400">"Hello World"</span>);

<span class="text-violet-400">const</span> developer = {
  <span class="text-blue-300">name</span>: <span class="text-amber-200/90">"{{ site.name }}"</span>,
  <span class="text-blue-300">role</span>: <span class="text-amber-200/90">"{{ site.title }}"</span>,
  <span class="text-blue-300">stack</span>: [<span class="text-emerald-400">"Vue"</span>, <span class="text-emerald-400">"Nuxt"</span>, <span class="text-emerald-400">"JavaScript"</span>],
  <span class="text-blue-300">status</span>: <span class="text-amber-200/90">"{{ site.availability }}"</span>,
};

<span class="text-violet-400">export default</span> developer;</code></pre>
  </div>
</template>
