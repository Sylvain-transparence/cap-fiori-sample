sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'example.book.bookapplication',
            componentId: 'BookGroupsObjectPage',
            contextPath: '/BoxGroups/bookGroups'
        },
        CustomPageDefinitions
    );
});