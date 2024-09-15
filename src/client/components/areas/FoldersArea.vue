<template>
  <div id="FoldersArea">
    <table width="100%" border="0">
      <tbody>
        <tr width="100%">
          <td id="cell">
            <v-Button
              id="FolderAdd"
              label="Добавить каталог"
              @click="OpenFolderAddDialog('top')"
              icon="pi pi-chevron-right"
              class="p-mr-2"
            />
          </td>
        </tr>
        <tr width="100%">
          <td id="cell">
            <v-Button
              id="FolderEdit"
              label="Изменить каталог"
              @click="OpenFolderEditDialog('top')"
              icon="pi pi-chevron-right"
              class="p-mr-2"
            />
          </td>
        </tr>
        <tr width="100%">
          <td id="cell">
            <v-Button
              id="FolderDelete"
              label="Удалить каталог"
              @click="OpenFolderDeleteDialog('top')"
              icon="pi pi-chevron-right"
              class="p-mr-2"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <v-Dialog
      id="FolderAddDialog"
      header="Добавление каталога"
      v-model:visible="displayFoldarAdd"
      style="border-radius: 8px"
      :style="{ width: '50vw' }"
      :position="position"
      :modal="true"
    >
      <v-Toast />
      <v-Button
        id="AddFolder"
        ref="AddFolder"
        label="Добавить каталог"
        @click="AddFolderFunc()"
        class="p-mr-2"
      />
      <template #footer>
        <table width="100%" border="0" cellpadding="5">
          <tbody>
            <tr>
              <td width="45%">
                <div id="TextCreatedFolder" align="center" style="border-radius: 20px">
                  Название создаваемого каталога
                </div>
              </td>
              <td width="45%">
                <div id="TextDeployFolders" align="center" style="border-radius: 20px">
                  Расположение для создаваемого каталога
                </div>
              </td>
            </tr>
            <tr>
              <td width="45%">
                <div id="CreatedFolderName" align="center" style="border-radius: 4px">
                  <InputText id="TextAdd" type="text" autocomplete="off" />
                </div>
              </td>
              <td width="45%">
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
      id="FolderEditDialog"
      header="Изменение каталога"
      v-model:visible="diaplayFolderEdit"
      style="border-radius: 8px"
      :style="{ width: '50vw' }"
      :position="position"
      :modal="true"
    >
      <v-Toast />
      <v-Button
        id="EditFolder"
        ref="EditFolder"
        label="Изменить каталог"
        @click="EditFolderFunc()"
        class="p-mr-2"
      />
      <template #footer>
        <table width="100%" border="0" cellpadding="5">
          <tbody>
            <tr>
              <td width="45%">
                <div id="TextEditFolder" align="center" style="border-radius: 20px">
                  Новое название для каталога
                </div>
              </td>
              <td width="45%">
                <div id="TextDeployFolders" align="center" style="border-radius: 20px">
                  Изменяемый каталог
                </div>
              </td>
            </tr>
            <tr>
              <td width="45%">
                <div id="EditFolderName" align="center" style="border-radius: 4px">
                  <InputText id="TextEdit" type="text" autocomplete="off" />
                </div>
              </td>
              <td width="45%">
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
      id="FolderDeleteDialog"
      header="Удаление каталога"
      v-model:visible="displayFolderDelete"
      style="border-radius: 8px"
      :style="{ width: '50vw' }"
      :position="position"
      :modal="true"
    >
      <v-Toast />
      <v-Button
        id="DeleteFolder"
        ref="DeleteFolder"
        label="Удалить каталог"
        @click="DeleteFolderFunc()"
        class="p-mr-2"
      />
      <template #footer>
        <table width="100%" border="0" cellpadding="5">
          <tbody>
            <tr>
              <td width="90%">
                <div id="TextEditFolder" align="center" style="border-radius: 20px">
                  Удаляемый каталог
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
export default {
  props: {
    Folders: Object
  },
  methods: {
    OpenFolderAddDialog(position) {
      this.position = position
      this.displayFoldarAdd = true
    },
    OpenFolderEditDialog(position) {
      this.position = position
      this.diaplayFolderEdit = true
    },
    OpenFolderDeleteDialog(position) {
      this.$toast.add({
        severity: 'warn',
        summary: 'Предупреждение!',
        detail: 'При удалении папки, все содержащиеся внутри файлы будут удалены.',
        life: 5000
      })
      this.position = position
      this.displayFolderDelete = true
    },
    AddFolderFunc() {
      const formData = new FormData()
      const Path = this.StartFindDunck()
      const FolderName = document.getElementById('TextAdd')
      const ChouseFolder = document.getElementById('TreeSelect')
      if (FolderName.value === '' && ChouseFolder.textContent === 'Выберите каталог') {
        this.$toast.add({
          severity: 'warn',
          summary: 'Предупреждение!',
          detail: 'Выберите название для катлога и каталог расположения',
          life: 3000
        })
      } else if (FolderName.value !== '' && ChouseFolder.textContent === 'Выберите каталог') {
        this.$toast.add({
          severity: 'warn',
          summary: 'Предупреждение!',
          detail: 'Выберите каталог для расположения',
          life: 3000
        })
      } else if (FolderName.value === '' && ChouseFolder.textContent !== 'Выберите каталог') {
        this.$toast.add({
          severity: 'warn',
          summary: 'Предупреждение!',
          detail: 'Выберите название для каталога',
          life: 3000
        })
      } else if (FolderName.value !== '' && ChouseFolder.textContent !== 'Выберите каталог') {
        formData.append('folder', Path)
        formData.append('name', FolderName.value)
        this.$store.dispatch('PUT_ADDFOLDER_TO_SERVER', formData)
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
          document.getElementById('TextAdd').value = ''
        }, 1000)
        setTimeout(() => {
          this.ShowSpin = false
        }, 1000)
        setTimeout(() => {
          this.$store.dispatch('GET_JSON_FROM_SERVER')
        }, 1000)
        setTimeout(() => {
          this.$store.dispatch('GET_FOLDERMASS_FROM_SERVER')
        }, 1000)
      }
    },
    EditFolderFunc() {
      const formData = new FormData()
      const Path = this.StartFindDunck()
      const NewFolderName = document.getElementById('TextEdit')
      const ChouseFolder = document.getElementById('TreeSelect')
      if (NewFolderName.value === '' && ChouseFolder.textContent === 'Выберите каталог') {
        this.$toast.add({
          severity: 'warn',
          summary: 'Предупреждение!',
          detail: 'Выберите название для катлога и каталог расположения',
          life: 3000
        })
      } else if (NewFolderName.value !== '' && ChouseFolder.textContent === 'Выберите каталог') {
        this.$toast.add({
          severity: 'warn',
          summary: 'Предупреждение!',
          detail: 'Выберите каталог для расположения',
          life: 3000
        })
      } else if (NewFolderName.value === '' && ChouseFolder.textContent !== 'Выберите каталог') {
        this.$toast.add({
          severity: 'warn',
          summary: 'Предупреждение!',
          detail: 'Выберите название для каталога',
          life: 3000
        })
      } else if (NewFolderName.value !== '' && ChouseFolder.textContent !== 'Выберите каталог') {
        formData.append('folder', Path)
        formData.append('name', NewFolderName.value)
        this.$store.dispatch('PUT_EDITFOLDER_TO_SERVER', formData)
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
          document.getElementById('TextEdit').value = ''
        }, 1000)
        setTimeout(() => {
          this.ShowSpin = false
        }, 1000)
        setTimeout(() => {
          this.$store.dispatch('GET_JSON_FROM_SERVER')
        }, 1000)
        setTimeout(() => {
          this.$store.dispatch('GET_FOLDERMASS_FROM_SERVER')
        }, 1000)
      }
    },
    DeleteFolderFunc() {
      const formData = new FormData()
      const Path = this.StartFindDunck()
      const ChouseFolder = document.getElementById('TreeSelect')
      if (ChouseFolder === 'Выберите каталог') {
        this.$toast.add({
          severity: 'warn',
          summary: 'Предупреждение!',
          detail: 'Выберите название удаляемого каталга',
          life: 3000
        })
      } else {
        formData.append('folder', Path)
        this.$store.dispatch('PUT_DELETEFOLDER_TO_SERVER', formData)
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
          document.getElementById('TextAdd').value = ''
        }, 1000)
        setTimeout(() => {
          this.ShowSpin = false
        }, 1000)
        setTimeout(() => {
          this.$store.dispatch('GET_JSON_FROM_SERVER')
        }, 1000)
        setTimeout(() => {
          this.$store.dispatch('GET_FOLDERMASS_FROM_SERVER')
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
      displayFoldarAdd: false,
      diaplayFolderEdit: false,
      displayFolderDelete: false,
      position: 'top',
      selectedFolders: {},
      ShowSpin: false
    }
  }
}
</script>
