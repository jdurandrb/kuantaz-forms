<template>
  <div>
    <NuxtLayout>
      <Transition name="page" mode="out-in">
        <div :key="$route.fullPath">
          <NuxtPage />
        </div>
      </Transition>
    </NuxtLayout>
  </div>
</template>
