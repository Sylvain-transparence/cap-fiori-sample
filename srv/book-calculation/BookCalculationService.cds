namespace example.book;

using {example.book as book} from '../../db/schema';

service BookCalculationService {

    entity BoxGroups                as projection on book.BoxGroups
    actions {
        @(
            cds.odata.bindingparameter.name: '_it',
            Common.SideEffects             : {TargetEntities: ['_it/bookGroups'], }
        )
        action performCalculation(modifiedBookGroup : ActionBookGroupQuantityRequest,
                                  bookGroupList : many ActionBookGroupQuantityRequest)        returns BoxGroups;
    };

    entity BookGroups               as projection on book.BookGroups;
    entity Store                    as projection on book.Store;
    entity Books                    as projection on book.Books;

    @readonly
    entity BookGroupsCalculatedData as projection on book.BookGroupsCalculatedData;

    define type ActionBookGroupQuantityRequest {
        id               : UUID;
        currentQuantity  : Integer;
        currentNetWeight : Decimal(9, 3);
    };
}
