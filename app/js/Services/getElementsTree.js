
(function (namespace) {
    function getElementsTree(nodeSelectors, childSelectors) {
        var elementsTree = {},
            nodeElement,
            childElement,
            currentNode;

        for (var nodeKey in nodeSelectors) {
            nodeElement = document.querySelector(nodeSelectors[nodeKey]);

            if (nodeElement) {
                elementsTree[nodeKey] = {};
                currentNode = elementsTree[nodeKey];

                for (var childKey in childSelectors) {
                    childElement = nodeElement.querySelector(childSelectors[childKey]);

                    if (childElement) {
                        currentNode[childKey] = childElement;
                    } else {
                        console.log('Didn`t find child element by "' + childSelectors[childKey] +
                            '" in node element by "' + nodeSelectors[nodeKey] + '"!');
                    }
                }
            } else {
                console.log('Didn`t find node element by "' + nodeSelectors[nodeKey] + '"!');
            }
        }

        return elementsTree;
    }

    namespace.services.getElementsTree = getElementsTree;
})(window.vCWeather);