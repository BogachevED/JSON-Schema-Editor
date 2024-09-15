<template>
  <div :class="CountainerNumber">
    <div id="PropertiesDiv" v-if="FileCode.properties != undefined">
      <table cellpadding="2">
        <tbody>
          <tr>
            <td><p id="TextProp">Properties</p></td>
            <td>
              <v-Button
                id="DeletePropertiesOrItems"
                @click="DeletePropertiesOrItems($event)"
                icon="pi pi-times"
                class="p-mr-2"
              />
            </td>
            <td>
              <v-Button
                id="AddProperty"
                @click="AddProperty($event)"
                icon="pi pi-plus"
                class="p-mr-2"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div
        :class="NewDepth"
        align="left"
        v-for="(property, name) in FileCode.properties"
        :key="property"
      >
        <div id="Property" style="border-radius: 8px">
          <p id="Text">Название свойства</p>
          <table id="TableOfProperty" width="30%">
            <tbody>
              <tr>
                <td width="15%">
                  <v-InputText
                    Id="InputName"
                    type="text"
                    readonly="readonly"
                    placeholder="Имя элемента"
                    class="p-inputtext-sm"
                    :modelValue="name"
                  />
                </td>
                <td width="15%">
                  <v-Button
                    id="ButtonChangeProperty"
                    v-on:click="EditPropertyDialogFunc($event)"
                    icon="pi pi-cog"
                    class="p-mr-2"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table width="100%">
            <tbody>
              <tr>
                <td width="33%"><p id="Text">Параметры свойства</p></td>
                <td width="33%">
                  <v-Button
                    id="BtnAddProp"
                    label="Добавить Properties"
                    v-on:click="BtnAddProp($event)"
                  />
                </td>
                <td width="33%">
                  <v-Button
                    id="BtnAddItem"
                    label="Добавить Items"
                    v-on:click="BtnAddItem($event)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table id="PropertiesTable" width="100%" cellpadding="2">
            <tbody>
              <tr v-for="(fieldValue, fieldName) in property" :key="fieldName">
                <td v-if="CheckFieldOnType(fieldValue)" width="20%">
                  <v-InputText
                    Id="InputKey"
                    align="center"
                    type="text"
                    placeholder="Ключ"
                    readonly="readonly"
                    class="p-inputtext-sm"
                    :modelValue="fieldName"
                  />
                </td>
                <td v-if="CheckFieldOnType(fieldValue)" width="75%">
                  <v-InputText
                    Id="InputValue"
                    type="text"
                    placeholder="Значение"
                    readonly="readonly"
                    class="p-inputtext-sm"
                    :modelValue="fieldValue"
                  />
                </td>
                <td v-if="CheckFieldOnType(fieldValue)" width="5%">
                  <v-Button
                    id="EditJSONDialogFunc"
                    v-on:click="EditJSONDialogFunc($event)"
                    icon="pi pi-cog"
                    class="p-mr-2"
                  />
                </td>
              </tr>
              <tr>
                <td width="20%"></td>
                <td width="75%"></td>
                <td width="5%">
                  <v-Button
                    id="ButtonAddField"
                    v-on:click="AddTableRow($event)"
                    icon="pi pi-plus"
                    class="p-mr-2"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <CodeEditor
            :ref="'childComponent' + name"
            :DivDepth="ContainerCounter"
            :FileCode="property"
            :Depth="NewDepth"
          ></CodeEditor>
        </div>
      </div>
    </div>
    <div id="ItemsDiv" v-if="FileCode.items != undefined">
      <table cellpadding="2">
        <tbody>
          <tr>
            <td><p id="TextItem">Items</p></td>
            <td>
              <v-Button
                id="ButtonChangeField"
                @click="DeletePropertiesOrItems($event)"
                icon="pi pi-times"
                class="p-mr-2"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div id="Item" style="border-radius: 8px" align="left">
        <table>
          <tbody>
            <tr>
              <td><p id="Text">Параметры элемента</p></td>
              <td>
                <v-Button
                  id="BtnAddProp"
                  label="Добавить Properties"
                  v-on:click="BtnAddProp($event)"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <table id="ItemsTable" width="100%" cellpadding="2">
          <tbody>
            <tr v-for="(item, name) in FileCode.items" :key="item">
              <td v-if="CheckFieldOnType(item)" width="20%">
                <v-InputText
                  Id="InputKey"
                  align="center"
                  type="text"
                  placeholder="Ключ"
                  readonly="readonly"
                  class="p-inputtext-sm"
                  :modelValue="name"
                />
              </td>
              <td v-if="CheckFieldOnType(item)" width="75%">
                <v-InputText
                  Id="InputValue"
                  type="text"
                  placeholder="Значение"
                  readonly="readonly"
                  class="p-inputtext-sm"
                  :modelValue="item"
                />
              </td>
              <td v-if="CheckFieldOnType(item)" width="5%">
                <v-Button
                  id="ButtonChangeField"
                  v-on:click="EditJSONDialogFunc($event)"
                  icon="pi pi-cog"
                  class="p-mr-2"
                />
              </td>
            </tr>
            <tr>
              <td width="20%"></td>
              <td width="75%"></td>
              <td width="5%">
                <v-Button
                  id="ButtonAddField"
                  v-on:click="AddTableRow($event)"
                  icon="pi pi-plus"
                  class="p-mr-2"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <CodeEditor
          :ref="'childComponent'"
          :DivDepth="ContainerCounter"
          :FileCode="FileCode.items"
          :Depth="NewDepth"
        ></CodeEditor>
      </div>
    </div>
    <v-Dialog
      id="EditJSONDialog"
      header="Изменение параметров свойства"
      v-model:visible="displayEditJSONDialog"
      :style="{ width: '50vw' }"
      :position="position"
      :modal="true"
    >
      <div>
        <table id="ButtonsTable" width="45%" cellpadding="2">
          <tbody>
            <tr>
              <td><v-Button id="DelParam" label="Удалить параметр" @click="DelParam()" /></td>
              <td><v-Button id="SaveParam" label="Сохранить изменения" @click="SaveParam()" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <template #footer>
        <div>
          <table id="OldPropertyTable" style="display: none" width="100%" cellpadding="2">
            <tbody>
              <tr>
                <td>
                  <v-InputText
                    Id="OldKey"
                    align="center"
                    type="text"
                    placeholder="Ключ"
                    class="p-inputtext-sm"
                  />
                </td>
                <td>
                  <v-InputText
                    Id="OldValue"
                    align="center"
                    type="text"
                    placeholder="Значение"
                    class="p-inputtext-sm"
                  />
                </td>
                <td>
                  <v-InputText
                    Id="OldDopParam"
                    align="center"
                    type="text"
                    placeholder="Дополнительный параметр"
                    class="p-inputtext-sm"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table id="FieldTypeTable" width="100%" cellpadding="2">
            <tbody>
              <tr>
                <td>
                  <v-Select
                    id="SelectedPropertyDropdown"
                    align="left"
                    v-model="SelectedProperty"
                    :options="PropertyType"
                    optionLabel="name"
                    placeholder="Выберите тип параметра"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="SelectedProperty != null">
            <div
              id="TypedParameter"
              v-if="SelectedProperty.name == 'Типизированый параметр'"
              align="center"
            >
              <table id="FieldNewTypeTyped" width="100%" cellpadding="2">
                <tbody>
                  <tr>
                    <td width="50%">
                      <v-Select
                        id="SelectedNewTypeKey"
                        align="left"
                        v-model="SelectedNewType_Key"
                        :options="SelectedTypeKey"
                        optionLabel="name"
                        placeholder="Ключ"
                      />
                    </td>
                    <td width="50%">
                      <v-InputText
                        v-if="ArrayOfStrProperties.includes(SelectedNewType_Key.name)"
                        id="SelectedNewTypeValueSTR"
                        align="left"
                        placeholder="Значение"
                      />
                      <v-InputNumber
                        v-else-if="ArrayOfIntProperties.includes(SelectedNewType_Key.name)"
                        id="SelectedNewTypeValueINT"
                        v-model="value20"
                        placeholder="Значение"
                        mode="decimal"
                        showButtons
                        :min="0"
                      />
                      <v-Select
                        v-else-if="ArrayOfSwithProperties.includes(SelectedNewType_Key.name)"
                        id="SelectedNewTypeValueSWITH"
                        align="left"
                        v-model="SelectedNewValue_Switch"
                        :options="SelectedValueSwitch"
                        optionLabel="name"
                        placeholder="Значение"
                      />
                      <v-InputText
                        v-else-if="ArrayOfMassProperties.includes(SelectedNewType_Key.name)"
                        id="SelectedNewTypeValueMASS"
                        align="left"
                        placeholder="Значение"
                      />
                      <v-Select
                        v-else-if="ArrayOfTypeProperties.includes(SelectedNewType_Key.name)"
                        id="SelectedNewTypeValueTYPE"
                        align="left"
                        v-model="SelectedNewValue_Type"
                        :options="SelectedValueType"
                        optionLabel="name"
                        placeholder="Значение"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              id="CustomParameter"
              v-else-if="SelectedProperty.name == 'Свой параметр'"
              align="center"
            >
              <table id="FieldNewTypeOwn" width="100%" cellpadding="2">
                <tbody>
                  <tr>
                    <td>
                      <v-InputText
                        Id="SelectedNewSelfWrittenKey"
                        align="center"
                        type="text"
                        placeholder="Ключ"
                        class="p-inputtext-sm"
                      />
                    </td>
                    <td>
                      <v-InputText
                        Id="SelectedNewSelfWrittenValue"
                        align="center"
                        type="text"
                        placeholder="Значение"
                        class="p-inputtext-sm"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </template>
    </v-Dialog>
    <v-Dialog
      id="EditJSONDialog"
      header="Изменение свойства"
      v-model:visible="displayEditPropertyDialog"
      :style="{ width: '50vw' }"
      :position="position"
      :modal="true"
    >
      <div>
        <table id="ButtonsTable" width="45%" cellpadding="2">
          <tbody>
            <tr>
              <td><v-Button id="DelParam" label="Удалить свойство" @click="DelProperty()" /></td>
              <td>
                <v-Button id="SaveParam" label="Сохранить изменения" @click="SaveProperty()" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <template #footer>
        <div>
          <table id="OldPropertyzTable" style="display: none" width="100%" cellpadding="2">
            <tbody>
              <tr>
                <td width="100%">
                  <v-InputText Id="OldName" align="center" type="text" placeholder="Имя" />
                </td>
              </tr>
            </tbody>
          </table>
          <table id="NewPropertyzTable" width="100%" cellpadding="2">
            <tbody>
              <tr>
                <td width="100%">
                  <v-InputText id="NewName" align="left" placeholder="Имя" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </v-Dialog>
  </div>
