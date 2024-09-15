<template>
  <div id="Node">
    <div :style="{ 'margin-left': `${depth * 66}px` }">
      <div v-if="TreeNode.type == 'folder'" id="FolderNode">
        <table cellpadding="8" cellspacing="0">
          <tbody>
            <tr>
              <td id="el1">
                <v-Button
                  align="center"
                  v-model="checked"
                  icon="pi pi-angle-right"
                  id="ButtonNode"
                  style="border-radius: 20px"
                  @click="nodeClicked"
                />
              </td>
              <td id="el2">
                <div id="FolderField" align="center">
                  <table cellpadding="5" cellspacing="0">
                    <tbody>
                      <tr>
                        <td id="col1"><i class="pi pi-folder" style="font-size: 1.2rem"></i></td>
                        <td id="col2">
                          <div id="TextField">
                            <p>{{ TreeNode.name }}</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="TreeNode.type == 'file'" id="FileNode">
        <table cellpadding="8" cellspacing="0">
          <tbody>
            <tr>
              <td id="el1">
                <div id="FileField" align="center" @click="PutToCode(TreeNode)">
                  <table cellpadding="5" cellspacing="0">
                    <tbody>
                      <tr>
                        <td id="col1"><i class="pi pi-file" style="font-size: 1.2rem"></i></td>
                        <td id="col2">
                          <div id="TextField">
                            <p>{{ TreeNode.title }}</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
              <td id="el2">
                <v-Button
                  id="ButtonGoTrash"
                  @click="GoTrash('top', TreeNode.path)"
                  icon="pi pi-trash"
                  class="p-mr-2"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <Transition name="fade">
    <div v-if="expanded">
      <FileBrowser
        v-for="child in TreeNode.childrens"
        :key="child.name"
        :TreeNode="child"
        :depth="depth + 1"
      />
    </div>
  </Transition>
  <div>
    <v-Dialog
      id="FileGoTrashDialog"
      header="Отправка файла в коризну"
      v-model:visible="diaplayGoTrashDialog"
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
                <div id="TextQuestionToGoTrahs" align="center" style="border-radius: 20px">
                  Вы действительно хотите отправить файл "<font
                    v-if="TreeNode.title != undefined"
                    id="ChouseFile"
                    >{{ TreeNode.title }}</font
                  >" в корзину?
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
                        <Button
                          id="YesTrash"
                          ref="YesTrash"
                          label="Да"
                          @click="YesGoTrash()"
                          class="p-mr-2"
                        />
                      </td>
                      <td width="50%">
                        <Button
                          id="NoTrash"
                          ref="NoTrash"
                          label="Нет"
                          @click="NoGoTrash()"
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
    TreeNode: Object,
    depth: {
      type: Number,
      default: 0
    }
  },
  methods: {
    nodeClicked() {
      this.expanded = !this.expanded
    },
    PutToCode(file) {
      this.$store.dispatch('GET_JSONFILE_FROM_JSON_OBJECT', file)
    },
    GoTrash(position, Path) {
      this.position = position
      this.FilePath = Path
      this.diaplayGoTrashDialog = true
    },
    NoGoTrash() {
      this.diaplayGoTrashDialog = false
    },
    YesGoTrash() {
      const formData = new FormData()
      const Path = this.FilePath
      formData.append('Path', Path)
      this.$store.dispatch('PUT_PUTTOTRASH_TO_SERVER', formData)
      this.ShowSpin = true
      document.getElementById('YesTrash').setAttribute('disabled', 'disabled')
      document.getElementById('NoTrash').setAttribute('disabled', 'disabled')
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
        this.diaplayGoTrashDialog = false
      }, 1000)
      setTimeout(() => {
        document.getElementById('YesTrash').removeAttribute('disabled')
      }, 1000)
      setTimeout(() => {
        document.getElementById('NoTrash').removeAttribute('disabled')
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
    }
  },
  data() {
    return {
      expanded: false,
      position: 'top',
      diaplayGoTrashDialog: false,
      FilePath: '1',
      ShowSpin: false
    }
  }
}
</script>
