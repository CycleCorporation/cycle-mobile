type List = {
	id: string;
	nome: string;
	image: any;
};

export const areaList: List[] = [
	{
		id: '1',
		nome: 'Assistência Técnica',
		image: require('../../assets/tecnico.png'),
	},
	{
		id: '2',
		nome: 'Reformas e Reparos',
		image: require('../../assets/reforma.png'),
	},
	{
		id: '3',
		nome: 'Artes e Design',
		image: require('../../assets/design.png'),
	},
	{
		id: '4',
		nome: 'Consultoria',
		image: require('../../assets/consultoria.png'),
	},
	{
		id: '5',
		nome: 'Serviços Domésticos',
		image: require('../../assets/domesticos.png'),
	},
];
