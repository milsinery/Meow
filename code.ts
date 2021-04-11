const createNewComponent = (selection: FrameNode): ComponentNode => {
  const newComponent: SceneNode = figma.createComponent();

  newComponent.name = selection.name;
  newComponent.resize(selection.width, selection.height);
  newComponent.appendChild(selection);
  newComponent.x = selection.x;
  newComponent.y = selection.y;
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
    const { parent, x, y, rotation, name, fills, strokeCap, strokeAlign, strokeJoin } = item;

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

    item.remove();
  }
  figma.notify("🐈‍");
};

const main = () => {
  // проверяем, выделено ли что-то
  if (figma.currentPage.selection.length > 1 || figma.currentPage.selection.length === 0) return;

  // проверяем, что выбран фрейм
  if (figma.currentPage.selection[0].type !== 'FRAME') return;

  // проверяем, что выбранный объект вне фреймов
  if (figma.currentPage.selection[0].parent.type !== 'PAGE') return;

  // сохраняем ссылку на выбранный объект
  const selection: SceneNode = figma.currentPage.selection[0];
  const { id, children, layoutMode, cornerRadius, counterAxisAlignItems, primaryAxisAlignItems, clipsContent } = selection;

  // создаём компонент из выбранного объекта
  const newComponent: ComponentNode = createNewComponent(selection);

  // собираем все остальные объекты на странице, похожие на выбранный
  const other: Array<SceneNode> = figma.currentPage.findAll(
    (item) => 
      item.parent.type !== 'PAGE' &&
      item.id !== id &&
      item.type === 'FRAME' &&
      item.layoutMode === layoutMode && 
      item.cornerRadius === cornerRadius && 
      item.counterAxisAlignItems === counterAxisAlignItems && 
      item.primaryAxisAlignItems === primaryAxisAlignItems && 
      item.clipsContent === clipsContent && 
      item.children.length === children.length
  );

  // проверяем, что такие объекты есть
  if (other.length === 0) return;

  // создаём из таких объектов копии нашего компонента, удаляем оригиналы и вставляем копии на их место
  convertChildrenToInstances(newComponent, other);
};

main();
figma.closePlugin();