</template>

<script>
export default {
  props: {
    FileCode: Object,
    Depth: String,
    DivDepth: Array
  },
  methods: {
    CheckFieldOnType(Value) {
      if (typeof Value !== 'object') {
        return true
      } else {
        if (Array.isArray(Value)) {
          return true
        } else {
          return false
        }
      }
    },
    CheckFormat(dataToCheck) {
      if (dataToCheck.indexOf(',') > -1) {
        const arrayOfStrings = dataToCheck.split(',')
        return arrayOfStrings
      } else {
        return dataToCheck
      }
    },
    JSONBuild(JSONtemp) {
      if (document.getElementsByClassName(this.CountainerNumber).item(0).children[0]) {
        if (
          document.getElementsByClassName(this.CountainerNumber).item(0).children[0].id ===
          'PropertiesDiv'
        ) {
          const prop = {}
          const PropCase = document
            .getElementsByClassName(this.CountainerNumber)
            .item(0)
            .children[0].getElementsByClassName(this.NewDepth)
          const PropCaseLength = document
            .getElementsByClassName(this.CountainerNumber)
            .item(0)
            .children[0].getElementsByClassName(this.NewDepth).length
          for (let j = 0; j < PropCaseLength; j++) {
            const table = PropCase.item(j).children[0].children[3]
            const TextField =
              PropCase.item(j).children[0].children[1].rows[0].cells[0].children[0].value
            for (let i = 0; i < table.rows.length - 1; i++) {
              if (table.rows[i].cells[0] !== undefined) {
                if (
                  table.rows[i].cells[0].children[0].value !== undefined &&
                  table.rows[i].cells[1].children[0].value !== undefined
                ) {
                  const keyJS = this.CheckFormat(table.rows[i].cells[0].children[0].value)
                  const valueJS = this.CheckFormat(table.rows[i].cells[1].children[0].value)
                  if (prop[TextField] === undefined) {
                    prop[TextField] = {}
                    prop[TextField][keyJS] = valueJS
                  } else {
                    prop[TextField][keyJS] = valueJS
                  }
                }
              }
            }
          }
          if (JSON.stringify(prop) === JSON.stringify({})) {
            JSONtemp.properties = prop
            for (let i = 0; i < Object.keys(JSONtemp.properties).length; i++) {
              for (let j = 0; j < PropCaseLength; j++) {
                if (PropCase.item(j).children[0].children[4].children[0]) {
                  if (
                    PropCase.item(j).children[0].children[1].children[0].children[0].children[0]
                      .value === Object.keys(JSONtemp.properties)[i]
                  ) {
                    const JSp = Object.keys(JSONtemp.properties)[i]
                    JSONtemp.properties[JSp] = this.$refs['childComponent' + JSp].JSONBuild(
                      JSONtemp.properties[JSp]
                    )
                  }
                }
              }
            }
          }
        } else if (
          document.getElementsByClassName(this.CountainerNumber).item(0).children[0].id ===
          'ItemsDiv'
        ) {
          const item = {}
          const table = document.getElementById('ItemsDiv').children[1].children[1]
          for (let i = 0; i < table.rows.length - 1; i++) {
            if (table.rows[i].cells[0] !== undefined) {
              if (
                table.rows[i].cells[0].children[0].value !== undefined &&
                table.rows[i].cells[1].children[0].value !== undefined
              ) {
                const keyJS = this.CheckFormat(table.rows[i].cells[0].children[0].value)
                const valueJS = this.CheckFormat(table.rows[i].cells[1].children[0].value)
                item[keyJS] = valueJS
              }
            }
          }
          if (JSON.stringify(item) === JSON.stringify({})) {
            JSONtemp.items = item
            if (document.getElementById('Item').children[1]) {
              if (document.getElementById('Item').children[1].children[0]) {
                JSONtemp.items = this.$refs.childComponent.JSONBuild(JSONtemp.items)
              }
            }
          }
        }
      }
      return JSONtemp
    },
    EditJSONDialogFunc: function (e) {
      this.ChousenRow = e.currentTarget.parentElement.parentElement
      this.ChousenTable = e.currentTarget.parentElement.parentElement.parentElement
      if (document.getElementsByClassName(this.CountainerNumber).item(0).children[0]) {
        if (
          document.getElementsByClassName(this.CountainerNumber).item(0).children[0].id ===
          'PropertiesDiv'
        ) {
          const fieldName =
            e.currentTarget.parentElement.parentElement.children[0].children[0].value
          const fieldValue =
            e.currentTarget.parentElement.parentElement.children[1].children[0].value
          const name =
            e.currentTarget.parentElement.parentElement.parentElement.parentElement.children[1]
              .children[0].children[0].children[0].value
          if (this.ArrayOfAllProperties.includes(fieldName)) {
            this.SelectedProperty = {}
            this.SelectedProperty.name = 'Типизированый параметр'
            this.SelectedNewType_Key = {}
            this.SelectedNewType_Key.name = fieldName
            this.position = 'top'
            this.displayEditJSONDialog = true
            setTimeout(() => {
              if (this.ArrayOfTypeProperties.includes(fieldName)) {
                this.SelectedNewValue_Type = {}
                this.SelectedNewValue_Type.name = fieldValue
              } else if (this.ArrayOfStrProperties.includes(fieldName)) {
                document.getElementById('FieldNewTypeTyped').rows[0].cells[1].children[0].value =
                  fieldValue
              } else if (this.ArrayOfSwithProperties.includes(fieldName)) {
                this.SelectedNewValue_Switch = {}
                this.SelectedNewValue_Switch.name = fieldValue
              } else if (this.ArrayOfMassProperties.includes(fieldName)) {
                document.getElementById('FieldNewTypeTyped').rows[0].cells[1].children[0].value =
                  fieldValue
              } else if (this.ArrayOfIntProperties.includes(fieldName)) {
                this.value20 = fieldValue
              }
              document.getElementById('OldKey').value = fieldName
              document.getElementById('OldValue').value = fieldValue
              document.getElementById('OldDopParam').value = name
            }, 5)
          } else {
            this.SelectedProperty = {}
            this.SelectedProperty.name = 'Свой параметр'
            this.SelectedNewType_Key = {}
            this.SelectedNewType_Key.name = fieldName
            this.position = 'top'
            this.displayEditJSONDialog = true
            setTimeout(() => {
              document.getElementById('SelectedNewSelfWrittenKey').value = fieldName
              document.getElementById('SelectedNewSelfWrittenValue').value = fieldValue
              document.getElementById('OldKey').value = fieldName
              document.getElementById('OldValue').value = fieldValue
              document.getElementById('OldDopParam').value = name
            }, 5)
          }
        } else if (
          document.getElementsByClassName(this.CountainerNumber).item(0).children[0].id ===
          'ItemsDiv'
        ) {
          const fieldName =
            e.currentTarget.parentElement.parentElement.children[0].children[0].value
          const fieldValue =
            e.currentTarget.parentElement.parentElement.children[1].children[0].value
          const name = '1'
          if (this.ArrayOfAllProperties.includes(fieldName)) {
            this.SelectedProperty = {}
            this.SelectedProperty.name = 'Типизированый параметр'
            this.SelectedNewType_Key = {}
            this.SelectedNewType_Key.name = fieldName
            this.position = 'top'
            this.displayEditJSONDialog = true
            setTimeout(() => {
              if (this.ArrayOfTypeProperties.includes(fieldName)) {
                this.SelectedNewValue_Type = {}
                this.SelectedNewValue_Type.name = fieldValue
              } else if (this.ArrayOfStrProperties.includes(fieldName)) {
                document.getElementById('FieldNewTypeTyped').rows[0].cells[1].children[0].value =
                  fieldValue
              } else if (this.ArrayOfSwithProperties.includes(fieldName)) {
                this.SelectedNewValue_Switch = {}
                this.SelectedNewValue_Switch.name = fieldValue
              } else if (this.ArrayOfMassProperties.includes(fieldName)) {
                document.getElementById('FieldNewTypeTyped').rows[0].cells[1].children[0].value =
                  fieldValue
              } else if (this.ArrayOfIntProperties.includes(fieldName)) {
                this.value20 = fieldValue
              }
              document.getElementById('OldKey').value = fieldName
              document.getElementById('OldValue').value = fieldValue
              document.getElementById('OldDopParam').value = name
            }, 5)
          } else {
            this.SelectedProperty = {}
            this.SelectedProperty.name = 'Свой параметр'
            this.SelectedNewType_Key = {}
            this.SelectedNewType_Key.name = fieldName
            this.position = 'top'
            this.displayEditJSONDialog = true
            setTimeout(() => {
              document.getElementById('SelectedNewSelfWrittenKey').value = fieldName
              document.getElementById('SelectedNewSelfWrittenValue').value = fieldValue
              document.getElementById('OldKey').value = fieldName
              document.getElementById('OldValue').value = fieldValue
              document.getElementById('OldDopParam').value = name
            }, 5)
          }
        }
      }
    },
    NewCounter(DivDepth) {
      let array = []
      array = DivDepth
      array.push(array.length.toString())
      return array
    },
    DivClassNumber(DivDepth) {
      let array = []
      array = DivDepth
      const rt = (array.length - 1).toString()
      return rt
    },
    SaveParam() {
      const TableRow = this.ChousenRow
      if (document.getElementById('TypedParameter')) {
        console.log('TypedParameter')
        const DialogTable =
          document.getElementById('TypedParameter').children[0].rows[0].cells[1].children[0]
        if (DialogTable.id === 'SelectedNewTypeValueSTR') {
          TableRow.cells[0].children[0].value =
            document.getElementById(
              'TypedParameter'
            ).children[0].rows[0].cells[0].children[0].children[1].innerHTML
          TableRow.cells[1].children[0].value =
            document.getElementById('TypedParameter').children[0].rows[0].cells[1].children[0].value
        } else if (DialogTable.id === 'SelectedNewTypeValueINT') {
          TableRow.cells[0].children[0].value =
            document.getElementById(
              'TypedParameter'
            ).children[0].rows[0].cells[0].children[0].children[1].innerHTML
          TableRow.cells[1].children[0].value =
            document.getElementById('TypedParameter').children[0].rows[0].cells[1].children[0].value
        } else if (DialogTable.id === 'SelectedNewTypeValueSWITH') {
          TableRow.cells[0].children[0].value =
            document.getElementById(
              'TypedParameter'
            ).children[0].rows[0].cells[0].children[0].children[1].innerHTML
          TableRow.cells[1].children[0].value =
            document.getElementById(
              'TypedParameter'
            ).children[0].rows[0].cells[1].children[0].children[1].innerHTML
        } else if (DialogTable.id === 'SelectedNewTypeValueMASS') {
          TableRow.cells[0].children[0].value =
            document.getElementById(
              'TypedParameter'
            ).children[0].rows[0].cells[0].children[0].children[1].innerHTML
          TableRow.cells[1].children[0].value =
            document.getElementById('TypedParameter').children[0].rows[0].cells[1].children[0].value
        } else if (DialogTable.id === 'SelectedNewTypeValueTYPE') {
          TableRow.cells[0].children[0].value =
            document.getElementById(
              'TypedParameter'
            ).children[0].rows[0].cells[0].children[0].children[1].innerHTML
          TableRow.cells[1].children[0].value =
            document.getElementById(
              'TypedParameter'
            ).children[0].rows[0].cells[1].children[0].children[1].innerHTML
        }
      } else if (document.getElementById('CustomParameter')) {
        console.log('CustomParameter')
        TableRow.cells[0].children[0].value =
          document.getElementById('CustomParameter').children[0].rows[0].cells[0].children[0].value
        TableRow.cells[1].children[0].value =
          document.getElementById('CustomParameter').children[0].rows[0].cells[1].children[0].value
      }
      this.displayEditJSONDialog = false
    },
    DelParam() {
      const OldKey = document.getElementById('OldKey').value
      const OldValue = document.getElementById('OldValue').value
      const table = this.ChousenTable
      for (let i = 0; i < table.rows.length - 1; i++) {
        if (table.rows[i].cells[0] !== undefined) {
          if (
            table.rows[i].cells[0].children[0].value === OldKey &&
            table.rows[i].cells[1].children[0].value === OldValue
          ) {
            table.deleteRow(i)
          }
        }
      }
      this.displayEditJSONDialog = false
    },
    AddTableRow: function (e) {
      const table = e.currentTarget.parentElement.parentElement.parentElement
      const row = document.createElement('TR')
      const td1 = document.createElement('TD')
      const td2 = document.createElement('TD')
      const td3 = document.createElement('TD')
      td1.innerHTML =
        '<input class="p-inputtext p-component p-filled p-inputtext-sm" id="InputKey" allign="center" type="text" placeholder="Ключ" readonly>'
      td2.innerHTML =
        '<input class="p-inputtext p-component p-filled p-inputtext-sm" id="InputValue" allign="center" type="text" placeholder="Значение" readonly>'
      td3.innerHTML =
        '<button class="p-button p-component p-button-icon-only p-mr-2" type="button" id="ButtonChangeField"><span class="pi pi-cog p-button-icon"></span><span class="p-button-label"></span></button>'
      console.log(td3.children[0])
      td3.children[0].addEventListener('click', this.EditJSONDialogFunc)
      row.appendChild(td1)
      row.appendChild(td2)
      row.appendChild(td3)
      table.insertBefore(row, table.rows[table.rows.length - 1])
    },
    EditPropertyDialogFunc: function (e) {
      if (document.getElementsByClassName(this.CountainerNumber).item(0).children[0]) {
        if (
          document.getElementsByClassName(this.CountainerNumber).item(0).children[0].id ===
          'PropertiesDiv'
        ) {
          const NeedDiv =
            e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement
          const fieldName =
            e.currentTarget.parentElement.parentElement.parentElement.parentElement.children[1]
              .rows[0].cells[0].children[0].value
          this.position = 'top'
          this.displayEditPropertyDialog = true
          this.chousenDiv = NeedDiv
          console.log(this.chousenDiv)
          setTimeout(() => {
            document.getElementById('OldName').value = fieldName
            document.getElementById('NewName').value = fieldName
          }, 5)
        }
      }
    },
    DelProperty() {
      this.chousenDiv.remove()
      this.displayEditPropertyDialog = false
      console.log(this.PropertyType)
    },
    SaveProperty() {
      this.chousenDiv.children[0].children[1].rows[0].cells[0].children[0].value =
        document.getElementById('NewName').value
      this.displayEditPropertyDialog = false
    },
    DeletePropertiesOrItems: function (e) {
      const NeedDiv = e.currentTarget.parentElement.parentElement.parentElement.parentElement
      NeedDiv.remove()
    },
    AddProperty: function (e) {
      const NeedDiv =
        e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement
          .children[0]
      const NeedElement =
        e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement
          .children[0].children[1]
      console.log(NeedDiv)
      console.log(NeedElement)
      const p1 = document.createElement('p')
      p1.setAttribute('id', 'Text')
      p1.innerHTML = 'Название свойства'
      const td1 = document.createElement('TD')
      td1.setAttribute('width', '15%')
      td1.innerHTML =
        '<input class="p-inputtext p-component p-filled p-inputtext-sm" id="InputName" type="text" readonly="readonly" placeholder="Имя элемента">'
      const td2 = document.createElement('TD')
      td2.setAttribute('width', '15%')
      td2.innerHTML =
        '<button class="p-button p-component p-button-icon-only p-mr-2" type="button" id="ButtonChangeProperty"><!----><span class="pi pi-cog p-button-icon"></span><span class="p-button-label"></span></button>'
      td2.children[0].addEventListener('click', this.EditPropertyDialogFunc)
      const tr1 = document.createElement('TR')
      tr1.appendChild(td1)
      tr1.appendChild(td2)
      const table1 = document.createElement('table')
      table1.appendChild(tr1)
      table1.setAttribute('width', '30%')
      table1.setAttribute('id', 'TableOfProperty')
      const td3 = document.createElement('TD')
      td3.setAttribute('width', '33%')
      td3.innerHTML = '<p id="Text">Параметры свойства</p>'
      const td4 = document.createElement('TD')
      td4.setAttribute('width', '33%')
      td4.innerHTML =
        '<button class="p-button p-component" type="button" id="BtnAddProp"><span class="p-button-label">Добавить Properties</span></button>'
      td4.children[0].addEventListener('click', this.BtnAddProp)
      const td5 = document.createElement('TD')
      td5.setAttribute('width', '33%')
      td5.innerHTML =
        '<button class="p-button p-component" type="button" id="BtnAddItem"><span class="p-button-label">Добавить Items</span></button>'
      td5.children[0].addEventListener('click', this.BtnAddItem)
      const tr2 = document.createElement('TR')
      tr2.appendChild(td3)
      tr2.appendChild(td4)
      tr2.appendChild(td5)
      const table2 = document.createElement('table')
      table2.setAttribute('width', '100%')
      table2.appendChild(tr2)
      const td6 = document.createElement('TD')
      td6.setAttribute('width', '5%')
      td6.innerHTML =
        '<button class="p-button p-component p-button-icon-only p-mr-2" type="button" id="ButtonAddField"><span class="pi pi-plus p-button-icon"></span><span class="p-button-label"></span></button>'
      td6.children[0].addEventListener('click', this.AddTableRow)
      const td7 = document.createElement('TD')
      td7.setAttribute('width', '75%')
      const td8 = document.createElement('TD')
      td8.setAttribute('width', '20%')
      const tr3 = document.createElement('TR')
      tr3.appendChild(td8)
      tr3.appendChild(td7)
      tr3.appendChild(td6)
      const table3 = document.createElement('table')
      table3.appendChild(tr3)
      table3.setAttribute('width', '100%')
      table3.setAttribute('id', 'PropertiesTable')
      const div1 = document.createElement('div')
      div1.setAttribute('class', this.ContainerCounter.length)
      this.ContainerCounter.push(this.ContainerCounter.length)
      const div2 = document.createElement('div')
      div2.setAttribute('id', 'Property')
      div2.setAttribute('style', 'border-radius: 8px')
      div2.appendChild(p1)
      div2.appendChild(table1)
      div2.appendChild(table2)
      div2.appendChild(table3)
      div2.appendChild(div1)
      const div3 = document.createElement('div')
      div3.setAttribute('class', this.NewDepth)
      div3.setAttribute('align', 'left')
      div3.appendChild(div2)
      NeedDiv.insertBefore(div3, NeedElement)
    },
    BtnAddProp: function (e) {
      if (e.currentTarget.parentElement.parentElement.parentElement.parentElement.children[4]) {
        if (
          e.currentTarget.parentElement.parentElement.parentElement.parentElement.children[4]
            .children[0]
        ) {
          this.$toast.add({
            severity: 'warn',
            summary: 'Оповещение!',
            detail: 'Данный элемент уже имеет дочернюю вложенность',
            life: 5000
          })
        } else {
          const NeedDiv =
            e.currentTarget.parentElement.parentElement.parentElement.parentElement.children[4]
          console.log(NeedDiv)
          const p1 = document.createElement('p')
          p1.setAttribute('id', 'TextProp')
          p1.innerHTML = 'Properties'
          const td1 = document.createElement('TD')
          td1.appendChild(p1)
          const td2 = document.createElement('TD')
          td2.innerHTML =
            '<button class="p-button p-component p-button-icon-only p-mr-2" type="button" id="DeletePropertiesOrItems"><span class="pi pi-times p-button-icon"></span><span class="p-button-label">&nbsp;</span></button>'
          td2.children[0].addEventListener('click', this.DeletePropertiesOrItems)
          const td3 = document.createElement('TD')
          td3.innerHTML =
            '<button class="p-button p-component p-button-icon-only p-mr-2" type="button" id="AddProperty"><span class="pi pi-plus p-button-icon"></span><span class="p-button-label">&nbsp;</span></button>'
          td3.children[0].addEventListener('click', this.AddProperty)
          const tr1 = document.createElement('TR')
          tr1.appendChild(td1)
          tr1.appendChild(td2)
          tr1.appendChild(td3)
          const table1 = document.createElement('table')
          table1.appendChild(tr1)
          table1.setAttribute('cellpadding', 2)
          const div1 = document.createElement('div')
          div1.setAttribute('id', 'PropertiesDiv')
          div1.appendChild(table1)
          NeedDiv.appendChild(div1)
        }
      } else {
        if (
          e.currentTarget.parentElement.parentElement.parentElement.parentElement.children[2]
            .children[0]
        ) {
          this.$toast.add({
            severity: 'warn',
            summary: 'Оповещение!',
            detail: 'Данный элемент уже имеет дочернюю вложенность',
            life: 5000
          })
        } else {
          const NeedDiv =
            e.currentTarget.parentElement.parentElement.parentElement.parentElement.children[2]
          console.log(NeedDiv)
          const p1 = document.createElement('p')
          p1.setAttribute('id', 'TextProp')
          p1.innerHTML = 'Properties'
          const td1 = document.createElement('TD')
          td1.appendChild(p1)
          const td2 = document.createElement('TD')
          td2.innerHTML =
            '<button class="p-button p-component p-button-icon-only p-mr-2" type="button" id="DeletePropertiesOrItems"><span class="pi pi-times p-button-icon"></span><span class="p-button-label">&nbsp;</span></button>'
          td2.children[0].addEventListener('click', this.DeletePropertiesOrItems)
          const td3 = document.createElement('TD')
          td3.innerHTML =
            '<button class="p-button p-component p-button-icon-only p-mr-2" type="button" id="AddProperty"><span class="pi pi-plus p-button-icon"></span><span class="p-button-label">&nbsp;</span></button>'
          td3.children[0].addEventListener('click', this.AddProperty)
          const tr1 = document.createElement('TR')
          tr1.appendChild(td1)
          tr1.appendChild(td2)
          tr1.appendChild(td3)
          const table1 = document.createElement('table')
          table1.appendChild(tr1)
          table1.setAttribute('cellpadding', 2)
          const div1 = document.createElement('div')
          div1.setAttribute('id', 'PropertiesDiv')
          div1.appendChild(table1)
          NeedDiv.appendChild(div1)
        }
      }
    },
    BtnAddItem: function (e) {
      if (
        e.currentTarget.parentElement.parentElement.parentElement.parentElement.children[4]
          .children[0]
      ) {
        this.$toast.add({
          severity: 'warn',
          summary: 'Оповещение!',
          detail: 'Данный элемент уже имеет дочернюю вложенность',
          life: 5000
        })
      } else {
        const NeedDiv =
          e.currentTarget.parentElement.parentElement.parentElement.parentElement.children[4]
        console.log(NeedDiv)
        const td1 = document.createElement('TD')
        td1.setAttribute('width', '20%')
        const td2 = document.createElement('TD')
        td2.setAttribute('width', '75%')
        const td3 = document.createElement('TD')
        td3.setAttribute('width', '5%')
        td3.innerHTML =
          '<button class="p-button p-component p-button-icon-only p-mr-2" type="button" id="ButtonAddField"><span class="pi pi-plus p-button-icon"></span><span class="p-button-label">&nbsp;</span></button>'
        td3.children[0].addEventListener('click', this.AddTableRow)
        const tr1 = document.createElement('TR')
        tr1.appendChild(td1)
        tr1.appendChild(td2)
        tr1.appendChild(td3)
        const table1 = document.createElement('table')
        table1.setAttribute('id', 'ItemsTable')
        table1.setAttribute('width', '100%')
        table1.setAttribute('cellpadding', 2)
        table1.appendChild(tr1)
        const td4 = document.createElement('TD')
        td4.innerHTML = '<p id="Text">Параметры элемента</p>'
        const td5 = document.createElement('TD')
        td5.innerHTML =
          '<button class="p-button p-component" type="button" id="BtnAddProp"><span class="p-button-label">Добавить Properties</span></button>'
        td5.children[0].addEventListener('click', this.BtnAddProp)
        const tr2 = document.createElement('TR')
        tr2.appendChild(td4)
        tr2.appendChild(td5)
        const table2 = document.createElement('table')
        table2.appendChild(tr2)
        const div1 = document.createElement('div')
        div1.setAttribute('class', this.ContainerCounter.length)
        this.ContainerCounter.push(this.ContainerCounter.length)
        const div2 = document.createElement('div')
        div2.setAttribute('id', 'Item')
        div2.setAttribute('align', 'left')
        div2.setAttribute('style', 'border-radius: 8px')
        div2.appendChild(table2)
        div2.appendChild(table1)
        div2.appendChild(div1)
        const td6 = document.createElement('TD')
        td6.innerHTML = '<p id="TextItem">Items</p>'
        const td7 = document.createElement('TD')
        td7.innerHTML =
          '<button class="p-button p-component p-button-icon-only p-mr-2" type="button" id="ButtonChangeField"><span class="pi pi-times p-button-icon"></span><span class="p-button-label">&nbsp;</span></button>'
        td7.children[0].addEventListener('click', this.DeletePropertiesOrItems)
        const tr3 = document.createElement('TR')
        tr3.appendChild(td6)
        tr3.appendChild(td7)
        const table3 = document.createElement('table')
        table3.setAttribute('cellpadding', 2)
        table3.appendChild(tr3)
        const div3 = document.createElement('div')
        div3.setAttribute('id', 'ItemDiv')
        div3.appendChild(table3)
        div3.appendChild(div2)
        NeedDiv.appendChild(div3)
      }
    }
  },
  data() {
    return {
      NewDepth: this.Depth + '-0',
      ContainerCounter: this.NewCounter(this.DivDepth),
      CountainerNumber: this.DivClassNumber(this.DivDepth),
      ChousenRow: {},
      ChousenTable: {},
      displayEditJSONDialog: false,
      displayEditPropertyDialog: false,
      position: 'center',
      chousenDiv: null,
      value20: 0,
      ArrayOfAllProperties: [
        'type',
        'description',
        'title',
        'pattern',
        'required',
        'default',
        'readOnly',
        'additionalItems',
        'minItems',
        'maxItems',
        'uniqueItems',
        'additionalProperties',
        'minProperties',
        'maxProperties',
        'multipleOf',
        'minimum',
        'excludeMinimum',
        'maximum',
        'excludeMaximum',
        'minLength',
        'maxLength'
      ],
      ArrayOfTypeProperties: ['type'],
      ArrayOfStrProperties: ['title', 'pattern', 'description', 'default'],
      ArrayOfSwithProperties: [
        'additionalProperties',
        'readOnly',
        'additionalItems',
        'uniqueItems'
      ],
      ArrayOfMassProperties: ['required'],
      ArrayOfIntProperties: [
        'minItems',
        'maxItems',
        'minProperties',
        'maxProperties',
        'multipleOf',
        'minimum',
        'excludeMinimum',
        'maximum',
        'excludeMaximum',
        'minLength',
        'maxLength'
      ],
      SelectedProperty: null,
      PropertyType: [{ name: 'Типизированый параметр' }, { name: 'Свой параметр' }],
      SelectedNewType_Key: null,
      SelectedTypeKey: [
        { name: 'type' },
        { name: 'title' },
        { name: 'description' },
        { name: 'pattern' },
        { name: 'required' },
        { name: 'default' },
        { name: 'readOnly' },
        { name: 'additionalItems' },
        { name: 'minItems' },
        { name: 'maxItems' },
        { name: 'uniqueItems' },
        { name: 'additionalProperties' },
        { name: 'minProperties' },
        { name: 'maxProperties' },
        { name: 'multipleOf' },
        { name: 'minimum' },
        { name: 'excludeMinimum' },
        { name: 'maximum' },
        { name: 'excludeMaximum' },
        { name: 'minLength' },
        { name: 'maxLength' }
      ],
      SelectedNewValue_Switch: null,
      SelectedValueSwitch: [{ name: 'true' }, { name: 'false' }],
      SelectedNewValue_Type: null,
      SelectedValueType: [
        { name: 'string' },
        { name: 'integer' },
        { name: 'number' },
        { name: 'boolean' },
        { name: 'object' },
        { name: 'array' },
        { name: 'null' }
      ]
    }
  }
}
</script>
