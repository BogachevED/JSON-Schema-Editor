/* eslint-disable no-undef */
//File System для работы с файлами в каталоге
const fs = require('fs');
//Chalk для работы в консоли
const chalk = require('chalk');
//Стартовый каталог
let Current = 'files'
//Начальный путь
let Parent = './'
//Каталог корзины
let Trash = './trash'

function CreateJSON(Parent, Current) {
  /*Заполняем шапку*/
  let data = {
    name: Current,
  }
  /*Переменная с ифнормацией об объекте*/
  let check = fs.statSync(Parent+Current)
  /*Условия проверки*/
  if (check.isDirectory()) {
    /*Если каталог*/

    /*Запись списка папок и файлов в переменную*/
    //LOIO - List of internal objects
    let LOIO = fs.readdirSync(Parent+Current)
    let PathTemp = (Parent + Current + '/')
    data.path = PathTemp
    data.type = "folder"
    let arr = new Array()
    for (let i = 0; i <= LOIO.length-1; i++)
    {
      arr.push(CreateJSON(PathTemp, LOIO[i]))
    }
    data.childrens = arr
  }
  else {
    /*Если файл*/
    var path = require('path')
    var ext = path.extname(Current)
    if (ext == ".json")
    {
      data.path = Parent + Current;
      data.type = "file"
      const file = require(Parent + Current)
      data.title = (file.title)
      data.content = (file)
    }
  }
  return data;
}

function CreateFoldersList(Parent, Current) {
  let List = {
    "root": []
  }
  let obj = ListObject(Parent, Current, "0")
  List.root.push(obj)
  return List;
}

function ListObject(Parent, Current, Number) {
  let folder = {
    "key": Number,
    "label": Current,
    "data": (Parent+Current),
    "icon": "pi pi-fw pi-folder",
  }
  /*Условия проверки*/
  let LOIO = fs.readdirSync(Parent+Current)
  let PathTemp = (Parent + Current + '/')
  let j = 0
  for (let i = 0; i <= LOIO.length-1; i++)
  {
    let check = fs.statSync(PathTemp+LOIO[i])
    if (check.isDirectory()) {
      if (folder.children == null) {
        folder.children = []
        folder.children.push(ListObject(PathTemp, LOIO[i], (Number + "-" + j.toString())))
      }
      else {
        folder.children.push(ListObject(PathTemp, LOIO[i], (Number + "-" + j.toString())))
      }
      j++
    }
  }
  return folder
}

function CreateTrash(Trash) {
  /*Запись списка файлов в каталог trash*/
  //LOTO - List of trash objects
  let LOTO = fs.readdirSync(Trash)
  let arr = new Array()
  let data = {}
  for (let i = 0; i <= LOTO.length-1; i++)
  {
    var path = require('path')
    var ext = path.extname(LOTO[i])
    if (ext == ".json") {
      const file = require(Trash + "/" + LOTO[i])
      let obj = {
        Name: LOTO[i],
        Title: file.title,
        Path: (Trash + "/" + LOTO[i]),
        FileContext: file
      }
      arr.push(obj)
    }
  }
  data.files = arr
  return data
}

function GetDataElem(str, n1, n2) {
  let BodyArr = str.split('\r\n', n1)
  /*Получаем путь каталога в переменной FolderName*/
  let FolderName = BodyArr[n2]
  return FolderName
}

function GetFileName(str) {
  let BodyArr = str.split('\r\n', 6)
  let StringArr = BodyArr[5]
  let FieldStr = StringArr.split(';')
  FieldStr = FieldStr[2]
  let FileName = ''
  let flag = 0
  /*Получаем имя файла в переменной FileName*/
  for (let i = 0; i <= FieldStr.length; i++) {
    if (FieldStr[i] == '"') {
      if (flag == 0) {
        flag = 1
      }
      else {
        flag = 0
      }
    }
    if ((flag == 1) && (FieldStr[i] != '"')) {
      FileName += FieldStr[i]
    }
  }
  return FileName
}

function GetFileContext(str) {
  let BodyArr = str.split('\r\n')
  let FileContext = ''
  /*Получаем содержимое файла в FileContext*/
  for (let i = 8; i <= BodyArr.length-3; i++) {
    if (i == BodyArr.length-3) {
      FileContext += (BodyArr[i])
    }
    else {
      FileContext += (BodyArr[i] + '\n')
    }
  }
  return FileContext
}

