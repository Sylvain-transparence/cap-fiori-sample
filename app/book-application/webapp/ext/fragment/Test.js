sap.ui.define([
    "sap/m/MessageToast",
    'sap/ui/core/BusyIndicator',
    '../controller/BoxGroupsObjectPageExt.controller',
], function (MessageToast, BusyIndicator, BoxGroupsObjectPageExt) {
    'use strict';

    return {
        onPress: async function (oEvent) {
            BusyIndicator.show(0);

            const emptiesList = [];
            const modifiedEmptyUI = oEvent.getSource().getBindingContext()?.getObject();
                const uiFieldID = oEvent.getSource().getId();
            const currentNetWeight = uiFieldID.includes('netWeight')
			? oEvent.getParameter('value')
			: modifiedEmptyUI.calculatedData?.calculatedNetWeight;
            const currentQuantity = uiFieldID.includes('Quantity')
			? oEvent.getParameter('value')
			: modifiedEmptyUI.calculatedData?.calculatedQuantity;

            const modifiedEmpty = {
                id: modifiedEmptyUI.ID,
                currentQuantity: currentQuantity,
                currentNetWeight: currentNetWeight,
            };
            if (!modifiedEmpty) return;
            console.log(modifiedEmpty);
    
            const oTable = oEvent.getSource().getParent()?.getParent();
            if (!oTable) return;
            const emptiesBidingContext = oTable.getItems();
            if (!emptiesBidingContext) return;

            for (const emptyContext of emptiesBidingContext) {
                if (!emptyContext) return;
                const empty = emptyContext.getBindingContext()?.getObject();
                //2nd Parameter for action
                emptiesList.push({
                    id: empty.ID,
                    currentQuantity: empty.calculatedData?.calculatedQuantity,
                    currentNetWeight: empty.calculatedData?.calculatedNetWeight,
                });
            }
    
            		//Prepare action call
		const oModel = oEvent.getSource().getModel();
		if (!oModel) return;
		const oTareGroupsContext = oEvent
			.getSource()
			.getParent()
			?.getParent()
			?.getParent()
			?.getParent()
			?.getParent()
			?.getParent()
			?.getParent()
			?.getParent()
			?.getParent()
			?.getParent()
			?.getBindingContext();
		if (!oTareGroupsContext) return;


            // const oModel = oEvent.getSource().getModel();
            // let oEmptyContext = oEvent.getSource().getBindingContext();
            let oAction = oModel.bindContext(
                'example.book.BookCalculationService.performCalculation(...)',
                oTareGroupsContext,
            );
            oAction.setParameter('modifiedEmpty', modifiedEmpty);
            oAction.setParameter('emptiesList', emptiesList);

            await oAction.invoke().then(
                async function (oContext) {
                    if (!oContext) return;
                },
                async function (oError) {},
            );
    
            MessageToast.show("Custom handler invoked.");
            BusyIndicator.hide();
        }
    };
});
