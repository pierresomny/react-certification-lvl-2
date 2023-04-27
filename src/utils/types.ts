export interface Team {
	id: number;
	abbreviation: string;
	city: string;
	conference: string;
	division: string;
	full_name: string;
	name: string;
}

export interface Game {
	id: number;
	date: Date;
	home_team: Team;
	home_team_score: number;
	period: number;
	postseason: boolean;
	season: number;
	status: string;
	time: string;
	visitor_team: Team;
	visitor_team_score: number;
}

export interface ApiResponse<T> {
	data: T[];
	meta: {
		current_page: number;
		next_page: number | null;
		per_page: number;
		total_count: number;
		total_pages: number;
	};
}