function GetObjcetContext(str) {
  let BodyArr = str.split('\r\n')
  let ObjectContext = ''
  /*Получаем содержимое файла в ObjectContext*/
  for (let i = 7; i <= BodyArr.length-3; i++) {
    if (i == BodyArr.length-3) {
      ObjectContext += (BodyArr[i])
    }
    else {
      ObjectContext += (BodyArr[i] + '\n')
    }
  }
  return ObjectContext
}

function CheckOnFolderEX(FolderPath, FolderFlag) {
  if (fs.existsSync(FolderPath)) {
    FolderFlag = 1
    console.log(chalk.yellow('Нашли сходство каталогов'))
  }
  else {
    FolderFlag = 0
  }
  return FolderFlag
}

function CheckOnFileEX(FolderPath, FileName, FileFlag) {
  if (fs.existsSync(FolderPath + "/" + FileName)) {
    FileFlag = 1
    console.log(chalk.yellow('Нашли сходство файлов'))
  }
  else {
    FileFlag = 0
  }
  return FileFlag
}

function NewFileName(FileName, FileParentPath, n1) {
  if (n1 == 0) {
    /*Если из папки в корзину*/
    const BodyArr = FileName.split('.')
    let NewFileName = ""
    let flag = false
    let counter = 1
    while (flag != true) {
      if (fs.existsSync(Trash + "/" + BodyArr[0] + "_" + (counter.toString()) + ".json")) {
        flag = false
        counter++
      }
      else {
        NewFileName = (BodyArr[0] + "_" + (counter.toString()) + ".json")
        flag = true
      }
    }
    return NewFileName
  }
  else if (n1 == 1) {
    /*Если из корзины в папку*/
    const BodyArr = FileName.split('.')
    let NewFileName = ""
    let flag = false
    let counter = 1
    while (flag != true) {
      if (fs.existsSync(FileParentPath + "/" + BodyArr[0] + "_" + (counter.toString()) + ".json")) {
        flag = false
        counter++
      }
      else {
        NewFileName = (BodyArr[0] + "_" + (counter.toString()) + ".json")
        flag = true
      }
    }
    return NewFileName
  }
}

function GetAnsElements(str, n1) {
  if (n1 == 0) {
    /*Секция выборки имени файла в пути*/
    const BodyArr = str.split('/')
    const AnsEl = BodyArr[BodyArr.length - 1]
    return AnsEl
  }
  else if (n1 == 1) {
    /*Секция выборки родительского пути файла при str = множ.запросу*/
    let BodyArr = str.split('\r\n', 4)
    const StringArr = BodyArr[3]
    const PathStr = StringArr.split('/')
    let ParentPath = ''
    /*Получаем путь родительского каталога в ParentPath*/
    for (let i = 0; i <= PathStr.length-2; i++) {
      ParentPath = ParentPath + PathStr[i] + '/'
    }
    return ParentPath
  }
  else if (n1 == 2) {
    /*Секция выборки родительского пути файла при str = путь файла*/
    const BodyArr = str.split('/')
    let ParentPath = ''
    /*Получаем путь родительского каталога в ParentPath*/
    for (let i = 0; i <= BodyArr.length-2; i++) {
      ParentPath = ParentPath + BodyArr[i] + '/'
    }
    return ParentPath
  }
}

