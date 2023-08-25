import payload from "payload";
import { Request, Response } from "express";
import BusinessCollection from "./collections/Businesses";

/**
 * Custom route to get all the required data for the Homepage.
 */
export const hompageRoute = async (request: Request, response: Response) => {
	const businessModel = payload.collections[BusinessCollection.slug].Model;

	const aggregationPipeline = await businessModel.aggregate([
		// We start with a list of businesses with a services array containing string IDs only (not as ObjectId)
		{
			$unwind: "$services"
		},
		// Since `services` is a string ID, we need another one in the form of ObjectId.
		{
			$addFields: {
				// I'll prefix with an "_" the IDs when they are ObjectIds
				_serviceId: { $toObjectId: "$services" }
			}
		},
		// At this point we have a list relations between services and businesses, like multiple-to-multiple SQL relation table.
		{
			$group: {
				_id: "$_serviceId",
				//businesses: {
				//	$push: "$name"
				//}
				businessCount: {
					$count: {}
				}
			}
		},
		{
			$lookup: {
				from: "services",
				localField: "_id",
				foreignField: "_id",
				as: "service"
			}
		},
		{
			$unwind: "$service"
		},
		{
			$project: {
				_id: 0,
				_serviceId: "$_id",
				serviceName: "$service.name",
				serviceIcon: "$service.icon",
				businessCount: "$businessCount",
				_categoryId: { $toObjectId: "$service.category" }
			}
		},
		// At this point we have a list of services with businessCount and _categoryId
		{
			$group: {
				_id: "$_categoryId",
				services: {
					$push: {
						id: "$_serviceId",
						name: "$serviceName",
						icon: "$serviceIcon",
						businessCount: "$businessCount"
					}
				}
			}
		},
		{
			$lookup: {
				from: "categories",
				localField: "_id",
				foreignField: "_id",
				as: "category"
			}
		},
		{
			$unwind: "$category"
		},
		{
			$project: {
				_id: 1,
				name: "$category.name",
				displayOrder: "$category.displayOrder",
				services: {
					$sortArray: { input: "$services", sortBy: { name: 1 } }
				}
			}
		},
		{
			$sort: {
				displayOrder: 1,
				name: 1
			}
		}
		// Now we have full categories with services array
	]);

	return response.send(aggregationPipeline);
}
