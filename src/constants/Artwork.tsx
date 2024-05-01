export default interface Artwork {
	id?: number;
	title?: string;
	thumbnail?: {
		lqip?: string;
		alt_text?: string;
	};
	artist_title?: string;
	artwork_type_title?: string;
	date_start?: number;
	date_end?: number;
	place_of_origin?: string;
	dimensions?: string;
	credit_line?: string;
	department_title?: string;
}
