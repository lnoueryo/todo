<template>
  <div>
    <AppBar>
      <AppBarTitle>
        <h1 class="text-h5">{{ props.title }}</h1>
      </AppBarTitle>
      <Spacer />
      <Menu icon="mdi-dots-vertical">
        <List>
          <ListItem
            v-for="(item, index) in items"
            :value="index"
            @click="item.handler"
          >
            {{ item.title }}
          </ListItem>
        </List>
      </Menu>
    </AppBar>
  </div>
</template>

<script setup lang="ts">
import AppBar from '~/components/atoms/AppBar.vue'
import AppBarTitle from '~/components/atoms/AppBarTitle.vue'
import Spacer from '~/components/atoms/Spacer.vue'
import Menu from '~/components/atoms/Menu.vue'
import List from '~/components/atoms/List.vue'
import ListItem from '~/components/atoms/ListItem.vue'
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array as () => {
      title: string,
      handler: (e: any) => void
    }[],
    default: []
  },
})
</script>

<style scoped>

</style>