const createNewComponent = (selection) => {
    const newComponent = figma.createComponent();
    const { x, y } = selection;
    selection.parent.appendChild(newComponent);
    newComponent.name = selection.name;
    newComponent.resize(selection.width, selection.height);
    newComponent.appendChild(selection);
    newComponent.x = x;
    newComponent.y = y;
    newComponent.rotation = selection.rotation;
    selection.x = 0;
    selection.y = 0;
    newComponent.cornerRadius = selection.cornerRadius;
    newComponent.fills = selection.fills;
    newComponent.clipsContent = selection.clipsContent;
    newComponent.strokes = selection.strokes;
    newComponent.strokeWeight = selection.strokeWeight;
    newComponent.strokeMiterLimit = selection.strokeMiterLimit;
    newComponent.strokeAlign = selection.strokeAlign;
    newComponent.strokeCap = selection.strokeCap;
    newComponent.strokeJoin = selection.strokeJoin;
    newComponent.dashPattern = selection.dashPattern;
    newComponent.fillStyleId = selection.fillStyleId;
    newComponent.strokeStyleId = selection.strokeStyleId;
    newComponent.strokeStyleId = selection.strokeStyleId;
    newComponent.expanded = false;
    if (selection.layoutMode !== 'NONE') {
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
    return newComponent;
};
const convertChildrenToInstances = (component, children) => {
    for (const item of children) {
        const { parent, x, y, rotation, name, fills, strokeCap, strokeAlign, strokeJoin, layoutMode } = item;
        const newInstance = component.createInstance();
        parent.appendChild(newInstance);
        newInstance.x = x;
        newInstance.y = y;
        newInstance.rotation = rotation;
        newInstance.name = name;
        newInstance.fills = fills;
        newInstance.strokeCap = strokeCap;
        newInstance.strokeAlign = strokeAlign;
        newInstance.strokeJoin = strokeJoin;
        newInstance.layoutMode = layoutMode;
        item.remove();
    }
    figma.notify("🐈‍");
};
const cloneDetect = (parent, child) => {
    let count = 0;
    let result = true;
    for (const item in parent) {
        count++;
        console.log(item);
    }
    for (let i = 0; i < count - 1; i++) {
        if (parent[i] === "id" || parent[i] === "name" || parent[i] === "x" || parent[i] === "y") {
            continue;
        }
        else if (parent[i] === child[i]) {
            continue;
        }
        else {
            result = false;
        }
    }
    console.log(count);
    console.log(result);
    return result;
};
const main = () => {
    // проверяем, выделено ли что-то
    if (figma.currentPage.selection.length > 1 || figma.currentPage.selection.length === 0)
        return;
    // проверяем, что выбран фрейм
    if (figma.currentPage.selection[0].type !== 'FRAME')
        return;
    // сохраняем ссылку на выбранный объект
    const selection = figma.currentPage.selection[0];
    const { id, children, layoutMode, cornerRadius, counterAxisAlignItems, primaryAxisAlignItems, clipsContent } = selection;
    cloneDetect(selection, figma.currentPage.selection[0]);
    // создаём компонент из выбранного объекта
    const newComponent = createNewComponent(selection);
    // собираем все остальные объекты на странице, похожие на выбранный
    const other = figma.currentPage.findAll((item) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        return item.id !== id &&
            item.type === 'FRAME' &&
            item.layoutMode === layoutMode &&
            item.counterAxisAlignItems === counterAxisAlignItems &&
            item.primaryAxisAlignItems === primaryAxisAlignItems &&
            item.clipsContent === clipsContent &&
            ((_a = item.children) === null || _a === void 0 ? void 0 : _a.length) === (children === null || children === void 0 ? void 0 : children.length) &&
            ((_b = item.children[0]) === null || _b === void 0 ? void 0 : _b.type) === ((_c = children[0]) === null || _c === void 0 ? void 0 : _c.type) &&
            ((_d = item.children[item.children.length - 1]) === null || _d === void 0 ? void 0 : _d.type) === ((_e = children[children.length - 1]) === null || _e === void 0 ? void 0 : _e.type) &&
            ((_f = item.children[0]) === null || _f === void 0 ? void 0 : _f.name) === ((_g = children[0]) === null || _g === void 0 ? void 0 : _g.name) &&
            ((_h = item.children[item.children.length - 1]) === null || _h === void 0 ? void 0 : _h.name) === ((_j = children[children.length - 1]) === null || _j === void 0 ? void 0 : _j.name) &&
            ((_k = item.children[0]) === null || _k === void 0 ? void 0 : _k.length) === ((_l = children[0]) === null || _l === void 0 ? void 0 : _l.length) &&
            ((_m = item.children[item.children.length - 1]) === null || _m === void 0 ? void 0 : _m.length) === ((_o = children[children.length - 1]) === null || _o === void 0 ? void 0 : _o.length);
    });
    // проверяем, что такие объекты есть
    if (other.length === 0)
        return;
    // создаём из таких объектов копии нашего компонента, удаляем оригиналы и вставляем копии на их место
    convertChildrenToInstances(newComponent, other);
};
main();
figma.closePlugin();