function MakeNewFile(body) {
  /**********Блок обработки данных "Парсер фходной строки"*********/
  let str = body
  /*Получаем путь каталога*/
  let FolderPath = GetDataElem(str, 4, 3)
  /*Получаем имя файла*/
  let FileName = GetFileName(str)
  /*Получаем текст файла*/
  let FileContext = GetFileContext(str)
  /*********************Конец блока обработки**********************/

  /******************Блок проверки на существование****************/
  let FolderFlag = 0
  FolderFlag = CheckOnFolderEX(FolderPath, FolderFlag)
  let FileFlag = 0
  FileFlag = CheckOnFileEX(FolderPath, FileName, FileFlag)
  /*********************Конец блока проверки***********************/

  /*********************Блок создания файла************************/
  if ((FolderFlag == 0) && (FileFlag == 0)) {
    /*Если нет такого каталога и такого файла - (Попадание с клиента невозможно)*/
    return ('Данного каталога не существует! Выберите другой.')
  }
  else if ((FolderFlag == 0) && (FileFlag == 1)) {
    /*Если нет такого каталога, но есть файл - (Попадание с клиента невозможно)*/
    return ('Данного каталога не существует! Выберите другой.')
  }
  else if ((FolderFlag == 1) && (FileFlag == 0)) {
    /*Если есть такой каталог, но нет файла*/
    fs.writeFile((FolderPath + "/" +FileName), FileContext, err => {
      if (err) {
        throw err
      }
    })
    return ('Файл ' + FileName + ' импортирован по пути - ' + FolderPath + '!')
  }
  else if ((FolderFlag == 1) && (FileFlag == 1)) {
    /*Если есть такой каталог и есть такой файл*/
    return ('Файл с именем ' + FileName + ' уже существует в каталоге ' + GetAnsElements(FolderPath, 0) + '! Пожалуйста, укажите другое имя файла.')
  }
  /**********************Конец блока создания**********************/
}

function MakeNewFolder(body) {
  /*********Блок обработки данных "Парсер фходной строки"*********/
  let str = body
  /*Получаем имя каталога локации*/
  let FolderLocPath = GetDataElem(str, 4, 3)
  /*Получаем имя каталога*/
  let FolderName = GetDataElem(str, 8, 7)
  /***********************Конец блока обработки*******************/

  /******************Блок проверки на существование***************/
  let FolderLPFlag = 0
  FolderLPFlag = CheckOnFolderEX(FolderLocPath, FolderLPFlag)
  let FolderFlag = 0
  FolderFlag = CheckOnFolderEX((FolderLocPath + '/' + FolderName), FolderFlag)
  /********************Конец блока проверки***********************/

  /**********************Блок создания каталога*******************/
  if ((FolderLPFlag == 0) && (FolderFlag == 0)) {
    /*Если нет такого каталога расположения и такого создаваемого каталога - (Попадание с клиента невозможно)*/
    return ('Данного каталога расположения не существует! Выберите другой.')
  }
  else if ((FolderLPFlag == 0) && (FolderFlag == 1)) {
    /*Если нет такого каталога расположения, но есть создаваемый каталог - (Попадание с клиента невозможно)*/
    return ('Данного каталога расположения не существует! Выберите другой.')
  }
  else if ((FolderLPFlag == 1) && (FolderFlag == 0)) {
    /*Если есть такой каталог расположения, но нет создаваемого каталога*/
    fs.mkdir((FolderLocPath + "/" + FolderName), err => {
      if (err) {
        throw err
      }
    })
    return ('Каталог ' + FolderName + ' создан по пути - ' + FolderLocPath + '!')
  }
  else if ((FolderLPFlag == 1) && (FolderFlag == 1)) {
    /*Если есть такой каталог расположения и есть такой создаваемый каталога*/
    return ('Каталог с именем ' + FolderName + ' уже существует в каталоге ' + GetAnsElements(FolderLocPath, 0) + '! Пожалуйста, укажите другое имя каталога.')
  }
  /********************Конец блока создания***********************/
}

function EditFolder(body) {
  /**********Блок обработки данных "Парсер фходной строки"*********/
  let str = body
  /*Получаем путь изменяемого каталога*/
  let FolderPath = GetDataElem(str, 4, 3)
  /*Получаем новое имя каталога*/
  let FolderNameNew = GetDataElem(str, 8, 7)
  /*Получаем путь к родительскому каталогу*/
  let ParentPath = GetAnsElements(str, 1)
  /********************Конец блока обработки***********************/

  /******************Блок проверки на существование****************/
  let FolderLPFlag = 0
  FolderLPFlag = CheckOnFolderEX(FolderPath, FolderLPFlag)
  let FolderNNFlag = 0
  FolderNNFlag = CheckOnFolderEX((ParentPath + FolderNameNew), FolderLPFlag)
  /********************Конец блока проверки************************/

  /********************Блок изменения каталога*********************/
  if ((FolderLPFlag == 0) && (FolderNNFlag == 0)) {
    /*Если нет такого изменяемого каталога и каталога с таким же именем - (Попадание с клиента невозможно)*/
    return ('Данного каталога не существует! Выберите другой.')
  }
  else if ((FolderLPFlag == 0) && (FolderNNFlag == 1)) {
    /*Если такого изменяемого каталога не существует, но существует каталог с новым именем - (Попадание с клиента невозможно)*/
    return ('Данного каталога не существует! Выберите другой.')
  }
  else if ((FolderLPFlag == 1) && (FolderNNFlag == 0)) {
    /*Если такой изменяемый каталог существует и нет каталога с новым именем*/
    fs.rename(FolderPath, (ParentPath + FolderNameNew), err => {
      if (err) {
        throw err
      }
    })
    return ('Имя каталога ' + GetAnsElements(FolderPath, 0) + ' было изменено на ' + FolderNameNew + '. Путь после изменнения - ' + (ParentPath + FolderNameNew) + '!')
  }
  else if ((FolderLPFlag == 1) && (FolderNNFlag == 1)) {
    /*Если такой изменяемый каталог существует и уже есть каталог с новым именем*/
    return ('Новое имя - ' + FolderNameNew + '  для каталога ' + GetAnsElements(FolderPath, 0) + ' уже имеется для другого каталога! Пожалуйста, укажите другое имя каталога.')
  }
  /*********************Конец блока изменения**********************/
}

