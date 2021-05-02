var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const createNewComponent = (selection) => {
    const newComponent = figma.createComponent();
    const { name, visible, locked, opacity, blendMode, isMask, effects, effectStyleId, relativeTransform, x, y, width, height, rotation, layoutAlign, constrainProportions, layoutGrow, children, exportSettings, fills, fillStyleId, strokes, strokeStyleId, strokeWeight, strokeAlign, strokeCap, strokeJoin, strokeMiterLimit, dashPattern, cornerRadius, cornerSmoothing, topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius, paddingLeft, paddingRight, paddingTop, paddingBottom, primaryAxisAlignItems, counterAxisAlignItems, primaryAxisSizingMode, layoutGrids, gridStyleId, backgrounds, backgroundStyleId, clipsContent, guides, expanded, constraints, layoutMode, itemSpacing, overflowDirection, numberOfFixedChildren, } = selection;
    newComponent.resize(width, height);
    newComponent.name = name;
    newComponent.visible = visible;
    newComponent.locked = locked;
    newComponent.opacity = opacity;
    newComponent.blendMode = blendMode;
    newComponent.isMask = isMask;
    newComponent.effects = effects;
    newComponent.effectStyleId = effectStyleId;
    newComponent.relativeTransform = relativeTransform;
    newComponent.x = x;
    newComponent.y = y;
    newComponent.rotation = rotation;
    newComponent.layoutAlign = layoutAlign;
    newComponent.constrainProportions = constrainProportions;
    newComponent.layoutGrow = layoutGrow;
    newComponent.exportSettings = exportSettings;
    newComponent.fills = fills;
    newComponent.fillStyleId = fillStyleId;
    newComponent.strokes = strokes;
    newComponent.strokeStyleId = strokeStyleId;
    newComponent.strokeWeight = strokeWeight;
    newComponent.strokeAlign = strokeAlign;
    newComponent.strokeCap = strokeCap;
    newComponent.strokeJoin = strokeJoin;
    newComponent.strokeMiterLimit = strokeMiterLimit;
    newComponent.dashPattern = dashPattern;
    newComponent.cornerRadius = cornerRadius;
    newComponent.cornerSmoothing = cornerSmoothing;
    newComponent.topLeftRadius = topLeftRadius;
    newComponent.topRightRadius = topRightRadius;
    newComponent.bottomLeftRadius = bottomLeftRadius;
    newComponent.bottomRightRadius = bottomRightRadius;
    newComponent.paddingLeft = paddingLeft;
    newComponent.paddingRight = paddingRight;
    newComponent.paddingTop = paddingTop;
    newComponent.paddingBottom = paddingBottom;
    newComponent.primaryAxisAlignItems = primaryAxisAlignItems;
    newComponent.counterAxisAlignItems = counterAxisAlignItems;
    newComponent.primaryAxisSizingMode = primaryAxisSizingMode;
    newComponent.layoutGrids = layoutGrids;
    newComponent.gridStyleId = gridStyleId;
    newComponent.backgrounds = backgrounds;
    newComponent.backgroundStyleId = backgroundStyleId;
    newComponent.clipsContent = clipsContent;
    newComponent.guides = guides;
    newComponent.expanded = expanded;
    newComponent.constraints = constraints;
    newComponent.layoutMode = layoutMode;
    newComponent.itemSpacing = itemSpacing;
    newComponent.overflowDirection = overflowDirection;
    newComponent.numberOfFixedChildren = numberOfFixedChildren;
    selection.parent.appendChild(newComponent);
    for (const item of children) {
        newComponent.appendChild(item);
    }
    selection.remove();
    return newComponent;
};
const convertChildrenToInstances = (component, children) => {
    for (const item of children) {
        const itemText = item.findAll(item => item.type === "TEXT").map(item => item.characters);
        const itemImages = item.findAll(item => item.fills && item.fills[0] && item.fills[0].type === "IMAGE").map(item => item.imageHash);
        const { name, visible, locked, opacity, blendMode, isMask, effects, effectStyleId, relativeTransform, x, y, rotation, layoutAlign, constrainProportions, layoutGrow, exportSettings, fills, fillStyleId, strokes, strokeStyleId, strokeWeight, strokeAlign, strokeCap, strokeJoin, strokeMiterLimit, dashPattern, cornerRadius, cornerSmoothing, topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius, paddingLeft, paddingRight, paddingTop, paddingBottom, primaryAxisAlignItems, counterAxisAlignItems, primaryAxisSizingMode, layoutGrids, gridStyleId, backgrounds, backgroundStyleId, clipsContent, guides, expanded, constraints, layoutMode, parent, itemSpacing, numberOfFixedChildren, } = item;
        const newInstance = component.createInstance();
        newInstance.name = name;
        newInstance.visible = visible;
        newInstance.locked = locked;
        newInstance.opacity = opacity;
        newInstance.blendMode = blendMode;
        newInstance.isMask = isMask;
        newInstance.effects = effects;
        newInstance.effectStyleId = effectStyleId;
        newInstance.relativeTransform = relativeTransform;
        newInstance.x = x;
        newInstance.y = y;
        newInstance.rotation = rotation;
        newInstance.layoutAlign = layoutAlign;
        newInstance.constrainProportions = constrainProportions;
        newInstance.layoutGrow = layoutGrow;
        newInstance.exportSettings = exportSettings;
        newInstance.fills = fills;
        newInstance.fillStyleId = fillStyleId;
        newInstance.strokes = strokes;
        newInstance.strokeStyleId = strokeStyleId;
        newInstance.strokeWeight = strokeWeight;
        newInstance.strokeAlign = strokeAlign;
        newInstance.strokeCap = strokeCap;
        newInstance.strokeJoin = strokeJoin;
        newInstance.strokeMiterLimit = strokeMiterLimit;
        newInstance.dashPattern = dashPattern;
        newInstance.cornerRadius = cornerRadius;
        newInstance.cornerSmoothing = cornerSmoothing;
        newInstance.topLeftRadius = topLeftRadius;
        newInstance.topRightRadius = topRightRadius;
        newInstance.bottomLeftRadius = bottomLeftRadius;
        newInstance.bottomRightRadius = bottomRightRadius;
        newInstance.paddingLeft = paddingLeft;
        newInstance.paddingRight = paddingRight;
        newInstance.paddingTop = paddingTop;
        newInstance.paddingBottom = paddingBottom;
        newInstance.primaryAxisAlignItems = primaryAxisAlignItems;
        newInstance.counterAxisAlignItems = counterAxisAlignItems;
        newInstance.primaryAxisSizingMode = primaryAxisSizingMode;
        newInstance.layoutGrids = layoutGrids;
        newInstance.gridStyleId = gridStyleId;
        newInstance.backgrounds = backgrounds;
        newInstance.backgroundStyleId = backgroundStyleId;
        newInstance.clipsContent = clipsContent;
        newInstance.guides = guides;
        newInstance.expanded = expanded;
        newInstance.constraints = constraints;
        newInstance.layoutMode = layoutMode;
        newInstance.itemSpacing = itemSpacing;
        newInstance.numberOfFixedChildren = numberOfFixedChildren;
        parent.appendChild(newInstance);
        const instaceText = newInstance.findAll(item => item.type === "TEXT");
        const instanceImages = newInstance.findAll(item => item.fills && item.fills[0] && item.fills[0].type === "IMAGE");
        // TODO
        const imageChanger = (original, newInstance) => __awaiter(this, void 0, void 0, function* () { });
        const changer = (original, newInstance) => __awaiter(this, void 0, void 0, function* () {
            yield figma.loadFontAsync(newInstance.fontName);
            newInstance.characters = original;
        });
        for (let i = 0; i < itemText.length; i++) {
            changer(itemText[i], instaceText[i]);
            // imageChanger(itemImages[i], instanceImages[i]);
        }
        item.remove();
    }
};
const parentIsDirty = (obj) => {
    if (obj.parent.type === 'PAGE')
        return false;
    if (obj.parent.type === 'COMPONENT' ||
        obj.parent.type === 'COMPONENT_SET' ||
        obj.parent.type === 'INSTANCE') {
        return true;
    }
    else {
        return parentIsDirty(obj.parent);
    }
};
const childrenIsDirty = (obj) => {
    const result = obj.findAll(item => item.type === "COMPONENT");
    return result.length > 0 ? true : false;
};
const main = () => {
    if (figma.currentPage.selection.length > 1 ||
        figma.currentPage.selection.length === 0) {
        figma.notify('👀 Select a frame and run the plugin', { timeout: 3000 });
        return;
    }
    if (parentIsDirty(figma.currentPage.selection[0])) {
        figma.notify('🕵️ Choose a frame outside of a component or instance', {
            timeout: 3000,
        });
        return;
    }
    if (figma.currentPage.selection[0].type !== 'FRAME') {
        figma.notify('👀 Choose a frame', { timeout: 3000 });
        return;
    }
    if (childrenIsDirty(figma.currentPage.selection[0])) {
        figma.notify("🕵️ There is a component inside the frame", { timeout: 3000 });
        return;
    }
    const selection = figma.currentPage.selection[0];
    const newComponent = createNewComponent(selection);
    const { id, layoutAlign, constrainProportions, layoutGrow, children, paddingLeft, paddingRight, paddingTop, paddingBottom, primaryAxisAlignItems, counterAxisAlignItems, primaryAxisSizingMode, layoutGrids, clipsContent, guides, constraints, layoutMode, itemSpacing, overflowDirection, numberOfFixedChildren, overlayPositionType } = newComponent;
    const other = figma.currentPage.findAll((item) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        return !parentIsDirty(item) &&
            item.id !== id &&
            item.type === 'FRAME' &&
            item.layoutAlign === layoutAlign &&
            item.constrainProportions === constrainProportions &&
            item.layoutGrow === layoutGrow &&
            item.paddingLeft === paddingLeft &&
            item.paddingRight === paddingRight &&
            item.paddingTop === paddingTop &&
            item.paddingBottom === paddingBottom &&
            item.primaryAxisAlignItems === primaryAxisAlignItems &&
            item.counterAxisAlignItems === counterAxisAlignItems &&
            item.primaryAxisSizingMode === primaryAxisSizingMode &&
            item.clipsContent === clipsContent &&
            item.layoutMode === layoutMode &&
            item.itemSpacing === itemSpacing &&
            item.overflowDirection === overflowDirection &&
            item.numberOfFixedChildren === numberOfFixedChildren &&
            item.overlayPositionType === overlayPositionType &&
            JSON.stringify(item.layoutGrids) === JSON.stringify(layoutGrids) &&
            JSON.stringify(item.guides) === JSON.stringify(guides) &&
            JSON.stringify(item.constraints) === JSON.stringify(constraints) &&
            ((_a = item === null || item === void 0 ? void 0 : item.children) === null || _a === void 0 ? void 0 : _a.length) === (children === null || children === void 0 ? void 0 : children.length) &&
            ((_b = item === null || item === void 0 ? void 0 : item.children[0]) === null || _b === void 0 ? void 0 : _b.type) === ((_c = children[0]) === null || _c === void 0 ? void 0 : _c.type) &&
            ((_d = item === null || item === void 0 ? void 0 : item.children[item.children.length - 1]) === null || _d === void 0 ? void 0 : _d.type) === ((_e = children[children.length - 1]) === null || _e === void 0 ? void 0 : _e.type) &&
            ((_f = item === null || item === void 0 ? void 0 : item.children[0]) === null || _f === void 0 ? void 0 : _f.name) === ((_g = children[0]) === null || _g === void 0 ? void 0 : _g.name) &&
            ((_h = item === null || item === void 0 ? void 0 : item.children[item.children.length - 1]) === null || _h === void 0 ? void 0 : _h.name) === ((_j = children[children.length - 1]) === null || _j === void 0 ? void 0 : _j.name) &&
            ((_k = item === null || item === void 0 ? void 0 : item.children[0]) === null || _k === void 0 ? void 0 : _k.length) === ((_l = children[0]) === null || _l === void 0 ? void 0 : _l.length) &&
            ((_m = item === null || item === void 0 ? void 0 : item.children[item.children.length - 1]) === null || _m === void 0 ? void 0 : _m.length) === ((_o = children[children.length - 1]) === null || _o === void 0 ? void 0 : _o.length);
    });
    if (other.length === 0) {
        figma.notify('🤷 No similar objects found', {
            timeout: 3000,
        });
        return;
    }
    convertChildrenToInstances(newComponent, other);
    figma.notify(`🐈 Done! Instances created — ${other.length}`, { timeout: 5000 });
};
main();
figma.closePlugin();
