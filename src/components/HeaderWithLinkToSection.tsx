'use client';

import { Anchor } from 'lucide-react';
import toast from 'react-hot-toast';
import React from 'react';

export const HeaderWithLinkToSection: React.FC<{
	id: string;
	children: React.ReactNode;
}> = ({ id, children }) => {
	const copyLinkToSection = async (
		e: React.MouseEvent<HTMLHeadingElement, MouseEvent>,
		sectionId: string
	) => {
		e.stopPropagation();
		const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
		await navigator.clipboard.writeText(url);
		toast.success('Link skopiowany do schowka!');
	};
	return (
		<h2
			id={id}
			className='relative cursor-pointer group'
			onClick={(e) => copyLinkToSection(e, id)}
		>
			<Anchor
				size={18}
				className='absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity'
			/>
			{children}
		</h2>
	);
};
