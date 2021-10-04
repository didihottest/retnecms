'use strict';

const getPagination = (pageNumber, pageSize) => {
	pageNumber = parseInt(pageNumber) === 0 ? 0 : pageNumber - 1;
	const limit = pageSize ? +pageSize : 10;
	const offset = pageNumber ? pageNumber * limit : 0;

	return { limit, offset };
};

const getPagingData = (data, pageNumber, limit) => {
	const { count: total_items, rows: items } = data;
	const current_page = parseInt(pageNumber) ? +pageNumber : 1;
	const total_pages = Math.ceil(total_items / limit);

	return { total_items, items, total_pages, current_page };
};

module.exports = {
	getPagination,
	getPagingData,
};
