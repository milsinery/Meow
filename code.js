const createNewComponent = (firstOfSelection) => {
    const newComponent = figma.createComponent();
    if (firstOfSelection.type === "FRAME") {
        newComponent.name = firstOfSelection.name;
        newComponent.resize(firstOfSelection.width, firstOfSelection.height);
        newComponent.appendChild(firstOfSelection);
        newComponent.x = firstOfSelection.x;
        newComponent.y = firstOfSelection.y;
        firstOfSelection.x = 0;
        firstOfSelection.y = 0;
        newComponent.cornerRadius = firstOfSelection.cornerRadius;
        newComponent.fills = firstOfSelection.fills;
        newComponent.expanded = false;
        if (firstOfSelection.layoutMode !== "NONE") {
            newComponent.layoutMode = firstOfSelection.layoutMode;
            newComponent.layoutAlign = firstOfSelection.layoutAlign;
            newComponent.layoutGrow = firstOfSelection.layoutGrow;
            newComponent.itemSpacing = firstOfSelection.itemSpacing;
            newComponent.primaryAxisAlignItems = firstOfSelection.primaryAxisAlignItems;
            newComponent.primaryAxisSizingMode = firstOfSelection.primaryAxisSizingMode;
            newComponent.paddingTop = firstOfSelection.paddingTop;
            newComponent.paddingRight = firstOfSelection.paddingRight;
            newComponent.paddingBottom = firstOfSelection.paddingBottom;
            newComponent.paddingLeft = firstOfSelection.paddingLeft;
        }
        const children = firstOfSelection.children;
        for (const item of children) {
            newComponent.appendChild(item);
        }
        firstOfSelection.remove();
    }
    else if (firstOfSelection.type === "GROUP") {
        newComponent.name = firstOfSelection.name;
        newComponent.resize(firstOfSelection.width, firstOfSelection.height);
        newComponent.appendChild(firstOfSelection);
        newComponent.x = firstOfSelection.x;
        newComponent.y = firstOfSelection.y;
        firstOfSelection.x = 0;
        firstOfSelection.y = 0;
        newComponent.expanded = false;
        const children = firstOfSelection.children;
        for (const item of children) {
            newComponent.appendChild(item);
        }
    }
    else {
        newComponent.name = firstOfSelection.name;
        newComponent.resize(firstOfSelection.width, firstOfSelection.height);
        newComponent.appendChild(firstOfSelection);
        newComponent.x = firstOfSelection.x;
        newComponent.y = firstOfSelection.y;
        firstOfSelection.x = 0;
        firstOfSelection.y = 0;
        newComponent.expanded = false;
    }
    return newComponent;
};
const main = () => {
    // проверяем, выделено ли что-то
    if (figma.currentPage.selection.length === 0)
        return;
    // сохраняем ссылку на выбранный объект
    const firstOfSelection = figma.currentPage.selection[0];
    const nameOfSelected = firstOfSelection.name;
    const IDofSelected = firstOfSelection.id;
    const typeOfSelected = firstOfSelection.type;
    // проверяем, что выбранный элемент находится вне фрейма
    if (firstOfSelection.parent.type !== "PAGE")
        return;
    // проверяем, что выбранный элемент не компонент и не вариант
    if (firstOfSelection.type === "COMPONENT_SET" || firstOfSelection.type === "COMPONENT")
        return;
    // создаём компонент из выбранного объекта
    const newComponent = createNewComponent(firstOfSelection);
    // собираем все остальные объекты на странице, похожие на выбранный
    const other = figma.currentPage.findAll((item) => item.id !== IDofSelected &&
        item.type === typeOfSelected &&
        item.name === nameOfSelected &&
        item.parent.type !== "PAGE");
    // проверяем, что такие объекты есть
    if (other.length === 0)
        return;
    // создаём из таких объектов копии нашего компонента, удаляем оригиналы и вставляем копии на их место
    for (const item of other) {
        const parent = item.parent;
        const xOfChild = item.x;
        const yOfChild = item.y;
        const rotation = item.rotation;
        const newInstance = newComponent.createInstance();
        parent.appendChild(newInstance);
        newInstance.x = xOfChild;
        newInstance.y = yOfChild;
        newInstance.rotation = rotation;
        item.remove();
    }
};
main();
figma.closePlugin();
