import { heroComponent } from "./heroComponent.js";
import { VitrineComponent } from "../../products/components/vitrineComponent.js";
import { categoryComponent } from "../../categories/components/categoryComponent.js";

export async function homeContentComponent() {
    const vitrineHtml = await VitrineComponent();
    
    return `
        ${heroComponent()}
        ${categoryComponent()}
        ${vitrineHtml}
    `;
}