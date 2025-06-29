export const ELEMENT_CONSTRAINTS = {
	heading: {
		maxLength: 50,
	},
	paragraph: {
		maxLength: 500,
	},
};

export const ELEMENT_LABELS = {
	heading: 'Heading',
	paragraph: 'Paragraph',
	image: 'Image',
};

export const IMAGE_UPLOAD_CONFIG = {
	maxFiles: 1,
	maxSize: 20 * 1024 * 1024, // 20MB
	accept: {
		'image/*': [],
	},
	multiple: false,
};
