 
import { ipcRenderer }  from 'electron'
import {FETCH_DATA_FROM_STORAGE,SAVE_DATA_IN_STORAGE} from './utils/constanst';


export function loadSaveData(){
    ipcRenderer.send(FETCH_DATA_FROM_STORAGE, "items");
}


export function saveDataInStorage(item){
    console.log("Rendere sending save data in storage")
    ipcRenderer.send(SAVE_DATA_IN_STORAGE, item);
}