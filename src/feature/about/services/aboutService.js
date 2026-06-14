/* =========================================================
   SERVICE: aboutService.js
   Descrição: Camada de serviço responsável pelo isolamento e
              persistência de dados da seção Sobre Nós (About).
   ========================================================= */

import { getStorageData, setStorageData } from "../../../core/storage.js";

var CHAVE_ABOUT = "aboutImagesConfig";

/* RETORNA TODAS AS IMAGENS DO SOBRE NÓS */
export function getAboutImages() {
    var dados = getStorageData(CHAVE_ABOUT);
    return Array.isArray(dados) ? dados : [];
}

/* SALVA O ARRAY COMPLETO NO LOCALSTORAGE */
function salvarAboutImages(imagens) {
    setStorageData(CHAVE_ABOUT, imagens);
}

/* ADICIONA UMA NOVA IMAGEM */
export function createAboutImage(imagem) {
    var imagens = getAboutImages();
    imagens.push(imagem);
    salvarAboutImages(imagens);
}

/* REMOVE UMA IMAGEM PELO ID usando 'for' TRADICIONAL */
export function deleteAboutImage(id) {
    var imagens = getAboutImages();
    var restantes = [];
    
    for (var i = 0; i < imagens.length; i++) {
        if (imagens[i].id != id) {
            restantes.push(imagens[i]);
        }
    }
    
    salvarAboutImages(restantes);
}