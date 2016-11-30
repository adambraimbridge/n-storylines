Promise.all([
	fetch('../templates/main.html').then(res => res.text()),
	fetch('./N2FkZjRhMWUtZDZjNS00ZTQ0LTg1MTMtMjYyYzBlODkzYTQ2-UE4=.json').then(res => res.json())
])
	.then(([source, initialData]) => {
		const template = Handlebars.compile(source);
		const component = document.querySelector('.n-storylines');
		const heatmapSegments = document.getElementsByClassName('n-storylines__heatmap-segment-colour');
		const backBtns = document.getElementsByClassName('n-storylines__back-btn');

		setupInteraction(initialData);

		function setupInteraction (data) {
			backBtns[0].style.display = data === initialData ? 'none' : '';
			if (!data.children) return;

			for (let i = 0; i < heatmapSegments.length; i++) {
				heatmapSegments[i].addEventListener('click', () => {
					renderStoryline(data.children[i]);
					setupBackBtn(data);
				});
			}
		}

		function renderStoryline (data) {
			component.innerHTML = template(data);
			setupInteraction(data);
		}

		function setupBackBtn (data) {
			backBtns[0].addEventListener('click', () => {
				renderStoryline(data);
				setupBackBtn(initialData);
			});
		}
	});
