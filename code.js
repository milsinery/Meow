const createNewComponent = (selection) => {
    const newComponent = figma.createComponent();
    if (selection.type === "FRAME") {
        newComponent.name = selection.name;
        newComponent.resize(selection.width, selection.height);
        newComponent.appendChild(selection);
        newComponent.x = selection.x;
        newComponent.y = selection.y;
        selection.x = 0;
        selection.y = 0;
        newComponent.cornerRadius = selection.cornerRadius;
        newComponent.fills = selection.fills;
        newComponent.expanded = false;
        if (selection.layoutMode !== "NONE") {
            newComponent.layoutMode = selection.layoutMode;
            newComponent.layoutAlign = selection.layoutAlign;
            newComponent.layoutGrow = selection.layoutGrow;
            newComponent.itemSpacing = selection.itemSpacing;
            newComponent.primaryAxisAlignItems = selection.primaryAxisAlignItems;
            newComponent.primaryAxisSizingMode = selection.primaryAxisSizingMode;
            newComponent.paddingTop = selection.paddingTop;
            newComponent.paddingRight = selection.paddingRight;
            newComponent.paddingBottom = selection.paddingBottom;
            newComponent.paddingLeft = selection.paddingLeft;
        }
        const children = selection.children;
        for (const item of children) {
            newComponent.appendChild(item);
        }
        selection.remove();
    }
    else if (selection.type === "GROUP") {
        newComponent.name = selection.name;
        newComponent.resize(selection.width, selection.height);
        newComponent.appendChild(selection);
        newComponent.x = selection.x;
        newComponent.y = selection.y;
        selection.x = 0;
        selection.y = 0;
        newComponent.expanded = false;
        const children = selection.children;
        for (const item of children) {
            newComponent.appendChild(item);
        }
    }
    else {
        newComponent.name = selection.name;
        newComponent.resize(selection.width, selection.height);
        newComponent.appendChild(selection);
        newComponent.x = selection.x;
        newComponent.y = selection.y;
        selection.x = 0;
        selection.y = 0;
        newComponent.expanded = false;
    }
    return newComponent;
};
const convertChildrenToInstances = (component, children) => {
    for (const item of children) {
        const parent = item.parent;
        const xOfChild = item.x;
        const yOfChild = item.y;
        const rotation = item.rotation;
        const name = item.name;
        const newInstance = component.createInstance();
        parent.appendChild(newInstance);
        newInstance.x = xOfChild;
        newInstance.y = yOfChild;
        newInstance.rotation = rotation;
        newInstance.name = name;
        item.remove();
    }
};
const main = () => {
    // проверяем, выделено ли что-то
    if (figma.currentPage.selection.length > 1 || figma.currentPage.selection.length === 0)
        return;
    // проверяем, что выбран фрейм
    // if(figma.currentPage.selection[0].type !== "FRAME") return;
    // проверяем, что выбранный объект вне фреймов
    if (figma.currentPage.selection[0].parent.type !== "PAGE")
        return;
    // сохраняем ссылку на выбранный объект
    const selection = figma.currentPage.selection[0];
    const { name, id, type } = figma.currentPage.selection[0];
    const childrenCount = selection.type === "FRAME" ? selection.children.length : 0;
    // проверяем, что выбранный элемент находится вне фрейма
    if (selection.parent.type !== "PAGE")
        return;
    // создаём компонент из выбранного объекта
    const newComponent = createNewComponent(selection);
    // собираем все остальные объекты на странице, похожие на выбранный
    const other = figma.currentPage.findAll((item) => {
        var _a;
        return item.parent.type !== "PAGE" &&
            item.id !== id &&
            item.type === type &&
            item.name.startsWith(name) &&
            ((_a = item === null || item === void 0 ? void 0 : item.children) === null || _a === void 0 ? void 0 : _a.length) === childrenCount;
    });
    // проверяем, что такие объекты есть
    if (other.length === 0)
        return;
    // создаём из таких объектов копии нашего компонента, удаляем оригиналы и вставляем копии на их место
    convertChildrenToInstances(newComponent, other);
};
main();
figma.closePlugin();