function DeleteFolder(body) {
  /***********Блок обработки данных "Парсер фходной строки"********/
  let str = body
  /*Получаем путь удаялемого каталога*/
  let FolderPath = GetDataElem(str, 4, 3)
  /*Получаем путь к родительскому каталогу*/
  let ParentPath = GetAnsElements(str, 1)
  /*********************Конец блока обработки**********************/

  /******************Блок проверки на существование****************/
  let FolderLPFlag = 0
  FolderLPFlag = CheckOnFolderEX(FolderPath, FolderLPFlag)
  /*********************Конец блока проверки***********************/
  
  /*********************Блок удаления каталога*********************/
  if (FolderLPFlag == 0) {
    /*Если нет такого удаляемого каталога - (Попадание с клиента невозможно)*/
    return ('Данного каталога не существует! Выберите другой.')
  }
  else {
    /*Если удаляемый каталог есть*/
    fs.rmdir(FolderPath, err => {
      if (err) {
        throw err
      }
    })
    return ('Каталог ' + GetAnsElements(FolderPath, 0) + ' был удалён по пути ' + ParentPath + ' !')
  }
  /*********************Конец блока удаления***********************/
}

function GoToTrash(body) {
  /***********Блок обработки данных "Парсер фходной строки"********/
  let str = body
  /*Получаем путь удаялемого файла*/
  let FilePath = GetDataElem(str, 4, 3)
  /*Получаем имя удаялемого файла*/
  let FileName = GetAnsElements(FilePath, 0)
  /*Получаемпуть родительского каталога для удаялемого файла*/
  let FileParentPath = GetAnsElements(FilePath, 2)
  /*********************Конец блока обработки**********************/

  /******************Блок проверки на существование****************/
  let FileFlag = 0
  FileFlag = CheckOnFileEX(FileParentPath, FileName, FileFlag)
  let TrashFlag = 0
  TrashFlag = CheckOnFileEX(Trash, FileName, TrashFlag)
  /*********************Конец блока проверки***********************/

  /******************Блок перемещения в корзину********************/
  if ((FileFlag == 0) && (TrashFlag == 0)) {
    /*Если нет такого файла и нет такого файла в корзине - (Попадание с клиента невозможно)*/
    return ('Данного файла не существует! Выберите другой.')
  }
  else if ((FileFlag == 0) && (TrashFlag == 1)) {
    /*Если нет такого файла, но есть такой файл в корзине - (Попадание с клиента невозможно)*/
    return ('Данного файла не существует! Выберите другой.')
  }
  else if ((FileFlag == 1) && (TrashFlag == 0)) {
    /*Если есть такой файл и нет такого файла в корзине*/
    fs.rename(FilePath, (Trash + '/' + FileName), err => {
      if (err) {
        throw err
      }
    })
    return ('Файл ' + FileName + ' был перемещён из каталога ' + FileParentPath + ' в корзину!')
  }
  else if ((FileFlag == 1) && (TrashFlag == 1)) {
    /*Если есть такой файл и есть такой файл в корзине*/
    FileName = NewFileName(FileName, FileParentPath, 0)
    fs.rename(FilePath, (Trash + '/' + FileName), err => {
      if (err) {
        throw err
      }
    })
    return ('Файл был переименован в ' + FileName + ' и перемещён из каталога ' + FileParentPath + ' в корзину!')
  }
  /*********************Конец блока перемещения в корзину**********************/
}

