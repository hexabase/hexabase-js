export interface AddUserResponse {
  added: boolean;
  exists: boolean;
  user_profile: {
		confirmed: boolean;
		email: string;
		email_sent: boolean;
		profile_pics: {
			mediaLink: string
		}[];
		u_id: string;
		username: string;
	}
}
