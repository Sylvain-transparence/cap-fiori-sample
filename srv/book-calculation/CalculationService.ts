import { ActionBookGroupQuantityRequest, Book, BookGroup, BookGroups, Books, BoxGroup, BoxGroups } from '#cds-models/example/book/BookCalculationService';
import * as cds from '@sap/cds';

interface CustomRequest extends cds.Request {
	errors?: { message: string; code: string }[];
}

export class CalculationService {

	async performCalculation(
		req: CustomRequest,
	): Promise<void | BoxGroup> {

		const { bookGroupList } = req.data;
		const uiBookGroupList = bookGroupList as ActionBookGroupQuantityRequest[];

		const boxGroupID: BoxGroup['ID'] = req.params[0] as BoxGroup['ID'];
		if (!boxGroupID) return;
		const boxGroup = await this.fetchBoxGroupById(boxGroupID) ?? {};

		boxGroup.totalBookWeight =
			await this.calculateTotalBookWeight(uiBookGroupList);

		return boxGroup;
	}

	async calculateTotalBookWeight(
		bookGroups: ActionBookGroupQuantityRequest[],
	): Promise<number> {
		let totalBookWeight = 0;
		for (const bookGroup of bookGroups) {
			if (
				typeof bookGroup.currentQuantity === 'number' &&
				typeof bookGroup.currentNetWeight === 'number'
			) {
				totalBookWeight += bookGroup.currentQuantity * bookGroup.currentNetWeight;
			}
		}
		return totalBookWeight;
	}

	private async fetchBoxGroupById(id: string): Promise<BoxGroup | undefined> {
		return SELECT.one
			.from(BoxGroups)
			.columns((bg) => {
				bg('*');
				if (bg && bg.bookGroups) {
					bg.bookGroups((bkg) => {
						bkg('*');
					});
				}
			})
			.where({ ID: id });
	}

	async updateBookWeight(bookGroup: BookGroup) {
		if (
			bookGroup.calculatedData?.calculatedQuantity == null ||
			bookGroup.calculatedData?.calculatedQuantity == undefined
		) {
			if (!bookGroup.calculatedData) bookGroup.calculatedData = {};
			bookGroup.calculatedData.calculatedQuantity = bookGroup.defaultQuantity;
		}
		if (!bookGroup.calculatedData.calculatedQuantity)
			bookGroup.calculatedData.calculatedQuantity = 0;

		if (!bookGroup.book) {
			bookGroup.book = await SELECT.one.from(Books).where({
				ID: bookGroup.book_ID,
			}) as Book;
		}
		if (
			bookGroup.calculatedData.calculatedNetWeight == null ||
			bookGroup.calculatedData.calculatedNetWeight == undefined
		) {
			if (bookGroup.book.netWeight) {
				bookGroup.calculatedData.calculatedNetWeight = bookGroup.book?.netWeight;
			}
		}

		if (!bookGroup.calculatedData.calculatedNetWeight) return;

		const bookWeight =
			bookGroup.calculatedData.calculatedQuantity *
			bookGroup.calculatedData.calculatedNetWeight;
		bookGroup.calculatedData.bookWeight = Math.round(bookWeight * 1000) / 1000;
	}

	public async calculateInitalWeights(
		boxGroups: BoxGroups
	) {
		let totalBookWeight = 0;
		for (const boxGroup of boxGroups) {
			const bookGroupsList = await SELECT.from(BookGroups).where({
				boxGroup_ID: boxGroup.ID,
			});
			if (bookGroupsList) {
				for (const bookGroup of bookGroupsList) {
					await this.updateBookWeight(bookGroup);
					totalBookWeight += bookGroup.calculatedData?.bookWeight
						? bookGroup.calculatedData?.bookWeight
						: 0;
				}
				boxGroup.bookGroups = bookGroupsList;
			}
			boxGroup.totalBookWeight = totalBookWeight;
		}
	}

	async afterReadEmpties(
		bookGroups: BookGroups,
	) {
		for (const bookGroup of bookGroups) {
			await this.populateBookBoxWithBookData(bookGroup);
			if (!bookGroup.book) continue;

			await this.calculateEmptyData(bookGroup);
		}
	}

	private async populateBookBoxWithBookData(
		bookGroup: BookGroup,
	) {
		const { book_ID, defaultQuantity } = await cds.run(
			SELECT.one.from(BookGroup).where({ ID: bookGroup.ID }),
		);

		bookGroup.book = (await SELECT.one.from(Book).where({ ID: book_ID })
		) as Book;

		if (!bookGroup.book) return;

		if (!bookGroup.book.netWeight) {
			bookGroup.book.netWeight = 0;
		}

		bookGroup.book_ID = book_ID;
		bookGroup.defaultQuantity = defaultQuantity;
	}

	private async calculateEmptyData(bookGroup: BookGroup) {
		if (!bookGroup.calculatedData) bookGroup.calculatedData = {};

		const defaultQuantity = bookGroup.defaultQuantity ?? 0;
		if (bookGroup.book) {
			const netWeight = bookGroup.book.netWeight ?? 0;

			bookGroup.calculatedData.bookWeight = defaultQuantity * netWeight;
			bookGroup.calculatedData.calculatedQuantity = defaultQuantity;
			bookGroup.calculatedData.calculatedNetWeight = netWeight;
		}
	}
}
