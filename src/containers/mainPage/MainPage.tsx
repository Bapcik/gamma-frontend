import AboutContent from '../../components/mainPage/aboutContent/AboutContent';
import AboutService from '../../components/mainPage/aboutService/AboutService';
import BreathBlock from '../../components/mainPage/breathBlock/BreathBlock';
import { CoursesList } from '../../components/mainPage/courses/coursesList/CoursesList';

import FeelingsBlock from '../../components/mainPage/feelingsBlock/FeelingsBlock';
import ServicesCards from '../../components/mainPage/servicesCards/ServicesCards';
import Ticker from '../../components/mainPage/ticker/Ticker';
import ViewedPsychologists from '../../components/mainPage/viewedPsychologists/list/ViewedPsychologists';
import {
	useSwitchFavourite,
	useViewedPsychologists,
} from '../../features/queryHooks/queryHooks';
import { useAppSelector } from '../../store/hooks';

import './MainPage.scss';
export const MainPage = () => {
	const user = useAppSelector((state) => state.users.userInfo);
	const { data: viewedPsychologists } = useViewedPsychologists(user);
	const { mutate: switchFavoriteQuery } = useSwitchFavourite();

	const switchFavorite = (id: number): boolean => {
		if (!user || !user.patient) return false;
		switchFavoriteQuery(id);
		return true;
	};

	return (
		<div className="main-page">
			<AboutContent />
			<BreathBlock />
			<FeelingsBlock />
			<ServicesCards />
			<AboutService />
			<CoursesList />
			<Ticker />
			<ViewedPsychologists
				viewedPsychologists={viewedPsychologists}
				switchFavorite={switchFavorite}
			/>
		</div>
	);
};
