sap.ui.define([
    "sap/m/MessageToast",
    'sap/ui/core/BusyIndicator',
], function (MessageToast, BusyIndicator) {
    'use strict';

    return {
        onPress: async function (oEvent) {
            BusyIndicator.show(0);

            const bookGroupList = [];
            const modifiedBookGroupUI = oEvent.getSource().getBindingContext()?.getObject();
            const uiFieldID = oEvent.getSource().getId();
            const currentNetWeight = uiFieldID.includes('NetWeight')
			? oEvent.getParameter('value')
			: modifiedBookGroupUI.calculatedData?.calculatedNetWeight;
            const currentQuantity = uiFieldID.includes('Quantity')
			? oEvent.getParameter('value')
			: modifiedBookGroupUI.calculatedData?.calculatedQuantity;

            const modifiedBookGroup = {
                id: modifiedBookGroupUI.ID,
                currentQuantity: currentQuantity,
                currentNetWeight: currentNetWeight,
            };
            if (!modifiedBookGroup) return;
    
            const oTable = oEvent.getSource().getParent()?.getParent();
            if (!oTable) return;
            const emptiesBidingContext = oTable.getItems();
            if (!emptiesBidingContext) return;

            for (const emptyContext of emptiesBidingContext) {
                if (!emptyContext) return;
                const empty = emptyContext.getBindingContext()?.getObject();
                //2nd Parameter for action
                bookGroupList.push({
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
            oAction.setParameter('modifiedBookGroup', modifiedBookGroup);
            oAction.setParameter('bookGroupList', bookGroupList);

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
