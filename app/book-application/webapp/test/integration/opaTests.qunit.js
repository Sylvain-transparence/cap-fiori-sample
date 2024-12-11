sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'example/book/bookapplication/test/integration/FirstJourney',
		'example/book/bookapplication/test/integration/pages/BoxGroupsList',
		'example/book/bookapplication/test/integration/pages/BoxGroupsObjectPage',
		'example/book/bookapplication/test/integration/pages/BookGroupsObjectPage'
    ],
    function(JourneyRunner, opaJourney, BoxGroupsList, BoxGroupsObjectPage, BookGroupsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('example/book/bookapplication') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheBoxGroupsList: BoxGroupsList,
					onTheBoxGroupsObjectPage: BoxGroupsObjectPage,
					onTheBookGroupsObjectPage: BookGroupsObjectPage
                }
            },
            opaJourney.run
        );
    }
);