/* =========================================================
   SERVICE: categoryService.js
   Descrição: Gerencia a persistência das categorias no 
              LocalStorage utilizando laços tradicionais.
   ========================================================= */

var STORAGE_KEY = "categories";

/* PEGAR TODAS CATEGORIAS */
export function getCategories() {
    var categories = localStorage.getItem(STORAGE_KEY);
    return categories ? JSON.parse(categories) : [];
}

/* SALVAR TODAS CATEGORIAS */
function saveCategories(categories) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
}

/* CRIAR CATEGORIA */
export function createCategory(category) {
    var categories = getCategories();
    categories.push(category);
    saveCategories(categories);
}

/* BUSCAR CATEGORIA POR ID */
export function findCategoryById(id) {
    var categories = getCategories();
    for (var i = 0; i < categories.length; i++) {
        if (categories[i].id == id) {
            return categories[i];
        }
    }
    return null;
}

/* ATUALIZAR CATEGORIA */
export function updateCategory(id, updatedData) {
    var categories = getCategories();
    for (var i = 0; i < categories.length; i++) {
        if (categories[i].id == id) {
            // Mescla de propriedades usando for...in tradicional
            for (var prop in updatedData) {
                if (updatedData.hasOwnProperty(prop)) {
                    categories[i][prop] = updatedData[prop];
                }
            }
            break;
        }
    }
    saveCategories(categories);
}

/* DELETAR CATEGORIA */
export function deleteCategory(id) {
    var categories = getCategories();
    var restantes = [];

    for (var i = 0; i < categories.length; i++) {
        if (categories[i].id != id) {
            restantes.push(categories[i]);
        }
    }
    saveCategories(restantes);
}