<template>
    <div id="Ground">
        <CoreMenu></CoreMenu>
    </div>
</template>

<script>
    import CoreMenu from './components/CoreMenu'
    export default {
        components: {
            CoreMenu
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@300&display=swap');
    body {
        background: rgb(38,38,117);
        background: linear-gradient(90deg, rgba(38,38,117,1) 0%, rgba(223,223,223,1) 40%, rgba(255,255,255,1) 50%, rgba(223,223,223,1) 60%, rgba(38,38,117,1) 100%);
        margin: 0%;
    }
    #app {
        width: 100%;
        height: 100%;
        text-align: center;
    }
    h1{
        font-family: 'Oswald', sans-serif;
    }
    h2 {
        font-family: 'Oswald', sans-serif;
        color: #ffffff;
    }
    h3 {
        font-family: 'Oswald', sans-serif;
    }
    p {
        font-family: "Fira Sans Condensed", sans-serif;
    }
    .pi {
        margin-left: 3px;
    }
    #Ground {
        display: flex; 
        width: 100%;
        height: 100%;
    }
    #HorBlockLeft {
        display: inline-block;
        width: 50px;
        min-width: 50px;
        min-height: 100vh;
        background: #1c2f57;
        margin-right: 0.1vw;
    }
    #HorBlockRight {
        display: inline-block;
        width: 97.2vw;
        height: 100%;
    }
    #Hat {
        width: 100%;
    }
    #UnderHat {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: flex-start;
    }
    #Tree {
        display: inline-block;
        background: #1c2f57;
        color: #ffffff;
        border-radius: 20px;
        margin-left: 2.5%;
        margin-right: 1.25%;
        min-width: 46.25%;
        min-height: 235px;
    }
    #TreeButtonsArea, #CodeButtonsArea {
        background: #ffffff;
        border-radius: 10px;
        margin-left: 2.5%;
        margin-right: 2.5%;
    }
    #TreeWorkArea {
        margin-top: 15px;
        border-radius: 10px;
        border-color: #00000096;
    }
    #Node {
        width: 95%;
        margin-left: 2.5%;
        margin-right: 2.5%;
        color: #000000;
    }
    #ButtonLoadDialog, #ButtonCreateDialog, #ButtonSave, #ButtonExport {
        width: 96.5%;
    }
    #Code {
        display: inline-block;
        background: #1c2f57;
        color: #ffffff;
        border-radius: 20px;
        margin-left: 1.25%;
        margin-right: 2.5%;
        min-width: 46.25%;
        min-height: 235px;
    }
    #headerBG {
        background: #1c2f57;
        width: 50%;
        margin-left: 25%;
        margin-right: 25%;
        border-radius: 20px;
    }
    #topline {
        padding: 0;
        width: 80%;
        height: 3px;
        border: none;
        position:relative;
        top: 15px;
        background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(135,169,219,1) 25%, rgba(135,169,219,1) 75%, rgba(255,255,255,0) 100%);
    }
    #botline {
        padding: 0;
        width: 80%;
        height: 3px;
        border: none;
        position:relative;
        bottom: 15px;
        background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(135,169,219,1) 25%, rgba(135,169,219,1) 75%, rgba(255,255,255,0) 100%);
    }
    #LeftBar{
        padding-top: 1vh;
        padding-bottom: 1vh;
        height: 100%;
    }
    .p-button {
        margin: 4px;
    }
</style>
