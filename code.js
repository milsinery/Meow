if (figma.currentPage.selection.length > 0) {
    const selected = figma.currentPage.selection[0];
    if (selected.parent.type === "PAGE") {
        const IDofSelected = selected.id;
        const typeOfSelected = selected.type;
        const widthOfSelected = selected.width;
        const heightOfSelected = selected.height;
        const xOfSelected = selected.x;
        const yOfSelected = selected.y;
        const newComponent = figma.createComponent();
        newComponent.resize(selected.width, selected.height);
        newComponent.appendChild(selected);
        newComponent.x = xOfSelected;
        newComponent.y = yOfSelected;
        selected.x = xOfSelected - newComponent.x;
        selected.y = yOfSelected - newComponent.y;
        const other = figma.currentPage.findAll(item => item.id !== IDofSelected &&
            item.type === typeOfSelected &&
            item.width === widthOfSelected &&
            item.height === heightOfSelected);
        if (other.length > 0) {
            for (const item of other) {
                const parent = item.parent;
                const xOfChild = item.x;
                const yOfChild = item.y;
                const newChild = newComponent.createInstance();
                parent.appendChild(newChild);
                newChild.x = xOfChild;
                newChild.y = yOfChild;
                item.remove();
            }
        }
    }
}
figma.closePlugin();
