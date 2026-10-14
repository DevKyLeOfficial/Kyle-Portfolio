<template>
  <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
    <div
      class="absolute -left-32 -top-20 h-[520px] w-[520px] animate-float rounded-full bg-emerald-500/25 blur-[100px]"
    />
    <div
      class="absolute right-0 top-1/3 h-[400px] w-[400px] animate-float-delayed rounded-full bg-teal-400/10 blur-[90px]"
    />
    <div
      class="absolute bottom-0 left-1/4 h-[450px] w-[450px] animate-float rounded-full bg-cyan-900/40 blur-[110px]"
    />
    <div
      class="absolute inset-0 opacity-30"
      style="
        background: radial-gradient(circle at 70% 40%, rgba(16, 185, 129, 0.08), transparent 45%);
      "
    />
  </div>
</template>
