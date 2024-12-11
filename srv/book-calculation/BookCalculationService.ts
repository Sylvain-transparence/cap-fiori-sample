import * as cds from '@sap/cds';
import { BookGroups, BoxGroup, BoxGroups } from '#cds-models/example/book/BookCalculationService'
import { CalculationService } from './CalculationService';

export default class BookCalculationService extends cds.ApplicationService {
	async init() {

		this.on('READ', BoxGroups, async (req) => {
			const response = await cds.run(req.query);
			return response;
		});


		this.after('READ', BoxGroups, async (boxGroups: BoxGroups, req) => {
			if (!boxGroups) return;
			let hasVirtualElement;
			if (Array.isArray(req.query.SELECT?.columns)) {
				hasVirtualElement = req.query.SELECT.columns.find((c) => {
					if (c.ref) return c.ref && c.ref[0] === 'totalBookWeight';
					if (c.as) return c.as === 'totalBookWeight';
				});
			}
			if (!hasVirtualElement) return;
			const calculationService = new CalculationService();
			await calculationService.calculateInitalWeights(boxGroups);
		});

		this.after('READ', BookGroups, async (empties: BookGroups) => {
			if (!empties) return;
			const calculationService = new CalculationService();
			await calculationService.afterReadEmpties(empties);
		});

		this.on(BoxGroup.actions.performCalculation, BoxGroups, async (req) => {
			const calculationService = new CalculationService();
			return await calculationService.performCalculation(req);
		});

		return await super.init();
	}
}
