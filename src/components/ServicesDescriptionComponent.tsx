import React from 'react';

function ServicesDescription(): JSX.Element {
	const styles: Record<string, React.CSSProperties> = {
		link: {
			color: 'rgb(20, 110, 190)',
			textDecoration: 'underline',
		},
	};

  return (
	<div>
		Los íconos se pueden visualizar en el sitio de <a href="https://fontawesome.com/search?o=r&s=solid&f=classic"
			target="_blank"
			rel="noopener"
			style={styles.link}
		>
			Font Awesome
		</a>.
	</div>
  );
}

export default ServicesDescription;