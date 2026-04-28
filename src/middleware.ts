import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
	const response = await next();
	
	// Security Headers for Best Practices 100%
	response.headers.set(
		'Content-Security-Policy',
		"default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; media-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; trusted-types 'default' 'dompurify'; require-trusted-types-for 'script';"
	);
	response.headers.set(
		'Strict-Transport-Security',
		'max-age=31536000; includeSubDomains; preload'
	);
	response.headers.set(
		'Cross-Origin-Opener-Policy',
		'same-origin'
	);
	response.headers.set(
		'X-Frame-Options',
		'SAMEORIGIN'
	);
	response.headers.set(
		'X-Content-Type-Options',
		'nosniff'
	);
	response.headers.set(
		'Referrer-Policy',
		'strict-origin-when-cross-origin'
	);
	response.headers.set(
		'Permissions-Policy',
		'camera=(), microphone=(), geolocation=(), payment=()'
	);
	
	return response;
};
