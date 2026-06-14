import { protectAdminPage } from "../../core/rolesManager.js";

import { navbarComponent } from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent } from "../../shared/components/footer/footerComponent.js";
import { initNavbar } from "../../shared/components/navbar/navbarController.js";

import { injetarSidebar } from "../../shared/components/sidebar/sidebarComponent.js";

import { PageHeader } from "../../shared/components/pageHeader/pageHeaderComponent.js";

import { adminTabsComponent } from "./components/adminTabsComponent.js";

import { productFormComponent } from "../products/components/productFormComponent.js";
import { categoryFormComponent } from "../categories/components/categoryFormComponent.js";
import { aboutFormComponent } from "../about/components/aboutFormComponent.js";

import { aboutListComponent } from "../about/components/aboutListComponent.js";

import { carregarModuloHome } from "./controllers/adminHomeController.js";
import { carregarModuloProdutos } from "./controllers/adminProductsController.js";
import { carregarModuloCategorias } from "./controllers/adminCategoriesController.js";
import { carregarModuloAbout } from "./controllers/adminAboutController.js";

import {
    heroFormComponent
}
    from "../home/components/heroFormComponent.js";

import {
    heroListComponent
}
    from "../home/components/heroListComponent.js";

/* ==========================================
   PROTEÇÃO
========================================== */

protectAdminPage();

/* ==========================================
   LAYOUT BASE
========================================== */

document.getElementById("navbar").innerHTML =
    navbarComponent();

document.getElementById("footer").innerHTML =
    footerComponent();

initNavbar();

/* ==========================================
   SIDEBAR
========================================== */

var itensMenuAdmin = [

    {
        id: "view-home",
        nome: "Home (Hero)",
        icone: "🏠",
        link: "#"
    },

    {
        id: "view-produtos",
        nome: "Produtos",
        icone: "📦",
        link: "#"
    },

    {
        id: "view-categorias",
        nome: "Categorias",
        icone: "🏷️",
        link: "#"
    },

    {
        id: "view-about",
        nome: "Sobre Nós",
        icone: "🖼️",
        link: "#"
    }

];

injetarSidebar(
    "admin-sidebar-container",
    itensMenuAdmin,
    {
        tituloMobile: "Admin Diva"
    }
);

/* ==========================================
   EVENTOS SIDEBAR
========================================== */

var linksSidebar =
    document.querySelectorAll(
        "#admin-sidebar-container .sidebar-link"
    );

for (var i = 0; i < linksSidebar.length; i++) {

    linksSidebar[i].onclick = (function (idView) {

        return function (event) {

            event.preventDefault();

            window.mudarViewAdmin(idView);

            for (var j = 0; j < linksSidebar.length; j++) {

                linksSidebar[j]
                    .classList
                    .remove("active");

            }

            this.classList.add("active");

        };

    })(itensMenuAdmin[i].id);

}

/* ==========================================
   VIEWS
========================================== */

window.mudarViewAdmin = function (idView) {

    var contentArea =
        document.getElementById(
            "admin-main-content"
        );

    var titulo = "";
    var subtitulo = "";

    var formHtml = "";
    var listHtml = "";

    /* ======================
       HOME
    ====================== */

    if (idView === "view-home") {

        titulo =
            "Configurações da Home";

        subtitulo =
            "Gerencie banners e destaques.";

        formHtml =
            heroFormComponent();

        listHtml =
            heroListComponent();

    }

    /* ======================
       PRODUTOS
    ====================== */

    if (idView === "view-produtos") {

        titulo =
            "Produtos";

        subtitulo =
            "Gerencie os produtos da loja.";

        formHtml =
            productFormComponent();

        listHtml =
            '<div id="admin-products-list"></div>';

    }

    /* ======================
       CATEGORIAS
    ====================== */

    if (idView === "view-categorias") {

        titulo =
            "Categorias";

        subtitulo =
            "Gerencie as categorias.";

        formHtml =
            categoryFormComponent();

        listHtml =
            '<div id="admin-categories-list"></div>';

    }

    /* ======================
       ABOUT
    ====================== */

    if (idView === "view-about") {

        titulo =
            "Sobre Nós";

        subtitulo =
            "Gerencie as imagens da seção.";

        formHtml =
            aboutFormComponent();

        listHtml =
            aboutListComponent();

    }

    contentArea.innerHTML =

        '<div class="admin-container">' +

        PageHeader({

            title: titulo,

            subtitle: subtitulo

        }) +

        adminTabsComponent({

            formContent: formHtml,

            listContent: listHtml

        }) +

        '</div>';

    /* ======================
       CONTROLLERS
    ====================== */

    if (idView === "view-home") {

        carregarModuloHome();

    }

    if (idView === "view-produtos") {

        carregarModuloProdutos();

    }

    if (idView === "view-categorias") {

        carregarModuloCategorias();

    }

    if (idView === "view-about") {

        carregarModuloAbout();

    }

};

/* ==========================================
   VIEW PADRÃO
========================================== */

window.mudarViewAdmin(
    "view-home"
);