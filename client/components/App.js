import React from "react"
import axios from 'axios'
//import any sub-components

export default class App extends React.Component {
	//constructor to initialize state
	constructor () {
		super()
		this.state = {
			dishes: [],
			selectedDish: {}
		}
	}

	//any lifecycle methods
	async componentDidMount(){
		const dishes = (await axios.get('/api/dishes')).data
		this.setState({ dishes })
		const loadRecipeItems = async()=> {
      const dishId = window.location.hash.slice(1) * 1;
      const selectedDish = (await axios.get(`/api/dishes/${ dishId }`)).data[0];
      this.setState({ selectedDish });
    };
		window.addEventListener('hashchange', ()=> {
      loadRecipeItems();
    });
    if(window.location.hash.slice(1)){
      loadRecipeItems();
    }
    else{
      window.location.hash = '';
    }
	}
	//any custom methods

	//render
	render () {
		const { dishes, selectedDish } = this.state
		return (
			<div>
				<h1>Cajun Recipes</h1>
				<ul>
					{dishes.map(dish => <Dishes dish={ dish } key={ dish.id }/>)}
				</ul>
				<hr />
				<Recipe selectedDish={ selectedDish }/>
			</div>
		)
	}
}

const Dishes = ({ dish }) => {
	return (
	<li><a href={ `#${dish.id}`}>{dish.name}</a></li>
	)
}

const Recipe = ({ selectedDish }) => {
	if(!selectedDish.id) return (<div>Pick a dish!</div>)
	const ingredients = selectedDish.recipeitems.map(item=>item.ingredient)
	return (
		<div>
			<img src={selectedDish.imgUrl}/>
			<ul>
				{ingredients.map(ingredient => <li key={ingredient.id}>{ingredient.name}</li>)}
			</ul>
		</div>
	)
}