function GoFromTrash(body) {
  /***********Блок обработки данных "Парсер фходной строки"********/
  let str = body
  /*Получаем путь восстановляемого файла*/
  let FileOldPath = GetDataElem(str, 4, 3)
  /*Получаем путь где восстановить файл*/
  let FileNewPath = GetDataElem(str, 8, 7)
  /*Получаем имф файла*/
  let FileName = GetAnsElements(FileOldPath, 0)
  /*********************Конец блока обработки**********************/

  /******************Блок проверки на существование****************/
  let TrashFlag = 0
  TrashFlag = CheckOnFileEX(Trash, FileName, TrashFlag)
  let FileFlag = 0
  FileFlag = CheckOnFileEX(FileNewPath, FileName, FileFlag)
  /*********************Конец блока проверки***********************/

  /******************Блок перемещения из корзины********************/
  if ((TrashFlag == 0) && (FileFlag == 0)) {
    /*Если нет такого файла в корзине и такого файла в новой папке - (Попадание с клиента невозможно)*/
    return ('Данного файла не существует! Выберите другой.')
  }
  else if ((TrashFlag == 0) && (FileFlag == 1)) {
    /*Если нет такого файла в корзине, но есть такой файл в новой папке - (Попадание с клиента невозможно)*/
    return ('Данного файла не существует! Выберите другой.')
  }
  else if ((TrashFlag == 1) && (FileFlag == 0)) {
    /*Если есть такой файл в корзине, но нет такого файла в новой папке*/
    fs.rename(FileOldPath, (FileNewPath + '/' + FileName), err => {
      if (err) {
        throw err
      }
    })
    return ('Файл ' + FileName + ' был перемещён из корзины в каталог ' + FileNewPath + '!')
  }
  else if ((TrashFlag == 1) && (FileFlag == 1)) {
    /*Если есть такой файл в корзине и есть такой файл в новой папке*/
    FileName = NewFileName(FileName, FileNewPath, 1)
    fs.rename(FileOldPath, (FileNewPath + '/' + FileName), err => {
      if (err) {
        throw err
      }
    })
    return ('Файл был переименован в ' + FileName + ' и перемещён из корзины в каталог' + FileNewPath + '!')
  }
  /*********************Конец блока перемещения из корзины**********************/
}

function FinalFileDeletion(body) {
  /***********Блок обработки данных "Парсер фходной строки"********/
  let str = body

  /*Получаем путь восстановляемого файла*/
  let FilePath = GetDataElem(str, 4, 3)
  /*Получаем имя файла*/
  let FileName = GetAnsElements(FilePath, 0)
  /*********************Конец блока обработки**********************/

  /******************Блок проверки на существование****************/
  let TrashFlag = 0
  TrashFlag = CheckOnFileEX(Trash, FileName, TrashFlag)
  /*********************Конец блока проверки***********************/

  /******************Блок перемещения из корзины********************/
  if (TrashFlag == 0) {
    /*Если данного файла не существует - (Попадание с клиента не возможно)*/
    return ('Данного файла не существует! Выберите другой.')
  }
  else {
    /*Если данный файл сущевтует*/
    fs.unlink(FilePath, err => {
      if (err) {
        throw err
      }
    })
    return ('Файл ' + FileName + ' был удалён из корзины навсегда!')
  }
  /*********************Конец блока перемещения из корзины**********************/
}

function GetNameWithout(str) {
  let arr = str.split('.')
  return arr[0]
}

