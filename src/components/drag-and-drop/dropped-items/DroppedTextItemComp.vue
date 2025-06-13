<script setup>
import { reactive, watch } from 'vue';
import IconsComp from '@/components/IconsComp.vue';

const props = defineProps(['componentData']);
const emit = defineEmits(['delete', 'duplicate', 'change']);
const data = reactive({ ...props.componentData });

// Add a watch effect to emit changes
watch(data, (newValue) => {
  emit('change', newValue);
}, { deep: true });

function save() {
  console.log('Saved:', data);
}

function revert() {
  Object.assign(data, props.componentData);
}

const createFormActions = [
  { title: 'Gem og se resultat', iconName: 'save', handler: save },
  { title: 'Gå tilbage', iconName: 'history', handler: revert },
  { title: 'kopier sektion', iconName: 'copy', handler: () => emit('duplicate') },
  { title: 'Slet sektion', iconName: 'delete', handler: () => emit('delete') },
];
</script>

<template>
  <div class="dropped-component">
    <div class="dropped-component__content">
      <caption class="content__info">Svartype: {{ data.title }}</caption>
      <p class="content__text">{{ data.inputText }}</p>
      <caption class="content__info">Tekst:</caption>
      <div class="content__input-container">
        <IconsComp class="content__icon" iconName="text-fields" />
        <input class="content__input" v-model="data.inputText" />
      </div>
    </div>
    <div class="dropped-component__actions">
      <IconsComp
        v-for="(action, index) in createFormActions"
        :key="index"
        :iconName="action.iconName"
        :title="action.title"
        @click="action.handler"
      />
    </div>
  </div>
  <hr class="droppedItem__divider" />
</template>

<style scoped>
    .dropped-component {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        background: var(--primary-color);
        border: 1px solid #ccc;
        padding: 10px;
        margin: 0 1rem;
    }
    .dropped-component__content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex-grow: 1;
        margin-top: 10px;
        padding: 10px;
    }

    .content__info {
        font-size: 0.8rem;
        font-weight: bold;
        color: var(--help-text)
    }
    .content__title {
        font-size: 2rem;
        height: 2rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }

    .content__input-container {
        position: relative;
        width: 100%;
    }

    .content__input {
        width: 100%;
        padding: 0.5rem 0rem 0.5rem 3rem;
    }

    .content__icon {
        position: absolute;
        left: 0.8rem;
        top: 50%;
        transform: translateY(-50%);
        width: 1.5rem;
        height: 1.5rem;
    }
    .dropped-component__actions {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-around;
        margin: 0 1rem;
    }

    .droppedItem__divider {
        border: 1px solid var(--inactive-buttons-backgrounds);
        margin: 0.1rem 1rem 1rem 1rem;
    }
</style>
