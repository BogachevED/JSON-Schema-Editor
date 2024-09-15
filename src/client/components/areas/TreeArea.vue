<template>
  <div id="TreeWindow" style="border-radius: 8px">
    <span id="SpanLabel" align="center"
      ><hr id="topline" />
      <h1>Файловый менеджер</h1>
      <hr id="botline"
    /></span>
    <div id="TreeButtonsArea">
      <table width="100%">
        <tbody>
          <tr>
            <td width="50%">
              <v-Button
                id="ButtonLoadDialog"
                label="Импортировать файл"
                @click="OpenPosition('top')"
                icon="pi pi-download"
                class="p-mr-2"
              />
            </td>
            <td width="50%">
              <v-Button
                id="ButtonCreateDialog"
                label="Создать файл"
                @click="CreateDialog('top')"
                icon="pi pi-plus-circle"
                class="p-mr-2"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="TreeWorkArea">
      <div id="PseudoElement">
        <FileBrowser :TreeNode="Tree"></FileBrowser>
      </div>
    </div>
    <v-Dialog
      id="LoadDialog"
      header="Импорт файла"
      v-model:visible="displayLoadDialog"
      style="border-radius: 8px"
      :style="{ width: '50vw' }"
      :position="position"
      :modal="true"
    >
      <v-Toast />
      <v-Button
        id="Chousefile"
        ref="Chousefile"
        label="Выбрать файл"
        @click="ChouseFileToLoad()"
        class="p-mr-2"
      />
      <v-Button
        id="Loadfile"
        ref="Loadfile"
        label="Импортировать файл"
        @click="LoadFileToServer()"
        class="p-mr-2"
      />
      <template #footer>
        <table width="100%" border="0" cellpadding="5">
          <tbody>
            <tr>
              <td width="45%">
                <div id="TextFileField" align="center" style="border-radius: 20px">
                  Название фалйа
                </div>
              </td>
              <td width="45%">
                <div id="TextFolderField" align="center" style="border-radius: 20px">
                  Каталог для импорта
                </div>
              </td>
            </tr>
            <tr>
              <td width="45%">
                <div id="NameFileField" align="center" style="border-radius: 4px">
                  <v-InputText
                    id="Text"
                    type="text"
                    v-model="value"
                    readonly="readonly"
                  ></v-InputText>
                </div>
              </td>
              <td width="45%">
                <div id="NameFolderField" align="center" style="border-radius: 4px">
                  <TreeSelect
                    id="TreeSelect"
                    v-model="selectedFolders"
                    :options="Folders.root"
                    placeholder="Выберите каталог"
                  />
                </div>
              </td>
              <td width="10%">
                <div id="LoadIcon" align="center" style="border-radius: 4px">
                  <Transition name="SpinFade">
                    <i
                      v-if="ShowSpin"
                      id="Spin"
                      class="pi pi-spin pi-spinner"
                      style="font-size: 3rem"
                    ></i>
                  </Transition>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </v-Dialog>
    <v-Dialog
      id="LoadDialog"
      header="Создание файла"
      v-model:visible="displayCreateDialog"
      style="border-radius: 8px"
      :style="{ width: '50vw' }"
      :position="position"
      :modal="true"
    >
      <v-Toast />
      <v-Button
        id="Chousefile"
        ref="Chousefile"
        label="Создать файл"
        @click="ChouseFileToLoad()"
        class="p-mr-2"
      />
      <template #footer>
        <table width="100%" border="0" cellpadding="5">
          <tbody>
            <tr>
              <td width="45%">
                <div id="TextFileField" align="center" style="border-radius: 20px">
                  Название фалйа
                </div>
              </td>
              <td width="45%">
                <div id="TextFolderField" align="center" style="border-radius: 20px">
                  Каталог для создания
                </div>
              </td>
            </tr>
            <tr>
              <td width="45%">
                <div id="NameFileField" align="center" style="border-radius: 4px">
                  <v-InputText id="Text" type="text" v-model="value"></v-InputText>
                </div>
              </td>
              <td width="45%">
                <div id="NameFolderField" align="center" style="border-radius: 4px">
                  <TreeSelect
                    id="TreeSelect"
                    v-model="selectedFolders"
                    :options="Folders.root"
                    placeholder="Выберите каталог"
                  />
                </div>
              </td>
              <td width="10%">
                <div id="LoadIcon" align="center" style="border-radius: 4px">
                  <Transition name="SpinFade">
                    <i
                      v-if="ShowSpin"
                      id="Spin"
                      class="pi pi-spin pi-spinner"
                      style="font-size: 3rem"
                    ></i>
                  </Transition>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </v-Dialog>
  </div>
