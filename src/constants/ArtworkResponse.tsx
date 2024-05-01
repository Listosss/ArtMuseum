import Artwork from './Artwork';

interface Pagination {
	total_pages: number;
	total_count: number;
	current_page: number;
}
export default interface ArtworksResponse {
	data: Artwork[];
	pagination: Pagination;
}
