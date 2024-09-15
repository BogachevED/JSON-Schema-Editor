<template>
  <div>
    <div id="TrashWindow" style="border-radius: 8px">
      <div
        id="TrashField"
        v-for="file in Trash"
        :key="file"
        style="border-radius: 8px"
        align="center"
      >
        <table width="100%">
          <tbody>
            <tr>
              <td id="col1" width="90%" align="center">
                <div
                  id="TrashObject"
                  style="border-radius: 8px"
                  @click="CompleteDeletion('top', file)"
                  align="center"
                >
                  <table cellpadding="5" cellspacing="0" width="100%">
                    <tbody>
                      <tr>
                        <td width="10%">
                          <div id="TrashFileIcon" align="center"><i class="pi pi-file"></i></div>
                        </td>
                        <td width="90%">
                          <p align="center">{{ file.Title }}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
              <td id="col2" width="10%" align="center">
                <v-Button
                  v-if="file.Title != ''"
                  id="ButtonRestore"
                  @click="OpenRestoreFile('top', file.Path)"
                  icon="pi pi-undo"
                  class="p-mr-2"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <v-Dialog
      id="FileRestoreDialog"
      header="Восстановление файла из корзины"
      v-model:visible="displayFolderRestore"
      style="border-radius: 8px"
      :style="{ width: '50vw' }"
      :position="position"
      :modal="true"
    >
      <v-Button
        id="RestoreFile"
        ref="RestoreFile"
        label="Восстановить файл"
        @click="RestoreFileFunc(file)"
        class="p-mr-2"
      />
      <template #footer>
        <table width="100%" border="0" cellpadding="5">
          <tbody>
            <tr>
              <td width="90%">
                <div id="TextEditFolder" align="center" style="border-radius: 20px">
                  Каталог для восстанавляемого файла
                </div>
              </td>
            </tr>
            <tr>
              <td width="90%">
                <div id="ChousenFolders" align="center" style="border-radius: 4px">
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
                    <i v-if="ShowSpin" id="Spin" class="pi pi-spin pi-spinner"></i>
                  </Transition>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </v-Dialog>
    <v-Dialog
      id="FileDeleteDialog"
      header="Удаление файла"
      v-model:visible="displayFileDelete"
      style="border-radius: 8px"
      :style="{ width: '50vw' }"
      :position="position"
      :modal="true"
    >
      <template #footer>
        <table width="100%" border="0" cellpadding="5">
          <tbody>
            <tr>
              <td width="90%">
                <div id="TextQuestionToDelete" align="center" style="border-radius: 20px">
                  Вы действительно хотите удалить "<font id="ChouseFile">{{ this.FileTitle }}</font
                  >" ?
                </div>
              </td>
              <td width="10%"></td>
            </tr>
            <tr>
              <td width="90%">
                <table width="100%" border="0" cellpadding="5">
                  <tbody>
                    <tr>
                      <td width="50%">
                        <v-Button
                          id="YesDelete"
                          ref="YesDelete"
                          label="Да"
                          @click="YesGoDelete(this.FilePath)"
                          class="p-mr-2"
                        />
                      </td>
                      <td width="50%">
                        <v-Button
                          id="NoDelete"
                          ref="NoDelete"
                          label="Нет"
                          @click="NoGoDelete()"
                          class="p-mr-2"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td width="10%">
                <div id="LoadIcon" align="center" style="border-radius: 4px">
                  <Transition name="SpinFade">
                    <i v-if="ShowSpin" id="Spin" class="pi pi-spin pi-spinner"></i>
                  </Transition>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </v-Dialog>
    <v-Toast />
  </div>
</template>

<script>
export default {
  props: {
    Trash: Object,
    Folders: Object
  },
  methods: {
    CompleteDeletion(position, file) {
      this.$toast.add({
        severity: 'warn',
        summary: 'Предупреждение!',
        detail: 'При удалении файла, он будет утрачен навсегда.',
        life: 5000
      })
      this.position = position
      this.FilePath = file.Path
      this.FileTitle = file.Title
      this.displayFileDelete = true
    },
    OpenRestoreFile(position, Path) {
      this.position = position
      this.FilePath = Path
      this.displayFolderRestore = true
    },
    RestoreFileFunc() {
      const formData = new FormData()
      const Path = this.FilePath
      const PathNew = this.StartFindDunck()
      const ChouseFolder = document.getElementById('TreeSelect')
      if (ChouseFolder.textContent === 'Выберите каталог') {
        this.$toast.add({
          severity: 'warn',
          summary: 'Предупреждение!',
          detail: 'Выберите каталог расположения для файла',
          life: 3000
        })
      } else {
        formData.append('FilePath', Path)
        formData.append('NewPath', PathNew)
        this.$store.dispatch('PUT_RESTOREFILE_TO_SERVER', formData)
        this.ShowSpin = true
        document.getElementById('RestoreFile').setAttribute('disabled', 'disabled')
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
          this.displayFolderRestore = false
        }, 1000)
        setTimeout(() => {
          document.getElementById('RestoreFile').removeAttribute('disabled')
        }, 1000)
        setTimeout(() => {
          this.$store.dispatch('GET_JSON_FROM_SERVER')
        }, 2000)
        setTimeout(() => {
          this.$store.dispatch('GET_FOLDERMASS_FROM_SERVER')
        }, 2000)
        setTimeout(() => {
          this.$store.dispatch('GET_TRASH_FROM_SERVER')
        }, 2000)
      }
    },
    NoGoDelete() {
      this.displayFileDelete = false
    },
    YesGoDelete() {
      const formData = new FormData()
      const Path = this.FilePath
      formData.append('Path', Path)
      this.$store.dispatch('PUT_DELETRASHFILE_TO_SERVER', formData)
      this.ShowSpin = true
      document.getElementById('YesDelete').setAttribute('disabled', 'disabled')
      document.getElementById('NoDelete').setAttribute('disabled', 'disabled')
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
        this.displayFileDelete = false
      }, 1000)
      setTimeout(() => {
        document.getElementById('YesDelete').removeAttribute('disabled')
      }, 1000)
      setTimeout(() => {
        document.getElementById('NoDelete').removeAttribute('disabled')
      }, 1000)
      setTimeout(() => {
        this.$store.dispatch('GET_FOLDERMASS_FROM_SERVER')
      }, 2000)
      setTimeout(() => {
        this.$store.dispatch('GET_TRASH_FROM_SERVER')
      }, 2000)
      setTimeout(() => {
        this.$store.dispatch('GET_JSON_FROM_SERVER')
      }, 2000)
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
      displayFolderRestore: false,
      displayFileDelete: false,
      FilePath: '1',
      FileTitle: '1',
      ShowSpin: false
    }
  }
}
</script>
