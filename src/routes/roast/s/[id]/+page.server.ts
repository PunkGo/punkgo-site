import type { PageServerLoad } from './$types';

const API_BASE = 'https://n78.xyz';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const res = await fetch(`${API_BASE}/api/v1/roast/share/${params.id}`);
		if (res.ok) {
			const share = await res.json();
			return { share };
		}
	} catch {}

	return { share: null };
};
