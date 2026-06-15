# ✨ shared — Componentes Compartilhados

A pasta `shared` contém o ecossistema de **componentes visuais reutilizáveis e agnósticos** da aplicação. Qualquer elemento de interface ou padrão de layout que é consumido por mais de uma feature funcional (como `products`, `categories` ou `about`) mora aqui, garantindo o princípio DRY (*Don't Repeat Yourself*).

---

## 📂 Estrutura do Diretório

```microtext
shared/
└── components/
    ├── dataTable/          → Motor de tabelas genéricas responsivas com suporte a ações
    ├── footer/             → Rodapé global padrão da aplicação
    ├── Form/               → Orquestrador modular de formulários declarativos
    │   ├── controls/       → Componentes chaveados (Checkbox, Radio, Switch)
    │   ├── helpers/        → Elementos de suporte (Button, Row, Section)
    │   ├── inputs/         → Campos base de captura (File, Input, Select, Textarea)
    │   ├── layouts/        → Malhas e wrappers estruturais (Actions, Column, Grid, Group)
    │   └── shortcuts/      → Especializações semânticas com tipos embutidos (Password, Number, etc.)
    ├── modal/              → Modais dinâmicos e unificados para operações de CRUD (Update/Delete)
    ├── navbar/             → Barra de navegação superior global com controlador de estado
    ├── pageHeader/         → Títulos e subtítulos semânticos padronizados para o painel
    ├── sidebar/            → Menu lateral dinâmico para navegação reativa estilo SPA
    └── toast/              → Sistema de notificações temporárias flutuantes (pop-ups)