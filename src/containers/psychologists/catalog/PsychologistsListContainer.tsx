import { PsychologistsList } from '../../../components/psychologists/psychologistList/PsychologistsList';
import IFilteringValues from '../../../interfaces/IFilteringValues';
import { useState } from 'react';
import { Alert } from 'antd';
import { AxiosError } from 'axios';
import { useAppSelector } from '../../../store/hooks';
import {
	useCityQuery,
	useGetPsychologists,
	useSwitchFavourite,
	useSymptomQuery,
	useTechniqueQuery,
	useTherapyMethodQuery,
} from '../../../features/queryHooks/queryHooks';

export const PsychologistsListContainer = () => {
	const authUser = useAppSelector((state) => state.users.userInfo);

	const [filterValues, setFilterValues] = useState<null | IFilteringValues>(
		null
	);

	const {
		data: psychologists,
		error,
		isLoading,
	} = useGetPsychologists(filterValues);
	const psychologistsList = psychologists ?? [];

	const { data: techniquesData } = useTechniqueQuery();
	const techniques = techniquesData?.data ?? [];

	const { data: therapyMethodsData } = useTherapyMethodQuery();
	const therapyMethods = therapyMethodsData?.data ?? [];

	const { data: symptomsData } = useSymptomQuery();
	const symptoms = symptomsData?.data ?? [];

	const { data: citiesData } = useCityQuery();
	const cities = citiesData?.data ?? [];

	const { mutate: switchFavoriteQuery } = useSwitchFavourite();

	const switchFavorite = (id: number): boolean => {
		if (!authUser || !authUser.patient) return false;
		switchFavoriteQuery(id);
		return true;
	};

	const filterHandler = (values: IFilteringValues) => {
		setFilterValues(values);
	};

	if (isLoading) {
		return <div>LOADING...</div>;
	}

	return (
		<>
			{error instanceof AxiosError && (
				<Alert
					closable
					description={error?.message || 'An error occurred.'}
					type="error"
					showIcon
				/>
			)}
			<PsychologistsList
				psychologists={psychologistsList}
				cities={cities}
				filterHandler={filterHandler}
				symptoms={symptoms}
				techniques={techniques}
				therapyMethod={therapyMethods}
				switchFavorite={switchFavorite}
			/>
		</>
	);
};