function EditFile(body) {
  /***********Блок обработки данных "Парсер фходной строки"********/
  let str = body
  /*Получаем путь файла*/
  let FilePath = GetDataElem(str, 4, 3)
  /*Получаем текст объекта*/
  let ObjectContext = GetObjcetContext(str)
  let FileName = GetAnsElements(FilePath, 0)
  let ParentFolderPath = GetAnsElements(FilePath, 2)
  /*********************Конец блока обработки**********************/

  /******************Блок проверки на существование****************/
  let FileFlag = 0
  FileFlag = CheckOnFileEX(ParentFolderPath, FileName, FileFlag)
  /*********************Конец блока проверки***********************/

  /*********************Блок изменения файла***********************/
  if (FileFlag == 0) {
    /*Если данного файла не существует - (Попадание с клиента не возможно)*/
    return ('Данного файла не существует! Выберите другой.')
  }
  else {
    /*Если данный файл сущевтует*/
    fs.unlink(FilePath, err => {
      if (err) {
        throw err
      }
    })
    fs.writeFile((ParentFolderPath + GetNameWithout(FileName) + '_edit.json'), ObjectContext, err => {
      if (err) {
        throw err
      }
    })
    return ('Файл ' + FileName + ' был изменен!')
  }
  /******************Конец блока изменения файла*******************/
}

//Создаём сервер
const http = require('http')
http.createServer((request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    if (request.method == 'POST') {
		let body = ''
		let answer = ''
		let urlswitch = request.url
		switch (urlswitch) {
			case '/loadfiles': {
				console.log(chalk.green('***************Запрос на файлы из каталога***************'))
				let finalJSON = CreateJSON(Parent, Current)
				response.end(JSON.stringify(finalJSON))
				break;
			}
			case '/loadfolders': {
				console.log(chalk.green('***************Запрос на существующие каталоги***************'))
				let FolderMass
				FolderMass = CreateFoldersList(Parent, Current)
				response.end(JSON.stringify(FolderMass))
				break;
			}
			case '/loadtrashfiles': {
				console.log(chalk.green('***************Запрос на файлы из корзины***************'))
				let FinalTrash = CreateTrash(Trash)
				response.end(JSON.stringify(FinalTrash))
				break;
			}
			case '/uploadfile': {
				console.log(chalk.green('***************Запрос на загрузку файла***************'))
				body = ''
				answer = ''
				request.on('data', chunk => { body += chunk.toString() })
				request.on('end', ()=> { answer = MakeNewFile(body), response.end( JSON.stringify(answer)) })
				break;
			}
			case '/addfolder': {
				console.log(chalk.green('***************Запрос на добавление каталога***************'))
				body = ''
				answer = ''
				request.on('data', chunk => { body += chunk.toString() })
				request.on('end', ()=> { answer = MakeNewFolder(body), response.end(JSON.stringify(answer)) })
				break;
			}
			case '/editfolder': {
				console.log(chalk.green('***************Запрос на изменение каталога***************'))
				body = ''
				answer = ''
				request.on('data', chunk => { body += chunk.toString() })
				request.on('end', ()=> { answer = EditFolder(body), response.end(JSON.stringify(answer)) })
				break;
			}
			case '/deletefolder': {
				console.log(chalk.green('***************Запрос на удаление каталога***************'))
				body = ''
				answer = ''
				request.on('data', chunk => { body += chunk.toString() })
				request.on('end', ()=> { answer = DeleteFolder(body), response.end(JSON.stringify(answer)) })
				break;
			}
			case '/gototrash': {
				console.log(chalk.green('***************Запрос на перемещение файла в корзину***************'))
				body = ''
				answer = ''
				request.on('data', chunk => { body += chunk.toString() })
				request.on('end', ()=> { answer = GoToTrash(body), response.end(JSON.stringify(answer)) })
				break;
			}
			case '/gofromtrash': {
				console.log(chalk.green('***************Запрос на перемещение файла из корзины***************'))
				body = ''
				answer = ''
				request.on('data', chunk => { body += chunk.toString() })
				request.on('end', ()=> { answer = GoFromTrash(body), response.end(JSON.stringify(answer)) })
				break;
			}
			case '/finalfiledeletion': {
				console.log(chalk.green('***************Запрос на полное удаление файла***************'))
				body = ''
				answer = ''
				request.on('data', chunk => { body += chunk.toString() })
				request.on('end', ()=> { answer = FinalFileDeletion(body), response.end(JSON.stringify(answer)) })
				break;
			}
			case '/addeditfile': {
				console.log(chalk.green('***************Запрос на изменеие файла***************'))
				body = ''
				answer = ''
				request.on('data', chunk => { body += chunk.toString() })
				request.on('end', ()=> { answer = EditFile(body), response.end(JSON.stringify(answer)) })
				break;
			}
			default: {
				response.end('not ok')
				break;
			}
		}
    }
}).listen(8081);