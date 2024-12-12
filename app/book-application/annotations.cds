using example.book.BookCalculationService as service from '../../srv/book-calculation/BookCalculationService';

annotate service.BoxGroups with @(UI.LineItem: [
    {
        $Type: 'UI.DataField',
        Value: name,
    },
    {
        $Type: 'UI.DataField',
        Value: description,
    },
]);

annotate service.BoxGroups with @(
    UI.Facets                     : [{
        $Type : 'UI.ReferenceFacet',
        Label : '{i18n>BoxGroups}',
        ID    : 'BookGroup',
        Target: 'bookGroups/@UI.LineItem#BookGroup',
    }, ],
    UI.FieldGroup #GeneratedGroup1: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'store_ID',
                Value: store_ID,
            },
            {
                $Type: 'UI.DataField',
                Value: name,
            },
            {
                $Type: 'UI.DataField',
                Value: description,
            },
        ],
    },
);

annotate service.BoxGroups with @(UI.HeaderInfo: {
    Title         : {
        $Type: 'UI.DataField',
        Value: name,
    },
    TypeName      : '',
    TypeNamePlural: '',
    Description   : {
        $Type: 'UI.DataField',
        Value: description,
    },
});

annotate service.BookGroups with @(UI.LineItem #BookGroup: [
    {
        $Type: 'UI.DataField',
        Value: name,
        Label: '{i18n>BoxGroups}',
    },
    {
        $Type: 'UI.DataField',
        Value: book.ID,
        Label: '{i18n>Book}',
    },
    {
        $Type: 'UI.DataField',
        Value: book.description,
        Label: '{i18n>BookDescription}',
    },
    {
        $Type: 'UI.DataField',
        Value: defaultQuantity,
        Label: '{i18n>DefaultQuantity}',
    },
    {
        $Type : 'UI.DataField',
        Value : calculatedData.bookWeight,
    }
]);

annotate service.BoxGroups with @(UI.FieldGroup #OverallWeight: {
    ![@UI.Emphasized],
    $Type: 'UI.FieldGroupType',
    Data : [{
        $Type            : 'UI.DataField',
        Value            : totalBookWeight,
        ![@UI.Importance]: #High,
    }, ],

});

annotate service.BookGroups with @(UI.SelectionPresentationVariant #BookGroup: {
    $Type              : 'UI.SelectionPresentationVariantType',
    PresentationVariant: {
        $Type         : 'UI.PresentationVariantType',
        Visualizations: ['@UI.LineItem#BookGroup', ],
    },
    SelectionVariant   : {
        $Type        : 'UI.SelectionVariantType',
        SelectOptions: [],
    },
});
