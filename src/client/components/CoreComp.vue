<template>
  <div id="HorBlockLeft">
    <div id="LeftBar">
      <div>
        <v-Button id="ButtonLeftBar" @click="ShowButtons" icon="pi pi-bars" class="p-mr-2" />
      </div>
      <Transition name="Element">
        <div v-if="FolderButtonOpen">
          <v-Button
            id="ButtonFolder"
            @click="visibleFolderMeni = !visibleFolderMeni"
            icon="pi pi-folder"
            class="p-mr-2"
          />
        </div>
      </Transition>
      <Transition name="Element">
        <div v-if="TrashButtonOpen">
          <v-Button
            id="ButtonTrash"
            @click="visibleTrashMenu = !visibleTrashMenu"
            icon="pi pi-trash"
            class="p-mr-2"
          />
        </div>
      </Transition>
      <Transition name="Element">
        <div v-if="InfoButtonOpen">
          <v-Button
            id="ButtonInfo"
            @click="SeeInfo('top')"
            icon="pi pi-info-circle"
            class="p-mr-2"
          />
        </div>
      </Transition>
    </div>
    <v-Drawer v-model:visible="visibleTrashMenu" class="p-sidebar-md" :baseZIndex="1000">
      <h3>Файлы корзины</h3>
      <TrashArea :Trash="TRASHOBJECT" :Folders="FOLDERMASS"></TrashArea>
    </v-Drawer>
    <v-Drawer v-model:visible="visibleFolderMeni" class="p-sidebar-md" :baseZIndex="1000">
      <h3>Управление каталогами</h3>
      <FoldersArea :Folders="FOLDERMASS"></FoldersArea>
    </v-Drawer>
    <v-Dialog
      id="InfoDialog"
      header="Информация"
      v-model:visible="displayInfoDelete"
      style="border-radius: 8px"
      :style="{ width: '50vw' }"
      :position="position"
      :maximizable="true"
      :modal="true"
    >
      <template #footer> </template>
    </v-Dialog>
  </div>
  <div id="HorBlockRight">
    <div id="Hat">
      <HatArea></HatArea>
    </div>
    <div id="UnderHat">
      <div id="Tree">
        <TreeArea :Tree="JSONOBJECT" :Folders="FOLDERMASS"></TreeArea>
      </div>
      <div id="Code">
        <CodeArea :File="JSONFILE"></CodeArea>
      </div>
    </div>
  </div>
</template>

<script>
import HatArea from './areas/HatArea.vue'
import TreeArea from './areas/TreeArea.vue'
import CodeArea from './areas/CodeArea.vue'
import TrashArea from './areas/TrashArea.vue'
import FoldersArea from './areas/FoldersArea.vue'

import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    HatArea,
    TreeArea,
    CodeArea,
    TrashArea,
    FoldersArea
  },
  data() {
    return {
      visibleTrashMenu: false,
      visibleFolderMeni: false,
      MenuButtonOpen: false,
      TrashButtonOpen: false,
      FolderButtonOpen: false,
      InfoButtonOpen: false,
      displayInfoDelete: false,
      position: 'center'
    }
  },
  computed: {
    ...mapGetters(['JSONOBJECT', 'JSONFILE', 'TRASHOBJECT', 'FOLDERMASS'])
  },
  methods: {
    ...mapActions(['GET_JSON_FROM_SERVER']),
    ...mapActions(['GET_TRASH_FROM_SERVER']),
    ...mapActions(['GET_FOLDERMASS_FROM_SERVER']),
    ShowButtons() {
      this.MenuButtonOpen = !this.MenuButtonOpen
      if (this.MenuButtonOpen === true) {
        this.FolderButtonOpen = true
        setTimeout(() => {
          this.TrashButtonOpen = true
        }, 200)
        setTimeout(() => {
          this.InfoButtonOpen = true
        }, 400)
      } else {
        this.InfoButtonOpen = false
        setTimeout(() => {
          this.TrashButtonOpen = false
        }, 200)
        setTimeout(() => {
          this.FolderButtonOpen = false
        }, 400)
      }
    },
    SeeInfo(position) {
      this.position = position
      this.displayInfoDelete = true
    }
  },
  mounted() {
    this.GET_JSON_FROM_SERVER()
    this.GET_TRASH_FROM_SERVER()
    this.GET_FOLDERMASS_FROM_SERVER()
  }
}
</script>
