namespace example.book;

using {
    managed,
    cuid,
} from '@sap/cds/common';

entity Store : cuid, managed {
    name : String  @title: '{i18n>StoreName}'  @mandatory;
}

entity Books : cuid, managed {
    name        : String            @title: '{i18n>BooksName}'    @mandatory;
    description : localized String  @title: '{i18n>Description}'  @mandatory;
    netWeight   : Decimal(9, 3)     @title: '{i18n>BookWeight}';
}

@assert.unique.key: [
    store,
    name
]
@cds.odata.valuelist
entity BoxGroups : cuid, managed {
    store                   : Association to Store @mandatory;
    name                    : String               @title: '{i18n>BookGroupName}'    @mandatory;
    description             : localized String     @title: '{i18n>Description}'      @mandatory;
    bookGroups              : Composition of many BookGroups
                                  on bookGroups.boxGroup = $self;
    virtual totalBookWeight : Decimal              @title: '{i18n>TotalBookWeight}'  @Core.Computed: false;
}

entity BookGroups : cuid, managed {
    store           : Association to Store                                        @title: '{i18n>Store}'  @mandatory  @assert.unique;
    book            : Association to Books @mandatory;
    name            : String               @title: '{i18n>BookGroupName}'         @mandatory  @Immutable  @assert.unique;
    description     : localized String     @title: '{i18n>BookGroupDescription}'  @mandatory;
    defaultQuantity : Integer              @title: '{i18n>DefaultQuantity}';
    boxGroup        : Association to BoxGroups                                    @mandatory  @Immutable;
    calculatedData  : Association to BookGroupsCalculatedData;
}

@cds.persistence.skip
entity BookGroupsCalculatedData : cuid {
    calculatedQuantity  : Integer       @title: '{i18n>Quantity}';
    bookWeight          : Decimal(9, 3) @title: '{i18n>BookWeight}';
    calculatedNetWeight : Decimal(9, 3) @title: '{i18n>NetWeight}'
}