</template>

<script>
import FileBrowser from '../control/FileBrowser.vue'

export default {
  props: {
    Tree: Object,
    Folders: Object
  },
  components: {
    FileBrowser
  },
  methods: {
    OpenPosition(position) {
      this.position = position
      this.displayLoadDialog = true
    },
    ChouseFileToLoad() {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.json'
      input.onchange = (e) => {
        this.file = e.target.files[0]
        const Name = this.file.name
        const elementName = document.getElementById('Text')
        elementName.value = Name
      }
      input.click()
    },
    CreateDialog(position) {
      this.displayCreateDialog = true
      this.position = position
    },
    LoadFileToServer() {
      const formData = new FormData()
      const Path = this.StartFindDunck()
      const FolderName = document.getElementById('TreeSelect')
      const ElementName = document.getElementById('Text')
      if (ElementName.value === '' && FolderName.textContent === 'Выберите каталог') {
        this.$toast.add({
          severity: 'warn',
          summary: 'Предупреждение!',
          detail: 'Выберите файл и каталог для загрузки',
          life: 3000
        })
      } else if (ElementName.value !== '' && FolderName.textContent === 'Выберите каталог') {
        this.$toast.add({
          severity: 'warn',
          summary: 'Предупреждение!',
          detail: 'Выберите каталог для загрузки',
          life: 3000
        })
      } else if (ElementName.value === '' && FolderName.textContent !== 'Выберите каталог') {
        this.$toast.add({
          severity: 'warn',
          summary: 'Предупреждение!',
          detail: 'Выберите файл для загрузки',
          life: 3000
        })
      } else if (ElementName.value !== '' && FolderName.textContent !== 'Выберите каталог') {
        formData.append('folder', Path)
        formData.append('file', this.file)
        this.$store.dispatch('PUT_JSONUPLOADFILE_TO_SERVER', formData)
        this.ShowSpin = true
        setTimeout(() => {
          this.$toast.add({
            severity: 'info',
            summary: 'Оповещение!',
            detail: this.$store.getters.ANSWER,
            life: 5000
          })
        }, 1000)
        setTimeout(() => {
          this.ShowSpin = false
        }, 1000)
        setTimeout(() => {
          this.$store.dispatch('GET_JSON_FROM_SERVER')
        }, 1000)
      }
    },
    FindData(Path, key, FolderStructure) {
      if (FolderStructure.key === key) {
        Path = FolderStructure.data
      } else {
        if (FolderStructure.children !== undefined) {
          for (let i = 0; i <= FolderStructure.children.length - 1; i++) {
            Path = this.FindData(Path, key, FolderStructure.children[i])
          }
        }
      }
      return Path
    },
    StartFindDunck() {
      const key = Object.keys(this.selectedFolders)[0]
      const FolderStructure = this.Folders.root[0]
      let Path = ''
      Path = this.FindData(Path, key, FolderStructure)
      return Path
    }
  },
  data() {
    return {
      selectedFolders: {},
      displayLoadDialog: false,
      displayCreateDialog: false,
      position: 'center',
      file: '',
      ShowSpin: false
    }
  }
}
</script>
