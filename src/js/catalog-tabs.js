const tabs = document.querySelectorAll('.catalog__tab')

let isFetching= false
tabs.forEach(tab => {
	tab.addEventListener('click', handleTabClick)
})

function handleTabClick(event) {
	if (isFetching) return;
	isFetching = true;

	const target = event.target.closest('.catalog__tab');
	const targetTabId = target.dataset.tab;
	const prevSection = document.querySelector('.catalog-section.active');
	const nextSection = document.getElementById(targetTabId);

	if (!nextSection || nextSection === prevSection) {
		isFetching = false;
		return;
	}

	tabs.forEach(tab => {
		tab.classList.remove('active');
	});

	target.classList.add('active');

	const prevSectionInner = prevSection.querySelector('.catalog-section__inner');
	const nextSectionInner = nextSection.querySelector('.catalog-section__inner');

	prevSectionInner.style.animation = 'animation-out .5s';
	prevSectionInner.addEventListener('animationend', prevSectionAnimationEnd);

	function prevSectionAnimationEnd() {
		prevSection.classList.remove('active');
		nextSection.classList.add('active');
		nextSectionInner.style.animation = 'animation-in .5s';
		prevSectionInner.removeEventListener('animationend', prevSectionAnimationEnd);
		isFetching = false;
	}
}
